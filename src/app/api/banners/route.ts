import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  try {
    if (page) {
      const banner = await prisma.banner.findUnique({ where: { page } });
      return NextResponse.json({ success: true, data: banner });
    }
    const banners = await prisma.banner.findMany({ orderBy: { page: "asc" } });
    return NextResponse.json({ success: true, data: banners });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { page, title, subtitle, image, ctaLabel, ctaHref, active } = await req.json();
    if (!page || !title || !image) {
      return NextResponse.json({ success: false, error: "page, title, image required" }, { status: 400 });
    }
    const data = {
      title: String(title).slice(0, 200),
      subtitle: subtitle ? String(subtitle).slice(0, 500) : null,
      image: String(image).slice(0, 500),
      ctaLabel: ctaLabel ? String(ctaLabel).slice(0, 60) : null,
      ctaHref: ctaHref ? String(ctaHref).slice(0, 300) : null,
      active: active === undefined ? true : Boolean(active),
    };
    const banner = await prisma.banner.upsert({
      where: { page: String(page) },
      update: data,
      create: { ...data, page: String(page).slice(0, 50) },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to save banner" }, { status: 500 });
  }
}
