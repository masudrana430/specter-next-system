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

const serviceGroups = [
  [
    ["AI Agent Development", "/services#service-01"],
    ["Business Sketch", "/services#service-02"],
    ["Branding", "/services#service-03"],
    ["Product Sketch", "/services#service-04"],
    ["Product Design", "/services#service-05"],
    ["Graphic Design", "/services#service-06"],
    ["Website Design & Development", "/services#service-07"],
  ],
  [
    ["App Building & Development", "/services#service-08"],
    ["Image Editing", "/services#service-09"],
    ["Video Editing", "/services#service-10"],
    ["Product Promo", "/services#service-11"],
    ["SEO", "/services#service-12"],
    ["Marketing Campaigns", "/services#service-13"],
  ],
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

  const closeMobile = () => setMenuOpen(false);

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
            className="grid size-[clamp(40px,4.4vw,46px)] shrink-0 place-items-center rounded-full border border-transparent bg-white text-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[transform,background-color,border-color,color] duration-300 hover:scale-[1.04] dark:border-white/20 dark:bg-black/55 dark:text-white dark:backdrop-blur-xl max-[720px]:size-12 [@media(max-width:720px)_and_(max-height:700px)]:size-11"
          >
            <LogoMark />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex h-[clamp(44px,5.2vw,48px)] max-w-[560px] flex-[1_1_560px] items-stretch justify-between rounded-full border border-transparent bg-white px-2 py-1 shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[background-color,border-color] duration-300 dark:border-white/20 dark:bg-black/55 dark:backdrop-blur-xl max-[720px]:hidden"
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
                className={`relative grid min-w-0 flex-1 place-items-center whitespace-nowrap px-2 pb-[5px] text-[clamp(12px,1.25vw,14px)] font-medium leading-none tracking-[-0.01em] text-[#2e2e2e] transition-[opacity,color] duration-200 hover:opacity-100 dark:text-white ${index === 0 ? "opacity-100" : "opacity-55 dark:opacity-70"}`}
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
            className={`relative z-[130] hidden size-12 shrink-0 cursor-pointer content-center justify-items-center gap-[5px] rounded-full border p-0 shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[background-color,border-color,transform] duration-300 max-[720px]:grid [@media(max-width:720px)_and_(max-height:700px)]:size-11 ${menuOpen ? "border-black/10 bg-white dark:border-white/20 dark:bg-white" : "border-transparent bg-[#28282a] dark:border-white/20 dark:bg-black/55 dark:backdrop-blur-xl"}`}
          >
            <span className={`block h-[1.5px] w-[18px] origin-center rounded-full transition-[transform,background-color] duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45 bg-[#111]" : "bg-white"}`} />
            <span className={`block h-[1.5px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-300 ${menuOpen ? "scale-x-[0.2] bg-[#111] opacity-0" : "bg-white"}`} />
            <span className={`block h-[1.5px] w-[18px] origin-center rounded-full transition-[transform,background-color] duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45 bg-[#111]" : "bg-white"}`} />
          </button>
        </header>

        <div
          className={`pointer-events-auto absolute left-1/2 top-[calc(100%-10px)] hidden w-[min(960px,calc(100vw-48px))] -translate-x-1/2 overflow-hidden rounded-[24px] border border-black/10 bg-white/95 text-[#171717] shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-250 dark:border-white/15 dark:bg-[#111]/95 dark:text-white min-[721px]:block ${servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 pointer-events-none opacity-0"}`}
          onMouseEnter={() => setServicesOpen(true)}
        >
          <div className="grid grid-cols-[1.35fr_.65fr] gap-0">
            <div className="p-7">
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45 dark:text-white/45">Services</p>
                  <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em]">One studio. Thirteen specialist disciplines.</h2>
                </div>
                <Link href="/services" className="whitespace-nowrap text-[13px] font-medium text-black/55 transition-colors hover:text-black dark:text-white/55 dark:hover:text-white">View all →</Link>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {serviceGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="grid content-start">
                    {group.map(([label, href], index) => (
                      <Link
                        key={label}
                        href={href}
                        className="group flex min-h-9 items-center justify-between rounded-lg px-2 text-[13.5px] font-medium text-black/70 transition-[background-color,color,transform] hover:translate-x-0.5 hover:bg-black/[0.045] hover:text-black dark:text-white/70 dark:hover:bg-white/[0.07] dark:hover:text-white"
                      >
                        <span><span className="mr-2 text-[10px] tabular-nums text-black/30 dark:text-white/30">{String(groupIndex * 7 + index + 1).padStart(2, "0")}</span>{label}</span>
                        <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 border-l border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.025]">
              <Link href="/services#service-01" className="group flex min-h-[124px] flex-col justify-end rounded-[18px] border border-black/10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.04),transparent_60%),linear-gradient(145deg,#f8f8f8,#ececec)] p-5 transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%),linear-gradient(145deg,#242424,#121212)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">AI & Digital</span>
                <strong className="mt-2 text-[18px] tracking-[-0.035em]">Agents, websites & apps</strong>
                <span className="mt-1 text-[12.5px] text-black/50 dark:text-white/50">Build systems that think, ship and scale.</span>
              </Link>
              <Link href="/services#service-09" className="group flex min-h-[124px] flex-col justify-end rounded-[18px] border border-black/10 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_60%),linear-gradient(145deg,#f4f4f4,#e6e6e6)] p-5 transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%),linear-gradient(145deg,#202020,#101010)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">Visual Production</span>
                <strong className="mt-2 text-[18px] tracking-[-0.035em]">Image, video & campaigns</strong>
                <span className="mt-1 text-[12.5px] text-black/50 dark:text-white/50">From raw assets to market-ready creative.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="shared-home-mobile-menu" className={`fixed inset-0 z-[120] hidden transition-[opacity,visibility] duration-300 max-[720px]:block ${menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`} aria-hidden={!menuOpen}>
        <button type="button" aria-label="Close menu" onClick={closeMobile} className="absolute inset-0 size-full border-0 bg-black/60 p-0 backdrop-blur-[8px]" />
        <div className={`absolute left-1/2 top-[clamp(80px,12vh,104px)] z-[1] max-h-[calc(100vh-120px)] w-[min(calc(100%-28px),460px)] -translate-x-1/2 overflow-y-auto rounded-[28px] border border-black/5 bg-white px-[18px] pb-5 pt-[22px] text-[#2e2e2e] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-300 dark:border-white/15 dark:bg-[#111]/95 dark:text-white ${menuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-[14px] scale-[0.97] opacity-0"}`}>
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navItems.map((item, index) => (
              <Link key={item.label} href={item.href} aria-current={index === 0 ? "page" : undefined} onClick={closeMobile} className="relative flex min-h-[50px] items-center justify-center rounded-2xl px-[14px] pb-2 text-[15px] font-medium text-[#2e2e2e] transition-colors hover:bg-black/[0.045] dark:text-white dark:hover:bg-white/[0.08]">
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
    </>
  );
}
