"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

const stats = [
  { label: "13+ years production experience", icon: "pill" as const },
  { label: "500+ projects delivered", icon: "arrow" as const },
  { label: "24–72h average turnaround", icon: "avatars" as const },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);
  return reduced;
}

function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] fill-current" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  );
}

function Sparkle() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
    </svg>
  );
}

function PillMetricIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="svl-dark-pill-1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id="svl-dark-pill-2" x1="13" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
        </linearGradient>
      </defs>
      <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#svl-dark-pill-1)" />
      <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#svl-dark-pill-2)" />
      <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
    </svg>
  );
}

function ArrowMetricIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
      <path d="M12 7.1v7.4" stroke="#111111" strokeWidth="1.85" strokeLinecap="round" />
      <path d="M8.15 12.35L12 16.2l3.85-3.85" fill="none" stroke="#111111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AvatarMetricIcon() {
  return (
    <svg className="h-[21px] w-[38px] shrink-0" viewBox="0 0 40 22" aria-hidden="true">
      <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
      <polygon points="7,4.5 9,9 6.5,8" fill="#f4f4f4" />
      <polygon points="13.4,4.5 11.4,9 13.9,8" fill="#f4f4f4" />
      <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
      <circle cx="8.9" cy="11.6" r="0.7" fill="#1a1a1a" />
      <circle cx="11.5" cy="11.6" r="0.7" fill="#1a1a1a" />
      <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
      <circle cx="17.4" cy="10" r="1.7" fill="#111111" />
      <circle cx="23" cy="10" r="1.7" fill="#111111" />
      <ellipse cx="20.2" cy="12" rx="1" ry="0.6" fill="#111111" />
      <path d="M18 14c1 1.2 3.4 1.2 4.4 0" fill="none" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
      <text x="30.2" y="15.1" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12.5" textAnchor="middle">s</text>
    </svg>
  );
}

function MetricIcon({ type }: { type: (typeof stats)[number]["icon"] }) {
  if (type === "pill") return <PillMetricIcon />;
  if (type === "arrow") return <ArrowMetricIcon />;
  return <AvatarMetricIcon />;
}

const liquidButton = "group relative isolate inline-flex h-[var(--hero-btn-h)] items-center justify-center overflow-hidden whitespace-nowrap rounded-[6px] px-[18px] text-[13.5px] font-medium tracking-[-0.02em] transition-[background,border-color,box-shadow,color,filter,transform] duration-300";

function Shine() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-[65%] z-[1] w-[60%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[330%]" />;
}

export function DarkHomeHero() {
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reducedMotion]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const media = window.matchMedia("(min-width: 901px)");
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    media.addEventListener?.("change", onMedia);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      media.removeEventListener?.("change", onMedia);
    };
  }, [closeMenu, menuOpen]);

  const noise = useMemo(() => `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, []);
  const visible = entered || reducedMotion;

  return (
    <section aria-labelledby="svl-dark-hero-title" className="relative isolate min-h-[100svh] w-full overflow-hidden bg-black font-['Inter',system-ui,sans-serif] text-white antialiased [--hero-btn-h:42px] [--hero-gap:85px] [--h1:48px] [--header-x:40px] [--header-y:22px] [--stats-x:72px] [--stats-y:36px] max-[900px]:[--hero-btn-h:48px] max-[900px]:[--hero-gap:36px] max-[900px]:[--h1:36px] max-[900px]:[--header-x:18px] max-[900px]:[--header-y:16px] max-[900px]:[--stats-x:20px] max-[900px]:[--stats-y:28px] max-[560px]:[--h1:34px] min-[1280px]:[--h1:54px] min-[1600px]:[--hero-btn-h:48px] min-[1600px]:[--h1:64px] min-[1920px]:[--hero-btn-h:52px] min-[1920px]:[--h1:76px] min-[2560px]:[--h1:88px]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
        <video className="size-full object-cover object-center" autoPlay loop muted playsInline preload="auto" tabIndex={-1}>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_75%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.035]" style={{ backgroundImage: noise }} aria-hidden="true" />

      <div className="relative z-[1] grid min-h-[100svh] w-full grid-rows-[auto_1fr_auto]">
        <button type="button" aria-label="Close menu" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} className={`fixed inset-0 z-40 hidden bg-black/40 transition-[opacity,visibility,backdrop-filter] duration-300 max-[900px]:block ${menuOpen ? "visible opacity-100 backdrop-blur-3xl" : "invisible opacity-0"}`} />

        <header className="relative z-50 grid grid-cols-[1fr_auto_1fr] items-center px-[var(--header-x)] pb-[10px] pt-[max(var(--header-y),env(safe-area-inset-top))] max-[900px]:grid-cols-[1fr_auto_auto] max-[900px]:gap-2">
          <Link href="/" aria-label="Specter Visual Lab home" className={`justify-self-start inline-flex items-center gap-[9px] text-[15.5px] font-semibold tracking-[-0.03em] text-white transition-[opacity,transform] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "scale-100 opacity-100" : "scale-[0.84] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "80ms" }}>
            <BrandMark />
            <span>Specter<span className="font-normal text-[#9a9a9a]">.lab</span></span>
          </Link>

          <nav id="svl-dark-mobile-nav" aria-label="Primary" className={`flex items-center justify-self-center gap-2 max-[900px]:fixed max-[900px]:inset-0 max-[900px]:z-[45] max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:justify-center max-[900px]:gap-3 max-[900px]:px-[22px] max-[900px]:pb-8 max-[900px]:pt-24 max-[900px]:transition-[opacity,visibility] max-[900px]:duration-300 ${menuOpen ? "max-[900px]:visible max-[900px]:pointer-events-auto max-[900px]:opacity-100" : "max-[900px]:invisible max-[900px]:pointer-events-none max-[900px]:opacity-0"}`}>
            {navItems.map((item, index) => (
              <Link key={item.label} href={item.href} onClick={closeMenu} className={`group relative inline-flex h-10 items-center justify-center overflow-hidden whitespace-nowrap rounded-[7px] border border-[rgba(198,198,198,0.55)] bg-[linear-gradient(105deg,#050505_0%,#2a2a2a_48%,#4a4a4a_100%)] px-[18px] text-[14px] font-normal tracking-[-0.01em] text-[#f3f3f3] transition-[background,border-color,box-shadow,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/90 hover:bg-[linear-gradient(105deg,#111_0%,#3a3a3a_45%,#6a6a6a_100%)] hover:shadow-[0_0_18px_rgba(200,210,230,0.18)] max-[900px]:h-14 max-[900px]:w-full max-[900px]:rounded-[10px] max-[900px]:text-[19px] ${visible ? "translate-y-0 scale-100 opacity-100" : index % 2 === 0 ? "scale-[0.84] opacity-0" : "translate-y-[14px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : `${160 + index * 120}ms` }}>
                <span className="pointer-events-none absolute inset-y-0 -left-[70%] w-[55%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[340%]" aria-hidden="true" />
                <span className="relative z-[1]">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="relative z-[80] flex items-center justify-self-end gap-2">
            <ThemeToggle variant="icon" />
            <Link href="/start-a-project" className={`${liquidButton} h-10 border border-white bg-[linear-gradient(180deg,#fff_0%,#e7e7e7_48%,#cfcfcf_100%)] px-4 text-[#111] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:border-[#f2f6ff] hover:bg-[linear-gradient(180deg,#fff_0%,#f3f6ff_42%,#d5def2_100%)] hover:shadow-[inset_0_1px_0_#fff,0_0_22px_rgba(186,208,255,0.35),0_8px_18px_rgba(255,255,255,0.12)] transition-[opacity,transform,background,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-[560px]:hidden ${visible ? "scale-100 opacity-100" : "scale-[0.84] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "340ms" }}>
              <Shine /><span className="relative z-[2]">Start a Project</span>
            </Link>
            <button type="button" aria-controls="svl-dark-mobile-nav" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)} className="relative z-[80] hidden size-[42px] place-content-center rounded-[6px] border border-white/15 bg-black/55 px-3 transition-[border-color,background] duration-200 hover:border-white/30 hover:bg-white/5 max-[900px]:grid">
              <span className={`block h-[1.5px] w-4 rounded bg-white transition-transform duration-200 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`mt-[5px] block h-[1.5px] w-4 rounded bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`mt-[5px] block h-[1.5px] w-4 rounded bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </header>

        <main className="flex min-h-0 items-end justify-center px-6 pb-[var(--hero-gap)] pt-2 max-[900px]:px-5 max-[900px]:pb-16 max-[900px]:pt-5">
          <div className="relative z-[1] flex w-full max-w-[860px] flex-col items-center text-center">
            <div className={`mb-[22px] inline-flex items-center gap-2 rounded-[5px] bg-[linear-gradient(90deg,#7d7d7d_0%,#2a2a2a_52%,#0a0a0a_100%)] px-[15px] py-[9px] text-[12.5px] font-normal tracking-[-0.01em] text-[#f2f2f2] transition-[opacity,transform] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "220ms" }}>
              <span className={`inline-flex drop-shadow-[0_0_3px_rgba(255,255,255,0.45)] transition-[opacity,transform] duration-700 ${visible ? "rotate-0 scale-100 opacity-100" : "-rotate-[50deg] scale-[0.2] opacity-0"}`}><Sparkle /></span>
              <span>Creative AI & Visual Production</span>
            </div>

            <h1 id="svl-dark-hero-title" className="flex flex-col items-center text-[var(--h1)] font-medium leading-[1.12] tracking-[-0.045em] text-white">
              <span className="block overflow-hidden px-[0.15em] pb-[0.14em] pt-[0.06em]">
                <span className={`inline-block transition-[opacity,transform] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "translate-y-0 opacity-100" : "translate-y-[40%] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "420ms" }}>
                  Build <em className="inline-block font-['Instrument_Serif','Times_New_Roman',serif] text-[1.08em] font-normal italic tracking-[-0.03em] text-[#9a9a9a]">visual systems</em> for your
                </span>
              </span>
              <span className="block overflow-hidden px-[0.15em] pb-[0.14em] pt-[0.06em]">
                <span className={`inline-block transition-[opacity,transform] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "translate-y-0 opacity-100" : "translate-y-[40%] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "620ms" }}>brand at production speed.</span>
              </span>
            </h1>

            <p className={`mt-[18px] max-w-[470px] text-[15.5px] font-normal leading-[1.55] tracking-[-0.015em] text-[#9a9a9a] transition-[opacity,transform] duration-[1250ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-[900px]:max-w-full max-[900px]:text-[16.5px] ${visible ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "820ms" }}>
              AI-powered design, development, post-production, and campaign execution across one integrated creative studio.
            </p>

            <div className="mt-[26px] flex flex-wrap justify-center gap-[10px] max-[560px]:w-full max-[560px]:flex-col">
              <Link href="/start-a-project" className={`${liquidButton} border border-white bg-[linear-gradient(180deg,#fff_0%,#e7e7e7_48%,#cfcfcf_100%)] text-[#111] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:border-[#f2f6ff] hover:bg-[linear-gradient(180deg,#fff_0%,#f3f6ff_42%,#d5def2_100%)] hover:shadow-[inset_0_1px_0_#fff,0_0_26px_rgba(186,208,255,0.4),0_8px_18px_rgba(255,255,255,0.14)] max-[560px]:w-full transition-[opacity,transform,background,border-color,box-shadow] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-[18px] scale-[0.94] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "960ms" }}>
                <Shine /><span className="relative z-[2]">Start a Project</span>
              </Link>
              <Link href="/services" className={`${liquidButton} border border-[rgba(198,198,198,0.55)] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,0,0,0.5)_46%,rgba(150,170,200,0.1))] text-white backdrop-blur-2xl hover:border-[rgba(220,230,255,0.8)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_24px_rgba(170,200,255,0.28)] max-[560px]:w-full transition-[opacity,transform,border-color,box-shadow] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "translate-x-0 opacity-100" : "translate-x-[22px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "1100ms" }}>
                <Shine /><span className="relative z-[2]">Explore Services</span>
              </Link>
            </div>
          </div>
        </main>

        <footer className="flex items-center justify-between gap-6 px-[var(--stats-x)] pb-[max(var(--stats-y),env(safe-area-inset-bottom))] text-[#d8d8d8] max-[900px]:flex-col max-[900px]:gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`inline-flex items-center gap-[14px] whitespace-nowrap text-[13.5px] tracking-[-0.015em] transition-[opacity,transform] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-[900px]:whitespace-normal max-[900px]:text-center max-[900px]:text-[15px] ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : `${1120 + index * 160}ms` }}>
              <MetricIcon type={stat.icon} /><span>{stat.label}</span>
            </div>
          ))}
        </footer>
      </div>
    </section>
  );
}
