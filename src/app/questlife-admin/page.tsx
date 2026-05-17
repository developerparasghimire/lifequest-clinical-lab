import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getDashboardStats() {
  const [appointments, services, blogs, contacts, unread, pending] =
    await Promise.all([
      prisma.appointment.count(),
      prisma.service.count(),
      prisma.blog.count({ where: { published: true } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { read: false } }),
      prisma.appointment.count({ where: { status: "pending" } }),
    ]);
  return { appointments, services, blogs, contacts, unread, pending };
}

async function getRecentAppointments() {
  return prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const recent = await getRecentAppointments();

  const cards = [
    { label: "Total Appointments", value: stats.appointments, badge: `${stats.pending} pending`, icon: "📅", href: "/questlife-admin/appointments", color: "bg-blue-50 border-blue-200" },
    { label: "Active Services", value: stats.services, badge: null, icon: "🔬", href: "/questlife-admin/services", color: "bg-cyan-50 border-cyan-200" },
    { label: "Published Posts", value: stats.blogs, badge: null, icon: "📝", href: "/questlife-admin/blog", color: "bg-purple-50 border-purple-200" },
    { label: "Contact Messages", value: stats.contacts, badge: stats.unread > 0 ? `${stats.unread} unread` : null, icon: "✉️", href: "/questlife-admin/messages", color: "bg-orange-50 border-orange-200" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s an overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-white rounded-2xl p-5 border ${card.color} hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{card.icon}</span>
              {card.badge && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="text-sm text-slate-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Recent Appointments</h2>
          <Link
            href="/questlife-admin/appointments"
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Patient</th>
                <th className="px-5 py-3 text-left">Test</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                    No appointments yet
                  </td>
                </tr>
              ) : (
                recent.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">{apt.name}</p>
                      <p className="text-slate-400 text-xs">{apt.email}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{apt.testType}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {new Date(apt.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[apt.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/questlife-admin/services", label: "Add New Service", icon: "➕" },
          { href: "/questlife-admin/blog/new", label: "Write Blog Post", icon: "✏️" },
          { href: "/questlife-admin/appointments", label: "Manage Appointments", icon: "📋" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-blue-700 text-white rounded-2xl p-4 flex items-center gap-3 hover:bg-blue-800 transition-colors"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="font-semibold">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
