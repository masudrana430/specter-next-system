"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const services = [
  ["AI Agent Development", "/services#service-01"],
  ["Business Sketch", "/services#service-02"],
  ["Branding", "/services#service-03"],
  ["Product Sketch", "/services#service-04"],
  ["Product Design", "/services#service-05"],
  ["Graphic Design", "/services#service-06"],
  ["Website Design & Development", "/services#service-07"],
  ["App Building & Development", "/services#service-08"],
  ["Image Editing", "/services#service-09"],
  ["Video Editing", "/services#service-10"],
  ["Product Promo", "/services#service-11"],
  ["SEO", "/services#service-12"],
  ["Marketing Campaigns", "/services#service-13"],
] as const;

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[23px] fill-current" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  );
}

function ActiveDots({ mobile = false }: { mobile?: boolean }) {
  return (
    <span aria-hidden="true" className={`absolute left-1/2 flex -translate-x-1/2 gap-[2px] ${mobile ? "bottom-2" : "bottom-[5px]"}`}>
      <i className="size-[3px] rounded-full bg-[#111] dark:bg-white" />
      <i className="size-[3px] rounded-full bg-[#111] dark:bg-white" />
      <i className="size-[3px] rounded-full bg-[#111] dark:bg-white" />
    </span>
  );
}

export function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth > 720) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[100] px-[clamp(14px,3vw,32px)] py-[clamp(16px,2.4vh,28px)] max-[720px]:px-[clamp(14px,4vw,24px)] [@media(max-height:700px)]:py-[14px]"
        onMouseLeave={() => setServicesOpen(false)}
      >
        <header className="pointer-events-auto mx-auto flex w-full max-w-[820px] items-center justify-center gap-[clamp(14px,2vw,24px)] max-[720px]:max-w-none max-[720px]:justify-between max-[720px]:gap-4">
          <Link
            href="/"
            aria-label="Specter Visual Lab home"
            onMouseEnter={() => setServicesOpen(false)}
            className="grid size-[clamp(40px,4.4vw,46px)] shrink-0 place-items-center rounded-full border border-transparent bg-white text-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.14)] dark:border-white/20 dark:bg-black/60 dark:text-white max-[720px]:size-12 [@media(max-width:720px)_and_(max-height:700px)]:size-11"
          >
            <LogoMark />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex h-[clamp(44px,5.2vw,48px)] max-w-[560px] flex-[1_1_560px] items-stretch justify-between rounded-full border border-transparent bg-white px-2 py-1 shadow-[0_4px_14px_rgba(0,0,0,0.14)] dark:border-white/20 dark:bg-black/60 max-[720px]:hidden"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                aria-haspopup={item.mega ? "true" : undefined}
                aria-expanded={item.mega ? servicesOpen : undefined}
                onMouseEnter={() => setServicesOpen(Boolean(item.mega))}
                onFocus={() => setServicesOpen(Boolean(item.mega))}
                className={`relative grid min-w-0 flex-1 place-items-center whitespace-nowrap rounded-full px-2 pb-[5px] text-[clamp(12px,1.25vw,14px)] font-medium leading-none tracking-[-0.01em] text-[#2e2e2e] hover:bg-black/[0.045] hover:text-black dark:text-white dark:hover:bg-white/[0.08] ${index === 0 ? "opacity-100" : "opacity-65"}`}
              >
                {item.label}
                {index === 0 && <ActiveDots />}
              </Link>
            ))}
          </nav>

          <div className="max-[720px]:hidden" onMouseEnter={() => setServicesOpen(false)}>
            <ThemeToggle variant="pill" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="shared-home-mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
            className={`relative z-[130] hidden size-12 shrink-0 cursor-pointer content-center justify-items-center gap-[5px] rounded-full border p-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] max-[720px]:grid [@media(max-width:720px)_and_(max-height:700px)]:size-11 ${menuOpen ? "border-black/10 bg-white" : "border-transparent bg-[#28282a] dark:border-white/20 dark:bg-black/60"}`}
          >
            <span className={`block h-[1.5px] w-[18px] rounded-full ${menuOpen ? "translate-y-[6.5px] rotate-45 bg-[#111]" : "bg-white"}`} />
            <span className={`block h-[1.5px] w-[18px] rounded-full ${menuOpen ? "opacity-0" : "bg-white"}`} />
            <span className={`block h-[1.5px] w-[18px] rounded-full ${menuOpen ? "-translate-y-[6.5px] -rotate-45 bg-[#111]" : "bg-white"}`} />
          </button>
        </header>

        {servicesOpen && (
          <div
            className="pointer-events-auto absolute left-1/2 top-[calc(100%-10px)] hidden w-[min(900px,calc(100vw-48px))] -translate-x-1/2 rounded-[18px] border border-black/10 bg-white text-[#171717] shadow-[0_18px_50px_rgba(0,0,0,0.18)] dark:border-white/15 dark:bg-[#111] dark:text-white min-[721px]:block"
            onMouseEnter={() => setServicesOpen(true)}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 dark:border-white/10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Services</p>
                <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.025em]">Specter Visual Lab capabilities</h2>
              </div>
              <Link href="/services" className="text-[13px] font-medium text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white">View all →</Link>
            </div>

            <div className="grid grid-cols-3 gap-x-3 gap-y-1 p-5">
              {services.map(([label, href], index) => (
                <Link
                  key={label}
                  href={href}
                  className="flex min-h-10 items-center rounded-lg px-3 text-[13.5px] font-medium text-black/70 hover:bg-black/[0.045] hover:text-black dark:text-white/70 dark:hover:bg-white/[0.07] dark:hover:text-white"
                >
                  <span className="mr-2 text-[10px] tabular-nums text-black/30 dark:text-white/30">{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {menuOpen && (
        <div id="shared-home-mobile-menu" className="fixed inset-0 z-[120] hidden max-[720px]:block" aria-hidden={false}>
          <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="absolute inset-0 size-full border-0 bg-black/60 p-0" />
          <div className="absolute left-1/2 top-[clamp(80px,12vh,104px)] z-[1] max-h-[calc(100vh-120px)] w-[min(calc(100%-28px),460px)] -translate-x-1/2 overflow-y-auto rounded-[24px] border border-black/5 bg-white px-[18px] pb-5 pt-[22px] text-[#2e2e2e] shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:border-white/15 dark:bg-[#111] dark:text-white">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navItems.map((item, index) => (
                <Link key={item.label} href={item.href} aria-current={index === 0 ? "page" : undefined} onClick={() => setMenuOpen(false)} className="relative flex min-h-[50px] items-center justify-center rounded-2xl px-[14px] pb-2 text-[15px] font-medium text-[#2e2e2e] hover:bg-black/[0.045] dark:text-white dark:hover:bg-white/[0.08]">
                  {item.label}
                  {index === 0 && <ActiveDots mobile />}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex justify-center border-t border-black/10 pt-4 dark:border-white/10">
              <ThemeToggle variant="pill" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
