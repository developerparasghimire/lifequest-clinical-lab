import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.branch.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
    return NextResponse.json({ success: true, data: items });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch branches" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const { name, address, phone, email, hours, mapUrl, mapEmbed, image, order, active } = await req.json();
    if (!name || !address) {
      return NextResponse.json({ success: false, error: "name and address required" }, { status: 400 });
    }
    const item = await prisma.branch.create({
      data: {
        name: String(name).slice(0, 100),
        address: String(address).slice(0, 300),
        phone: phone ? String(phone).slice(0, 60) : null,
        email: email ? String(email).slice(0, 120) : null,
        hours: hours ? String(hours).slice(0, 200) : null,
        mapUrl: mapUrl ? String(mapUrl).slice(0, 500) : null,
        mapEmbed: mapEmbed ? String(mapEmbed).slice(0, 1000) : null,
        image: image ? String(image).slice(0, 500) : null,
        order: Number(order) || 0,
        active: active === undefined ? true : Boolean(active),
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create branch" }, { status: 500 });
  }
}
