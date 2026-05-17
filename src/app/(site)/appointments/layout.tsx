import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment Online",
  description:
    "Book your lab test appointment online with Life Quest Clinical Lab. Fast confirmation, home sample collection available across Kathmandu, Birtamod and Gaighat.",
  alternates: { canonical: "/appointments" },
  openGraph: {
    title: "Book Appointment Online · Life Quest Clinical Lab",
    description:
      "Schedule your medical lab test in seconds. Same-day reporting and home sample collection available across Nepal.",
    url: "/appointments",
    type: "website",
  },
};

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
