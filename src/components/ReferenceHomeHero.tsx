"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type CountStat = {
  icon: string;
  target?: number;
  suffix?: string;
  decimals?: number;
  finalText?: string;
  label: string;
};

const stats: CountStat[] = [
  { icon: "+", target: 13, suffix: "+", decimals: 0, label: "Years Experience" },
  { icon: "#", target: 500, suffix: "+", decimals: 0, label: "Projects Delivered" },
  { icon: "*", target: 10, suffix: "+", decimals: 0, label: "Global Industries" },
  { icon: "<", finalText: "24–72h", label: "Average Turnaround" },
];

const referenceLogo = "data:image/webp;base64,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";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/pricing" },
];

function formatValue(value: number, decimals: number, suffix: string) {
  return `${Number(value).toFixed(decimals)}${suffix}`;
}

function MicrosoftGlyph() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <rect x="1" y="1" width="8" height="8" fill="currentColor" />
      <rect x="11" y="1" width="8" height="8" fill="currentColor" />
      <rect x="1" y="11" width="8" height="8" fill="currentColor" />
      <rect x="11" y="11" width="8" height="8" fill="currentColor" />
    </svg>
  );
}

function AmazonGlyph() {
  return <span className="ie-amazon-glyph" aria-hidden="true">a</span>;
}

function GoogleGlyph() {
  return <span className="ie-google-glyph" aria-hidden="true">G</span>;
}

export function ReferenceHomeHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [counted, setCounted] = useState(false);
  const [values, setValues] = useState<(string | null)[]>(() => stats.map((stat) => stat.finalText ?? null));

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const node = document.querySelector<HTMLElement>(".ie-stats");
    if (!node) return;

    const finishImmediately = () => {
      setValues(stats.map((stat) => stat.finalText ?? formatValue(stat.target ?? 0, stat.decimals ?? 0, stat.suffix ?? "")));
      setCounted(true);
    };

    if (reducedMotion || !("IntersectionObserver" in window)) {
      finishImmediately();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || counted) return;
        setCounted(true);

        stats.forEach((stat, index) => {
          if (stat.finalText || stat.target === undefined) return;
          const duration = 1500 + index * 80;
          const startOffset = 480 + index * 90;

          window.setTimeout(() => {
            const start = performance.now();
            const frame = (now: number) => {
              const raw = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - raw, 3);
              const value = stat.target! * eased;
              setValues((current) => {
                const next = [...current];
                next[index] = formatValue(value, stat.decimals ?? 0, stat.suffix ?? "");
                return next;
              });
              if (raw < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
          }, startOffset);
        });

        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [counted, reducedMotion]);

  useEffect(() => {
    document.body.classList.toggle("ie-menu-open", menuOpen);
    return () => document.body.classList.remove("ie-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 720) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="ie-hero-stage" aria-labelledby="ie-hero-title">
      <div className="ie-bg" aria-hidden="true">
        <video className="ie-bg-video" autoPlay muted loop playsInline preload="metadata" tabIndex={-1}>
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="ie-page">
        <header className="ie-site-header">
          <div className="ie-header-row">
            <Link className="ie-logo-button" href="/" aria-label="Specter Visual Lab home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={referenceLogo} alt="" width="52" height="52" />
            </Link>

            <nav className="ie-desktop-nav" aria-label="Primary navigation">
              {navItems.map((item, index) => (
                <Link key={item.label} className={`ie-nav-link ${index === 0 ? "active" : ""}`} href={item.href} aria-current={index === 0 ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle variant="pill" />

            <button
              className="ie-menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="ie-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <main className="ie-hero">
          <div className="ie-trust-row ie-anim" style={{ "--d": "0.05s" } as CSSProperties}>
            <div className="ie-trust-avatars" aria-hidden="true">
              <span className="ie-trust-avatar a1"><span className="ie-trust-avatar-inner"><MicrosoftGlyph /></span></span>
              <span className="ie-trust-avatar a2"><span className="ie-trust-avatar-inner"><AmazonGlyph /></span></span>
              <span className="ie-trust-avatar a3"><span className="ie-trust-avatar-inner"><GoogleGlyph /></span></span>
            </div>
            <div className="ie-trust-pill">13 disciplines. One integrated studio.</div>
          </div>

          <h1 id="ie-hero-title" className="ie-headline ie-anim">
            <span className="ie-headline-line line-1">Visual Intelligence</span>
            <span className="ie-headline-line line-2">Designed To Evolve</span>
          </h1>

          <p className="ie-subhead ie-anim" style={{ "--d": "0.28s" } as CSSProperties}>
            AI agents, product experiences and visual production connected in one modular<br className="ie-desktop-break" />
            creative system designed for modern brands.
          </p>

          <Link className="ie-cta ie-anim" style={{ "--d": "0.4s" } as CSSProperties} href="/start-a-project">
            Start a Project
          </Link>
        </main>

        <footer className="ie-stats" aria-label="Studio metrics">
          {stats.map((stat, index) => (
            <div className="ie-stat ie-anim" style={{ "--d": `${0.5 + index * 0.08}s` } as CSSProperties} key={stat.label}>
              <div className="ie-stat-icon" aria-hidden="true">{stat.icon}</div>
              <div className="ie-stat-value">{values[index] ?? formatValue(0, stat.decimals ?? 0, stat.suffix ?? "")}</div>
              <div className="ie-stat-label">{stat.label}</div>
            </div>
          ))}
        </footer>
      </div>

      {menuOpen && (
        <div className="ie-mobile-overlay" id="ie-mobile-menu">
          <button className="ie-overlay-hit-area" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div className="ie-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <nav className="ie-mobile-nav" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  className={`ie-mobile-link ${index === 0 ? "active" : ""}`}
                  style={{ "--i": index } as CSSProperties}
                  href={item.href}
                  aria-current={index === 0 ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="ie-mobile-theme" style={{ "--i": navItems.length } as CSSProperties}>
                <ThemeToggle variant="pill" />
              </div>
              <Link className="ie-mobile-sign-in" style={{ "--i": navItems.length + 1 } as CSSProperties} href="/start-a-project" onClick={() => setMenuOpen(false)}>
                Start a Project
              </Link>
            </nav>
          </div>
        </div>
      )}
    </section>
  );
}
