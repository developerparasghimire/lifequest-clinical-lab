import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: contacts });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "name, email, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name: String(name).slice(0, 100),
        email: String(email).slice(0, 200),
        phone: phone ? String(phone).slice(0, 20) : null,
        message: String(message).slice(0, 2000),
      },
    });

    sendContactNotification({ name, email, message }).catch(console.error);

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
