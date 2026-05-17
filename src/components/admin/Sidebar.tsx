"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/questlife-admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/questlife-admin/appointments", label: "Appointments", icon: "📅", exact: false },
  { href: "/questlife-admin/services", label: "Services", icon: "🔬", exact: false },
  { href: "/questlife-admin/blog", label: "Blog Posts", icon: "📝", exact: false },
  { href: "/questlife-admin/banners", label: "Banners", icon: "🖼️", exact: false },
  { href: "/questlife-admin/testimonials", label: "Testimonials", icon: "⭐", exact: false },
  { href: "/questlife-admin/team", label: "Team", icon: "👥", exact: false },
  { href: "/questlife-admin/branches", label: "Branches", icon: "📍", exact: false },
  { href: "/questlife-admin/messages", label: "Messages", icon: "✉️", exact: false },
  { href: "/questlife-admin/settings", label: "Settings", icon: "⚙️", exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/questlife-admin" className="flex items-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="Life Quest Clinical Lab"
            width={130}
            height={76}
            className="h-10 w-auto brightness-0 invert"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive(item.href, item.exact)
                ? "bg-blue-700 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>🌐</span> View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/questlife-admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
