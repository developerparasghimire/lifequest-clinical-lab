import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data: services });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, price, icon, image, featured, order } = body;

    if (!title || !description || price === undefined) {
      return NextResponse.json({ success: false, error: "title, description, and price are required" }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title: String(title).slice(0, 200),
        description: String(description).slice(0, 1000),
        price: Number(price),
        icon: icon ? String(icon).slice(0, 10) : null,
        image: image ? String(image).slice(0, 500) : null,
        featured: Boolean(featured),
        order: Number(order) || 0,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
