"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type CountStat = {
  icon: string;
  target: number;
  suffix: string;
  decimals: number;
  label: string;
};

const stats: CountStat[] = [
  { icon: "+", target: 13, suffix: "+", decimals: 0, label: "Years Experience" },
  { icon: "#", target: 500, suffix: "+", decimals: 0, label: "Projects Delivered" },
  { icon: "*", target: 10, suffix: "+", decimals: 0, label: "Global Industries" },
  { icon: "<", target: 72, suffix: "h", decimals: 0, label: "Average Turnaround" },
];

const referenceLogo = "data:image/webp;base64,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";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/pricing" },
];

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const displayFont = "font-['BubbledotICG-FinePos','Geist_Pixel_Circle',monospace]";

function formatValue(value: number, decimals: number, suffix: string) {
  return `${Number(value).toFixed(decimals)}${suffix}`;
}

function ActiveDots({ mobile = false }: { mobile?: boolean }) {
  return (
    <span aria-hidden="true" className={`absolute left-1/2 flex -translate-x-1/2 gap-[2px] ${mobile ? "bottom-2" : "bottom-[5px]"}`}>
      <i className="size-[3px] rounded-full bg-[#111]" />
      <i className="size-[3px] rounded-full bg-[#111]" />
      <i className="size-[3px] rounded-full bg-[#111]" />
    </span>
  );
}

function MicrosoftGlyph() {
  return (
    <svg viewBox="0 0 20 20" className="size-[34%] min-h-3 min-w-3" aria-hidden="true">
      <rect x="1" y="1" width="8" height="8" fill="currentColor" />
      <rect x="11" y="1" width="8" height="8" fill="currentColor" />
      <rect x="1" y="11" width="8" height="8" fill="currentColor" />
      <rect x="11" y="11" width="8" height="8" fill="currentColor" />
    </svg>
  );
}

function AmazonGlyph() {
  return <span className="font-[Arial,sans-serif] text-[clamp(14px,1.6vw,18px)] font-extrabold leading-none" aria-hidden="true">a</span>;
}

function GoogleGlyph() {
  return <span className="font-[Arial,sans-serif] text-[clamp(12px,1.35vw,15px)] font-extrabold leading-none" aria-hidden="true">G</span>;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function ReferenceHomeHero() {
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [values, setValues] = useState(() => stats.map((stat) => formatValue(0, stat.decimals, stat.suffix)));
  const [counted, setCounted] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setValues(stats.map((stat) => formatValue(stat.target, stat.decimals, stat.suffix)));
      setCounted(true);
      return;
    }

    const node = statsRef.current;
    if (!node || counted) return;

    const animate = () => {
      setCounted(true);
      stats.forEach((stat, index) => {
        const duration = 1500 + index * 80;
        const startOffset = 480 + index * 90;
        window.setTimeout(() => {
          const start = performance.now();
          const frame = (now: number) => {
            const raw = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - raw, 3);
            setValues((current) => {
              const next = [...current];
              next[index] = formatValue(stat.target * eased, stat.decimals, stat.suffix);
              return next;
            });
            if (raw < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }, startOffset);
      });
    };

    if (!("IntersectionObserver" in window)) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        animate();
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [counted, reducedMotion]);

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuVisible(true);
        firstMobileLinkRef.current?.focus({ preventScroll: true });
      });
    });
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuVisible(false);
    const finish = () => {
      setMenuMounted(false);
      if (restoreFocus) menuToggleRef.current?.focus({ preventScroll: true });
    };
    if (reducedMotion) finish();
    else window.setTimeout(finish, 380);
  }, [reducedMotion]);

  useEffect(() => {
    if (!menuMounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 720) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [closeMenu, menuMounted]);

  const reveal = entered ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-[22px] scale-[0.98] opacity-0 blur-[6px]";

  return (
    <section aria-labelledby="hero-title" className="relative isolate h-screen min-h-[620px] w-full overflow-hidden bg-black font-['Inter','Segoe_UI',system-ui,sans-serif] text-white antialiased">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
        <video className="pointer-events-none absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="metadata" tabIndex={-1}>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative flex h-screen min-h-[620px] w-full flex-col items-center overflow-hidden px-[clamp(14px,3vw,32px)] py-[clamp(16px,2.4vh,28px)] max-[720px]:px-[clamp(14px,4vw,24px)] [@media(max-height:700px)]:py-[14px]">
        <header className={`relative z-10 w-full shrink-0 transition-[opacity,transform] duration-700 ${ease} ${entered || reducedMotion ? "translate-y-0 opacity-100" : "-translate-y-[18px] opacity-0"}`}>
          <div className="mx-auto flex w-full max-w-[720px] items-center justify-center gap-[clamp(18px,2.8vw,28px)] max-[720px]:max-w-none max-[720px]:justify-between max-[720px]:gap-4">
            <Link href="/" aria-label="Specter Visual Lab home" className="grid size-[clamp(40px,4.4vw,46px)] shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:scale-[1.04] max-[720px]:size-12 [@media(max-width:720px)_and_(max-height:700px)]:size-11">
              <Image src={referenceLogo} alt="" width={52} height={52} className="size-[72%] object-contain" priority />
            </Link>

            <nav aria-label="Primary navigation" className="flex h-[clamp(44px,5.2vw,48px)] max-w-[430px] flex-[1_1_430px] items-stretch justify-between rounded-full bg-white px-2 py-1 shadow-[0_4px_14px_rgba(0,0,0,0.16)] max-[720px]:hidden">
              {navItems.map((item, index) => (
                <Link key={item.label} href={item.href} aria-current={index === 0 ? "page" : undefined} className={`relative grid min-w-0 flex-1 place-items-center whitespace-nowrap px-2 pb-[5px] text-[clamp(13px,1.4vw,15px)] font-medium leading-none tracking-[-0.01em] text-[#2e2e2e] transition-opacity duration-200 hover:opacity-75 ${index === 0 ? "opacity-100" : "opacity-50"}`}>
                  {item.label}
                  {index === 0 && <ActiveDots />}
                </Link>
              ))}
            </nav>

            <div className="max-[720px]:hidden"><ThemeToggle variant="pill" /></div>

            <button ref={menuToggleRef} type="button" aria-label={menuMounted ? "Close menu" : "Open menu"} aria-expanded={menuMounted} aria-controls="mobile-menu" onClick={() => (menuMounted ? closeMenu() : openMenu())} className={`hidden size-12 shrink-0 cursor-pointer content-center justify-items-center gap-[5px] rounded-full border-0 p-0 shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-300 max-[720px]:grid [@media(max-width:720px)_and_(max-height:700px)]:size-11 ${menuMounted ? "relative z-[30] bg-white" : "bg-[#28282a]"}`}>
              <span className={`block h-[1.5px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-300 ${ease} ${menuMounted ? "translate-y-[6.5px] rotate-45 bg-[#111]" : "bg-white"}`} />
              <span className={`block h-[1.5px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-300 ${ease} ${menuMounted ? "scale-x-[0.2] bg-[#111] opacity-0" : "bg-white"}`} />
              <span className={`block h-[1.5px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-300 ${ease} ${menuMounted ? "-translate-y-[6.5px] -rotate-45 bg-[#111]" : "bg-white"}`} />
            </button>
          </div>
        </header>

        <main className="relative z-[1] flex min-h-0 w-full max-w-[900px] flex-1 flex-col items-center justify-center py-[clamp(8px,1.4vh,16px)] text-center max-[720px]:max-w-full [@media(max-height:700px)]:py-[6px]">
          <div className={`mb-[clamp(16px,2.5vh,26px)] inline-flex min-h-[clamp(36px,4.5vw,42px)] items-center justify-center transition-[opacity,transform,filter] duration-[850ms] ${ease} max-[420px]:mb-[15px] [@media(max-height:700px)]:mb-[10px] ${reducedMotion ? "" : reveal}`} style={{ transitionDelay: reducedMotion ? "0ms" : "50ms" }}>
            <div className="flex items-center" aria-hidden="true">
              {[<MicrosoftGlyph key="m" />, <AmazonGlyph key="a" />, <GoogleGlyph key="g" />].map((glyph, index) => (
                <span key={index} className={`relative grid size-[clamp(36px,4.5vw,42px)] shrink-0 place-items-center rounded-full border border-white/40 bg-[#28282a] p-[5px] transition-transform duration-350 ${ease} max-[420px]:size-[34px] max-[420px]:p-1 [@media(max-width:720px)_and_(max-height:700px)]:size-8 ${index > 0 ? "-ml-[clamp(15px,1.9vw,17.64px)] max-[420px]:-ml-[14px]" : ""} ${index === 0 ? "z-[1] hover:-translate-y-0.5" : index === 1 ? "z-[2] hover:-translate-y-1" : "z-[4] hover:-translate-y-0.5"}`}>
                  <span className="grid size-full place-items-center rounded-full bg-white text-[#111]">{glyph}</span>
                </span>
              ))}
            </div>
            <div className="relative z-[3] -ml-[clamp(15px,1.9vw,17.64px)] flex h-[clamp(36px,4.5vw,42px)] items-center whitespace-nowrap rounded-full border border-white/40 bg-[#28282a] pl-[clamp(20px,2.6vw,24px)] pr-[clamp(16px,2vw,20px)] text-[clamp(12px,1.4vw,13.5px)] font-medium leading-none text-[#c4c2c3] max-[420px]:-ml-[14px] max-[420px]:h-[34px] max-[420px]:pr-[14px] max-[420px]:text-xs [@media(max-width:720px)_and_(max-height:700px)]:h-8">13 disciplines. One integrated studio.</div>
          </div>

          <h1 id="hero-title" className={`m-0 max-w-full text-center ${displayFont} text-[clamp(28px,6.2vw,80px)] font-normal leading-[1.12] tracking-[-0.04em] text-white max-[720px]:text-[clamp(28px,11.2vw,58px)] max-[720px]:leading-[1.05] max-[720px]:tracking-[-0.08em] max-[420px]:text-[clamp(27px,11.5vw,46px)] max-[420px]:leading-[1.04] max-[420px]:tracking-[-0.09em] [@media(max-width:720px)_and_(max-height:700px)]:text-[clamp(26px,9.7vw,48px)]`}>
            <span className={`block max-w-full overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-[850ms] ${ease} ${entered || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "120ms" }}>Visual Intelligence</span>
            <span className={`block max-w-full overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-[850ms] ${ease} ${entered || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "300ms" }}>Designed To Evolve</span>
          </h1>

          <p className={`mx-auto mt-[clamp(14px,2.2vh,22px)] w-[min(500px,92%)] text-[clamp(16.166px,calc(1.55vw+2.666px),19.166px)] font-normal leading-[1.55] text-[#d0d0d0] transition-[opacity,transform,filter] duration-[850ms] ${ease} max-[720px]:w-[min(500px,94%)] max-[420px]:text-[clamp(14px,4.2vw,16px)] [@media(max-height:700px)]:mt-[10px] [@media(max-height:700px)]:leading-[1.45] [@media(max-width:720px)_and_(max-height:700px)]:text-[clamp(13px,3.7vw,15px)] ${reducedMotion ? "" : reveal}`} style={{ transitionDelay: reducedMotion ? "0ms" : "280ms" }}>
            AI agents, product experiences and visual production connected in one modular<br className="max-[720px]:hidden" /> creative system designed for modern brands.
          </p>

          <Link href="/start-a-project" className={`mt-[clamp(18px,2.7vh,28px)] inline-flex items-center justify-center rounded-full bg-white px-[clamp(22px,3vw,28px)] py-[clamp(11px,1.6vh,13px)] text-[clamp(13.5px,1.5vw,14.5px)] font-semibold leading-none text-black shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_22px_rgba(255,255,255,0.32),0_0_44px_rgba(255,255,255,0.12)] transition-[opacity,transform,filter,box-shadow] duration-[850ms] ${ease} hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.28),0_0_30px_rgba(255,255,255,0.48),0_0_58px_rgba(255,255,255,0.18)] [@media(max-height:700px)]:mt-[13px] [@media(max-height:700px)]:py-[10px] ${reducedMotion ? "" : entered ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-[22px] scale-[0.94] opacity-0 blur-[6px]"}`} style={{ transitionDelay: reducedMotion ? "0ms" : "400ms" }}>Start a Project</Link>
        </main>

        <footer ref={statsRef} aria-label="Studio metrics" className="relative z-[1] mx-auto grid w-full max-w-[920px] shrink-0 grid-cols-4 items-end gap-[clamp(14px,2vw,28px)] max-[720px]:grid-cols-2 max-[720px]:gap-x-4 max-[720px]:gap-y-[clamp(10px,1.7vh,18px)] [@media(max-height:700px)]:gap-x-4 [@media(max-height:700px)]:gap-y-[10px] [@media(max-width:720px)_and_(max-height:700px)]:gap-y-[7px]">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`grid min-w-0 content-end justify-items-center text-center transition-[opacity,transform,filter] duration-[850ms] ${ease} ${reducedMotion ? "" : reveal}`} style={{ transitionDelay: reducedMotion ? "0ms" : `${500 + index * 80}ms` }}>
              <div className={`min-h-[1em] ${displayFont} text-[clamp(22px,3vw,33px)] font-normal leading-[0.95] text-white max-[720px]:text-[clamp(20px,6vw,28px)] [@media(max-height:700px)]:text-[clamp(19px,2.5vw,26px)]`} aria-hidden="true">{stat.icon}</div>
              <div className="mt-[clamp(4px,0.7vh,8px)] text-[clamp(18px,2.2vw,26px)] font-medium tabular-nums leading-[1.1] tracking-[-0.025em] text-white max-[720px]:mt-0.5 [@media(max-height:700px)]:text-[clamp(17px,2vw,22px)]">{values[index]}</div>
              <div className="mt-[5px] whitespace-nowrap text-[clamp(11px,1.2vw,12.5px)] font-normal leading-[1.2] text-[#8e8e8e] max-[720px]:mt-[3px] [@media(max-height:700px)]:text-[clamp(10px,1vw,11.5px)]">{stat.label}</div>
            </div>
          ))}
        </footer>
      </div>

      {menuMounted && (
        <div id="mobile-menu" className={`fixed inset-0 z-20 transition-opacity duration-[280ms] ${menuVisible ? "opacity-100" : "opacity-0"}`}>
          <button type="button" aria-label="Close menu" onClick={() => closeMenu()} className="absolute inset-0 size-full cursor-default border-0 bg-black/60 p-0 backdrop-blur-[6px]" />
          <div role="dialog" aria-modal="true" aria-label="Navigation menu" className={`absolute left-1/2 top-[clamp(80px,12vh,104px)] z-[1] w-[min(calc(100%-28px),460px)] -translate-x-1/2 rounded-[28px] bg-white px-[18px] pb-5 pt-[22px] text-[#2e2e2e] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-[380ms] ${ease} ${menuVisible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-[14px] scale-[0.97] opacity-0"}`}>
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navItems.map((item, index) => (
                <Link ref={index === 0 ? firstMobileLinkRef : undefined} key={item.label} href={item.href} aria-current={index === 0 ? "page" : undefined} onClick={() => closeMenu(false)} className={`relative flex min-h-[50px] items-center justify-center rounded-2xl px-[14px] pb-2 text-[15px] font-medium text-[#2e2e2e] transition-[opacity,transform,background-color] duration-[420ms] ${ease} hover:bg-black/[0.045] ${menuVisible ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : `${80 + index * 55}ms` }}>
                  {item.label}{index === 0 && <ActiveDots mobile />}
                </Link>
              ))}
              <div className={`mt-2 flex min-h-[50px] items-center justify-center rounded-full bg-[#28282a] px-4 text-white transition-[opacity,transform] duration-[420ms] ${ease} ${menuVisible ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"}`} style={{ transitionDelay: reducedMotion ? "0ms" : `${80 + navItems.length * 55}ms` }}>
                <ThemeToggle variant="pill" />
              </div>
            </nav>
          </div>
        </div>
      )}
    </section>
  );
}
