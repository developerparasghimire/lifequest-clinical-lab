import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, excerpt, image, metaTitle, metaDescription, published } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "title and content are required" }, { status: 400 });
    }

    const slug = slugify(String(title));

    // Ensure slug uniqueness
    const existing = await prisma.blog.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const post = await prisma.blog.create({
      data: {
        title: String(title).slice(0, 300),
        slug: finalSlug,
        content: String(content),
        excerpt: excerpt ? String(excerpt).slice(0, 500) : null,
        image: image ? String(image).slice(0, 500) : null,
        metaTitle: metaTitle ? String(metaTitle).slice(0, 200) : null,
        metaDescription: metaDescription ? String(metaDescription).slice(0, 500) : null,
        published: Boolean(published),
      },
    });
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
