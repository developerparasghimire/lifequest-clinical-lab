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
    const updated = await prisma.branch.update({
      where: { id },
      data: {
        ...(b.name !== undefined && { name: String(b.name).slice(0, 100) }),
        ...(b.address !== undefined && { address: String(b.address).slice(0, 300) }),
        ...(b.phone !== undefined && { phone: b.phone ? String(b.phone).slice(0, 60) : null }),
        ...(b.email !== undefined && { email: b.email ? String(b.email).slice(0, 120) : null }),
        ...(b.hours !== undefined && { hours: b.hours ? String(b.hours).slice(0, 200) : null }),
        ...(b.mapUrl !== undefined && { mapUrl: b.mapUrl ? String(b.mapUrl).slice(0, 500) : null }),
        ...(b.mapEmbed !== undefined && { mapEmbed: b.mapEmbed ? String(b.mapEmbed).slice(0, 1000) : null }),
        ...(b.image !== undefined && { image: b.image ? String(b.image).slice(0, 500) : null }),
        ...(b.order !== undefined && { order: Number(b.order) }),
        ...(b.active !== undefined && { active: Boolean(b.active) }),
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update branch" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.branch.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete branch" }, { status: 500 });
  }
}
