"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type NavChild = { href: string; label: string };
type NavLink = { href: string; label: string; external?: boolean; children?: NavChild[] };

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about/who-we-are", label: "Who We Are" },
      { href: "/about/our-team", label: "Our Team" },
      { href: "/about/our-journey", label: "Our Journey" },
      { href: "/about/ifcc-pep", label: "IFCC" },
    ],
  },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/lab-tests", label: "Lab Tests" },
      { href: "/services/packages", label: "Packages" },
    ],
  },
  { href: "/appointments", label: "Appointments" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "http://103.191.130.21/Online_LifeQuest/Forms/fm_Login.aspx", label: "Online Report", external: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      // Hide when scrolling down past 80px; reveal when scrolling up; never hide while mobile menu is open
      if (currentY < 80) {
        setHidden(false);
      } else {
        setHidden(currentY > lastScrollY.current);
      }
      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.82)" : "#ffffff",
        backdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
        boxShadow: scrolled ? "0 6px 30px -12px rgba(4,11,47,0.18)" : "0 1px 0 rgba(220,220,220,0.7)",
        transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-[#00B67A] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={`flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "h-[68px]" : "h-[76px]"}`}>
          {/* Brand */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="Life Quest Clinical Lab — Home">
            <Image
              src="/logo.png"
              alt="Life Quest Clinical Lab"
              width={200}
              height={80}
              priority
              loading="eager"
              className="w-auto object-contain transition-transform group-hover:scale-105"
              style={{
                height: scrolled ? "38px" : "44px",
                maxWidth: "180px",
                transition: "height 0.3s ease",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active = !l.external && (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href));
              const hasChildren = !!l.children?.length;
              return (
                <li key={l.href} className={hasChildren ? "relative group/menu" : ""}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative px-4 py-2 text-[14px] font-semibold rounded transition-colors hover:text-[#00B67A] inline-flex items-center gap-1"
                    style={{ color: active ? "#00B67A" : "#444444" }}
                  >
                    <span className="relative">
                      {l.label}
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                        style={{
                          background: "#00B67A",
                          transform: active ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </span>
                    {hasChildren && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/menu:rotate-180">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    )}
                  </Link>

                  {hasChildren && (
                    <div
                      className="invisible opacity-0 translate-y-1 group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 absolute left-0 top-full pt-3 transition-all duration-200 z-50"
                    >
                      <div
                        role="menu"
                        className="w-[260px] rounded-xl border bg-white py-1.5"
                        style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
                      >
                        {l.children!.map((c) => {
                          const childActive = pathname === c.href || (c.href !== "/about" && pathname.startsWith(c.href));
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              role="menuitem"
                              className="flex px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#F0FDF9]"
                              style={{ color: childActive ? "#00B67A" : "#040B2F" }}
                            >
                              {c.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden border border-slate-200 hover:border-[#00B67A] hover:text-[#00B67A] transition-colors"
              style={{ color: "#040B2F" }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
                {open ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                )}
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[86%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-[68px] border-b" style={{ borderColor: "#EEF1F5" }}>
                <span className="text-sm font-semibold tracking-wide" style={{ color: "#040B2F" }}>Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:border-[#00B67A] hover:text-[#00B67A] transition-colors"
                  style={{ color: "#040B2F" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col">
                  {navLinks.map((l, i) => {
                    const active = !l.external && (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href));
                    return (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.3 }}
                      >
                        <Link
                          href={l.href}
                          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors"
                          style={{ color: active ? "#00B67A" : "#444444", background: active ? "#ECFDF5" : "transparent" }}
                        >
                          {l.label}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                        </Link>
                        {l.children?.length ? (
                          <ul className="ml-3 mb-1 border-l" style={{ borderColor: "#EEF1F5" }}>
                            {l.children.map((c) => {
                              const cActive = pathname.startsWith(c.href);
                              return (
                                <li key={c.href}>
                                  <Link
                                    href={c.href}
                                    className="flex items-center justify-between rounded-lg pl-4 pr-3 py-2.5 text-[14px] font-medium transition-colors"
                                    style={{ color: cActive ? "#00B67A" : "#666", background: cActive ? "#ECFDF5" : "transparent" }}
                                  >
                                    {c.label}
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <div className="p-5 border-t space-y-3" style={{ borderColor: "#EEF1F5" }}>
                <Link
                  href="/appointments"
                  className="lab-btn btn-pop inline-flex w-full justify-center text-sm"
                  style={{ borderRadius: "10px" }}
                >
                  Book a Test →
                </Link>
                <a
                  href="tel:+97714002747"
                  className="lab-btn-outline inline-flex w-full justify-center text-sm"
                  style={{ borderRadius: "10px" }}
                >
                  Call +977-1-4002747
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
