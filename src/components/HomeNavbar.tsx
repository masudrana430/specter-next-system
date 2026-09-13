"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/pricing" },
];

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
    <span
      aria-hidden="true"
      className={`absolute left-1/2 flex -translate-x-1/2 gap-[2px] ${mobile ? "bottom-2" : "bottom-[5px]"}`}
    >
      <i className="size-[3px] rounded-full bg-[#111] dark:bg-white" />
      <i className="size-[3px] rounded-full bg-[#111] dark:bg-white" />
      <i className="size-[3px] rounded-full bg-[#111] dark:bg-white" />
    </span>
  );
}

export function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };

    const onResize = () => {
      if (window.innerWidth > 720) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[100] px-[clamp(14px,3vw,32px)] py-[clamp(16px,2.4vh,28px)] max-[720px]:px-[clamp(14px,4vw,24px)] [@media(max-height:700px)]:py-[14px]">
        <header className="pointer-events-auto mx-auto flex w-full max-w-[720px] items-center justify-center gap-[clamp(18px,2.8vw,28px)] max-[720px]:max-w-none max-[720px]:justify-between max-[720px]:gap-4">
          <Link
            href="/"
            aria-label="Specter Visual Lab home"
            className="grid size-[clamp(40px,4.4vw,46px)] shrink-0 place-items-center rounded-full border border-transparent bg-white text-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[transform,background-color,border-color,color] duration-300 hover:scale-[1.04] dark:border-white/20 dark:bg-black/55 dark:text-white dark:backdrop-blur-xl max-[720px]:size-12 [@media(max-width:720px)_and_(max-height:700px)]:size-11"
          >
            <LogoMark />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex h-[clamp(44px,5.2vw,48px)] max-w-[430px] flex-[1_1_430px] items-stretch justify-between rounded-full border border-transparent bg-white px-2 py-1 shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[background-color,border-color] duration-300 dark:border-white/20 dark:bg-black/55 dark:backdrop-blur-xl max-[720px]:hidden"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`relative grid min-w-0 flex-1 place-items-center whitespace-nowrap px-2 pb-[5px] text-[clamp(13px,1.4vw,15px)] font-medium leading-none tracking-[-0.01em] text-[#2e2e2e] transition-[opacity,color] duration-200 hover:opacity-100 dark:text-white ${index === 0 ? "opacity-100" : "opacity-50 dark:opacity-65"}`}
              >
                {item.label}
                {index === 0 && <ActiveDots />}
              </Link>
            ))}
          </nav>

          <div className="max-[720px]:hidden">
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
      </div>

      <div
        id="shared-home-mobile-menu"
        className={`fixed inset-0 z-[120] hidden transition-[opacity,visibility] duration-300 max-[720px]:block ${menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="absolute inset-0 size-full border-0 bg-black/60 p-0 backdrop-blur-[8px]"
        />

        <div className={`absolute left-1/2 top-[clamp(80px,12vh,104px)] z-[1] w-[min(calc(100%-28px),460px)] -translate-x-1/2 rounded-[28px] border border-black/5 bg-white px-[18px] pb-5 pt-[22px] text-[#2e2e2e] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-300 dark:border-white/15 dark:bg-[#111]/95 dark:text-white ${menuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-[14px] scale-[0.97] opacity-0"}`}>
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                onClick={closeMenu}
                className="relative flex min-h-[50px] items-center justify-center rounded-2xl px-[14px] pb-2 text-[15px] font-medium text-[#2e2e2e] transition-colors hover:bg-black/[0.045] dark:text-white dark:hover:bg-white/[0.08]"
              >
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
