import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/Sidebar";

// Auth-gated dashboard — always rendered per request.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Login page lives inside this segment but should render without the
  // dashboard chrome. Middleware (src/proxy.ts) handles auth redirects
  // for every other admin path, so a missing session here means we are on
  // the login screen — pass through children unchanged.
  if (!session) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-800">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
              {session.user?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-800">{session.user?.email}</p>
              <p className="text-slate-400 text-xs capitalize">
                {(session.user as { role?: string })?.role || "admin"}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
