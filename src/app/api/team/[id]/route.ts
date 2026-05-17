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
    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(b.name !== undefined && { name: String(b.name).slice(0, 100) }),
        ...(b.role !== undefined && { role: String(b.role).slice(0, 100) }),
        ...(b.bio !== undefined && { bio: b.bio ? String(b.bio).slice(0, 1000) : null }),
        ...(b.photo !== undefined && { photo: b.photo ? String(b.photo).slice(0, 500) : null }),
        ...(b.email !== undefined && { email: b.email ? String(b.email).slice(0, 200) : null }),
        ...(b.phone !== undefined && { phone: b.phone ? String(b.phone).slice(0, 50) : null }),
        ...(b.facebook !== undefined && { facebook: b.facebook ? String(b.facebook).slice(0, 500) : null }),
        ...(b.twitter !== undefined && { twitter: b.twitter ? String(b.twitter).slice(0, 500) : null }),
        ...(b.linkedin !== undefined && { linkedin: b.linkedin ? String(b.linkedin).slice(0, 500) : null }),
        ...(b.order !== undefined && { order: Number(b.order) }),
        ...(b.active !== undefined && { active: Boolean(b.active) }),
      },
    });
    revalidateTag("team", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidateTag("team", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete team member" }, { status: 500 });
  }
}
