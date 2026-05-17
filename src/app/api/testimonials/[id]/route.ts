import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const b = await req.json();
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(b.name !== undefined && { name: String(b.name).slice(0, 100) }),
        ...(b.role !== undefined && { role: b.role ? String(b.role).slice(0, 100) : null }),
        ...(b.content !== undefined && { content: String(b.content).slice(0, 1000) }),
        ...(b.rating !== undefined && { rating: Math.max(1, Math.min(5, Number(b.rating))) }),
        ...(b.avatar !== undefined && { avatar: b.avatar ? String(b.avatar).slice(0, 500) : null }),
        ...(b.order !== undefined && { order: Number(b.order) }),
        ...(b.active !== undefined && { active: Boolean(b.active) }),
      },
    });
    revalidateTag("testimonials", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidateTag("testimonials", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
  }
}
