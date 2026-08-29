import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Only JPEG, PNG, WebP and GIF images are allowed" }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File size must be under 5MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Production (Vercel): use Vercel Blob storage.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${safeName}`, file, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ success: true, url: blob.url });
    }

    // Without a blob token the only option left is the local filesystem, which
    // on Vercel is read-only and wiped between invocations. Writing there would
    // either throw or "succeed" and then 404 forever, so fail loudly instead of
    // saving a broken image URL into the database.
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      console.error("[upload] BLOB_READ_WRITE_TOKEN is not set — refusing to write to an ephemeral filesystem");
      return NextResponse.json(
        {
          success: false,
          error:
            "Image storage is not configured. Add a Vercel Blob store to this project and set BLOB_READ_WRITE_TOKEN, then try again.",
        },
        { status: 503 }
      );
    }

    // Local dev fallback: write to public/uploads/.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, safeName), buffer);

    return NextResponse.json({ success: true, url: `/uploads/${safeName}` });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
