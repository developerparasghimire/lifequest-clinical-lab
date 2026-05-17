import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ success: true, data: items });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.name || !b.role) {
      return NextResponse.json({ success: false, error: "name and role required" }, { status: 400 });
    }
    const item = await prisma.teamMember.create({
      data: {
        name: String(b.name).slice(0, 100),
        role: String(b.role).slice(0, 100),
        bio: b.bio ? String(b.bio).slice(0, 1000) : null,
        photo: b.photo ? String(b.photo).slice(0, 500) : null,
        email: b.email ? String(b.email).slice(0, 200) : null,
        phone: b.phone ? String(b.phone).slice(0, 50) : null,
        facebook: b.facebook ? String(b.facebook).slice(0, 500) : null,
        twitter: b.twitter ? String(b.twitter).slice(0, 500) : null,
        linkedin: b.linkedin ? String(b.linkedin).slice(0, 500) : null,
        order: Number(b.order) || 0,
        active: b.active === undefined ? true : Boolean(b.active),
      },
    });
    revalidateTag("team", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create team member" }, { status: 500 });
  }
}
