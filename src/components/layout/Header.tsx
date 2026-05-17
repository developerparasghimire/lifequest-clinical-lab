"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/appointments", label: "Appointments" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "http://103.191.130.21/Online_LifeQuest/Forms/fm_Login.aspx", label: "Online Report", external: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHideTopBar(y > 80);
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
        background: scrolled ? "rgba(255,255,255,0.78)" : "#ffffff",
        backdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(160%) blur(14px)" : "none",
        boxShadow: scrolled ? "0 6px 30px -12px rgba(4,11,47,0.18)" : "0 1px 0 rgba(220,220,220,0.7)",
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-[#134CF7] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      {/* Announcement top bar — collapses on scroll */}
      <AnimatePresence initial={false}>
        {!hideTopBar && (
          <motion.div
            key="announce"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? {} : { height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
            style={{ background: "linear-gradient(90deg,#040B2F,#0c1f6e)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-2 text-[12px] text-white/85">
              <span className="flex items-center gap-2 truncate">
                <span className="truncate">Same-day reports &bull; Home sample collection across Kathmandu Valley</span>
              </span>
              <div className="hidden sm:flex items-center gap-5">
                <a href="tel:+97714002747" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  +977-1-4002747
                </a>
                <span className="opacity-60">Sun–Fri 7AM – 7PM • Sat 8AM – 4PM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={`flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "h-[68px]" : "h-[76px]"}`}>
          {/* Brand */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="Life Quest Clinical Lab — Home">
            <Image
              src="/logo.png"
              alt="Life Quest Clinical Lab"
              width={160}
              height={93}
              priority
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.18))" }}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active = !l.external && (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href));
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative px-4 py-2 text-[14px] font-medium rounded transition-colors hover:text-[#134CF7]"
                    style={{ color: active ? "#134CF7" : "#444444" }}
                  >
                    <span className="relative">
                      {l.label}
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                        style={{
                          background: "#134CF7",
                          transform: active ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+97714002747"
              className="hidden items-center gap-2 text-[14px] font-medium xl:inline-flex hover:text-[#134CF7] transition-colors"
              style={{ color: "#444444" }}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "#EEF3FF", color: "#134CF7" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
              </span>
              +977-1-4002747
            </a>

            <Link
              href="/appointments"
              className="hidden lab-btn btn-pop md:inline-flex text-sm"
              style={{ padding: "10px 22px", borderRadius: "10px", fontSize: "14px" }}
            >
              Book a Test
              <svg width="12" height="12" viewBox="0 0 19 19" fill="none">
                <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden border border-slate-200 hover:border-[#134CF7] hover:text-[#134CF7] transition-colors"
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:border-[#134CF7] hover:text-[#134CF7] transition-colors"
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
                          className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors"
                          style={{ color: active ? "#134CF7" : "#444444", background: active ? "#F0F4FF" : "transparent" }}
                        >
                          {l.label}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                        </Link>
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
