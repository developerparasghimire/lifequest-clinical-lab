import nodemailer from "nodemailer";

function getTransporter() {
  // Skip email if SMTP not configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendAppointmentConfirmation(data: {
  name: string;
  email: string;
  testType: string;
  date: string;
}) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured, skip silently

  const { name, email, testType, date } = data;

  // Email to patient
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Appointment Confirmation – Life Quest Clinical Lab",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #e2e8f0;border-radius:8px">
        <div style="background:#1d4ed8;padding:20px;border-radius:6px 6px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">Life Quest Clinical Lab</h1>
        </div>
        <div style="padding:24px">
          <h2 style="color:#1e293b">Hi ${name},</h2>
          <p style="color:#475569">Your appointment has been successfully booked. Here are your details:</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;background:#f8fafc;font-weight:bold;color:#1e293b">Test</td><td style="padding:8px;color:#475569">${testType}</td></tr>
            <tr><td style="padding:8px;background:#f1f5f9;font-weight:bold;color:#1e293b">Date</td><td style="padding:8px;color:#475569">${date}</td></tr>
          </table>
          <p style="color:#475569">Please arrive 10 minutes early and bring a valid photo ID. For fasting tests, avoid eating for 8–12 hours beforehand.</p>
          <p style="color:#64748b;font-size:14px">If you need to reschedule, please call us at <strong>+977-1-4002747</strong>.</p>
        </div>
      </div>
    `,
  });

  // Notification to admin
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Appointment: ${name} – ${testType}`,
    html: `
      <p>New appointment booked:</p>
      <ul>
        <li><strong>Patient:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Test:</strong> ${testType}</li>
        <li><strong>Date:</strong> ${date}</li>
      </ul>
    `,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured, skip silently

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message from ${data.name}`,
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
