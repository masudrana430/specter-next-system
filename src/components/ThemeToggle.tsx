"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeToggleProps = { variant?: "switch" | "pill" };

const STORAGE_KEY = "svl-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" />
    </svg>
  );
}

export function ThemeToggle({ variant = "switch" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || (event.newValue !== "dark" && event.newValue !== "light")) return;
      document.documentElement.dataset.theme = event.newValue;
      document.documentElement.style.colorScheme = event.newValue;
      setTheme(event.newValue);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";
  const changeTheme = () => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={changeTheme}
        aria-label={`Switch to ${nextTheme} mode`}
        title={`Switch to ${nextTheme} mode`}
        className="inline-flex h-[clamp(44px,5.2vw,48px)] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#28282a] px-[clamp(18px,2vw,24px)] text-[clamp(13px,1.4vw,15px)] font-medium text-[#c8c8c8] shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-200 hover:-translate-y-px hover:bg-[#323234] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span className="grid place-items-center">{theme === "dark" ? <SunIcon /> : <MoonIcon />}</span>
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    );
  }

  return (
    <button type="button" className="theme-toggle" aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`} onClick={changeTheme}>
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-icon theme-icon-sun"><SunIcon /></span>
        <span className="theme-icon theme-icon-moon"><MoonIcon /></span>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
