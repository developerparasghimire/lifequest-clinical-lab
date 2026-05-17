import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const post = await prisma.blog.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: post });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, content, excerpt, image, metaTitle, metaDescription, published } = body;

    const updateData: Record<string, unknown> = {};
    if (title) {
      updateData.title = String(title).slice(0, 300);
      updateData.slug = slugify(String(title));
    }
    if (content) updateData.content = String(content);
    if (excerpt !== undefined) updateData.excerpt = excerpt ? String(excerpt).slice(0, 500) : null;
    if (image !== undefined) updateData.image = image ? String(image).slice(0, 500) : null;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle ? String(metaTitle).slice(0, 200) : null;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription ? String(metaDescription).slice(0, 500) : null;
    if (published !== undefined) updateData.published = Boolean(published);

    const updated = await prisma.blog.update({ where: { id }, data: updateData });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}
