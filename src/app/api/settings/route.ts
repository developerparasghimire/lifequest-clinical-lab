import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rows = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return NextResponse.json({ success: true, data: map });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

// Bulk upsert: body = { "key.one": "value", "key.two": "value" }
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const entries = Object.entries(body).filter(([k]) => typeof k === "string" && k.length <= 100);

    await prisma.$transaction(
      entries.map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value ?? "").slice(0, 2000) },
          create: { key, value: String(value ?? "").slice(0, 2000) },
        })
      )
    );
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, count: entries.length });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}
