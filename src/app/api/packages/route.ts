import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json({ success: true, data: packages });
  } catch (e) {
    console.error("[packages GET]", e);
    return NextResponse.json({ success: false, error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, price, oldPrice, icon, image, tests, featured, active, order } = body;

    if (!title || !description || price === undefined) {
      return NextResponse.json({ success: false, error: "title, description and price are required" }, { status: 400 });
    }

    const pkg = await prisma.package.create({
      data: {
        title: String(title).slice(0, 200),
        description: String(description).slice(0, 2000),
        price: Number(price),
        oldPrice: oldPrice === undefined || oldPrice === null || oldPrice === "" ? null : Number(oldPrice),
        icon: icon ? String(icon).slice(0, 10) : null,
        image: image ? String(image).slice(0, 500) : null,
        tests: tests ? String(tests).slice(0, 10000) : "",
        featured: Boolean(featured),
        active: active === undefined ? true : Boolean(active),
        order: Number(order) || 0,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: pkg }, { status: 201 });
  } catch (e) {
    console.error("[packages POST]", e);
    return NextResponse.json({ success: false, error: "Failed to create package" }, { status: 500 });
  }
}
