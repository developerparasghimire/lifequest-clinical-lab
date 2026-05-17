import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, description, price, icon, image, featured, order } = body;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...(title && { title: String(title).slice(0, 200) }),
        ...(description && { description: String(description).slice(0, 1000) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(icon !== undefined && { icon: icon ? String(icon).slice(0, 10) : null }),
        ...(image !== undefined && { image: image ? String(image).slice(0, 500) : null }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
