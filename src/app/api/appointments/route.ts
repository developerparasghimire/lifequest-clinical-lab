import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendAppointmentConfirmation } from "@/lib/email";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: appointments });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, testType, date, notes } = body;

    if (!name || !phone || !email || !testType || !date) {
      return NextResponse.json({ success: false, error: "All required fields must be filled" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json({ success: false, error: "Invalid date" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        name: String(name).slice(0, 100),
        phone: String(phone).slice(0, 20),
        email: String(email).slice(0, 200),
        testType: String(testType).slice(0, 200),
        date: appointmentDate,
        notes: notes ? String(notes).slice(0, 500) : null,
        status: "pending",
      },
    });

    // Send email notifications (non-blocking)
    sendAppointmentConfirmation({
      name,
      email,
      testType,
      date: appointmentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }).catch(console.error);

    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create appointment" }, { status: 500 });
  }
}
