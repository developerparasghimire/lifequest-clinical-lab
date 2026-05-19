import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const pkg = await prisma.package.findUnique({ where: { id } });
    if (!pkg) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: pkg });
  } catch (e) {
    console.error("[package GET id]", e);
    return NextResponse.json({ success: false, error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, description, price, oldPrice, icon, image, tests, featured, active, order } = body;

    const updated = await prisma.package.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: String(title).slice(0, 200) }),
        ...(description !== undefined && { description: String(description).slice(0, 2000) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(oldPrice !== undefined && { oldPrice: oldPrice === null || oldPrice === "" ? null : Number(oldPrice) }),
        ...(icon !== undefined && { icon: icon ? String(icon).slice(0, 10) : null }),
        ...(image !== undefined && { image: image ? String(image).slice(0, 500) : null }),
        ...(tests !== undefined && { tests: String(tests).slice(0, 10000) }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(active !== undefined && { active: Boolean(active) }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.package.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Package deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete package" }, { status: 500 });
  }
}
