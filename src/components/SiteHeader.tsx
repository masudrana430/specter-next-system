"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNav } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${isHome ? "home-site-header" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="shell nav-row">
        <Link href="/" className="brand" aria-label="Specter Visual Lab home">
          <span className="brand-mark">SVL</span>
          <span className="brand-wordmark">SPECTER VISUAL LAB</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
          {headerNav.map((item) => {
            const active = item.href.startsWith("/#") ? false : pathname === item.href;
            return (
              <Link key={item.label} href={item.href} className={active ? "active" : ""}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/start-a-project" className="button button-primary desktop-cta">Start a Project</Link>
          <button
            type="button"
            className="menu-button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-button-bars" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="shell" aria-label="Mobile navigation">
            <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
            {headerNav.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
            <Link href="/start-a-project" className="button button-primary">Start a Project</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
