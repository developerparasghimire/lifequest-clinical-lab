import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import TestDetail from "@/components/services/TestDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return { title: "Test Not Found" };
    return {
      title: service.title,
      description: service.description,
      alternates: { canonical: `/services/lab-tests/${id}` },
      openGraph: {
        title: `${service.title} · Life Quest Clinical Lab`,
        description: service.description,
        url: `/services/lab-tests/${id}`,
        type: "website",
      },
    };
  } catch {
    return { title: "Lab Test" };
  }
}

export const dynamic = "force-dynamic";

export default async function TestDetailPage({ params }: Props) {
  const { id } = await params;
  return <TestDetail id={id} />;
}
