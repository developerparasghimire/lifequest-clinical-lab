import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json({ success: true, data: items });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const { name, role, content, rating, avatar, order, active } = await req.json();
    if (!name || !content) {
      return NextResponse.json({ success: false, error: "name and content required" }, { status: 400 });
    }
    const item = await prisma.testimonial.create({
      data: {
        name: String(name).slice(0, 100),
        role: role ? String(role).slice(0, 100) : null,
        content: String(content).slice(0, 1000),
        rating: Math.max(1, Math.min(5, Number(rating) || 5)),
        avatar: avatar ? String(avatar).slice(0, 500) : null,
        order: Number(order) || 0,
        active: active === undefined ? true : Boolean(active),
      },
    });
    revalidateTag("testimonials", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 });
  }
}
