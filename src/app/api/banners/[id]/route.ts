import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const b = await req.json();
    const updated = await prisma.banner.update({
      where: { id },
      data: {
        ...(b.title !== undefined && { title: String(b.title).slice(0, 200) }),
        ...(b.subtitle !== undefined && { subtitle: b.subtitle ? String(b.subtitle).slice(0, 500) : null }),
        ...(b.image !== undefined && { image: String(b.image).slice(0, 500) }),
        ...(b.ctaLabel !== undefined && { ctaLabel: b.ctaLabel ? String(b.ctaLabel).slice(0, 60) : null }),
        ...(b.ctaHref !== undefined && { ctaHref: b.ctaHref ? String(b.ctaHref).slice(0, 300) : null }),
        ...(b.active !== undefined && { active: Boolean(b.active) }),
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update banner" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.banner.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete banner" }, { status: 500 });
  }
}
