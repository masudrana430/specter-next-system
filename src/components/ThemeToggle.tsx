"use client";

import { flushSync } from "react-dom";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
type ThemeToggleProps = { variant?: "switch" | "pill" | "icon" };

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransition;
};

const STORAGE_KEY = "svl-theme";
const THEME_TRANSITION_DURATION = 650;
const THEME_TRANSITION_EASING = "ease-in-out";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(
    new CustomEvent("svl-theme-change", { detail: { theme } }),
  );
}

function getCircleClipPaths(
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  const maxRadius = Math.hypot(
    Math.max(x, viewportWidth - x),
    Math.max(y, viewportHeight - y),
  );

  const pointX = (x / viewportWidth) * 100;
  const pointY = (y / viewportHeight) * 100;
  const radiusReference =
    Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2;
  const radiusPercent = (maxRadius / radiusReference) * 100;

  return [
    `circle(0% at ${pointX}% ${pointY}%)`,
    `circle(${radiusPercent}% at ${pointX}% ${pointY}%)`,
  ];
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" />
    </svg>
  );
}

export function ThemeToggle({ variant = "switch" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);

    const onStorage = (event: StorageEvent) => {
      if (
        event.key !== STORAGE_KEY ||
        (event.newValue !== "dark" && event.newValue !== "light")
      )
        return;

      document.documentElement.dataset.theme = event.newValue;
      document.documentElement.style.colorScheme = event.newValue;
      setTheme(event.newValue);
    };

    const onThemeChange = (event: Event) => {
      const custom = event as CustomEvent<{ theme?: Theme }>;
      if (
        custom.detail?.theme === "dark" ||
        custom.detail?.theme === "light"
      ) {
        setTheme(custom.detail.theme);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("svl-theme-change", onThemeChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("svl-theme-change", onThemeChange);
    };
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  const changeTheme = () => {
    const button = buttonRef.current;
    const root = document.documentElement;

    if (
      !button ||
      isTransitioningRef.current ||
      root.dataset.svlThemeVt === "active"
    ) {
      return;
    }

    const viewTransitionDocument = document as ViewTransitionDocument;

    const commitTheme = () => {
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    if (typeof viewTransitionDocument.startViewTransition !== "function") {
      commitTheme();
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const clipPath = getCircleClipPaths(
      x,
      y,
      viewportWidth,
      viewportHeight,
    );

    root.dataset.svlThemeVt = "active";
    root.style.setProperty(
      "--svl-theme-toggle-vt-duration",
      `${THEME_TRANSITION_DURATION}ms`,
    );
    root.style.setProperty("--svl-theme-vt-clip-from", clipPath[0]);

    const cleanup = () => {
      isTransitioningRef.current = false;
      delete root.dataset.svlThemeVt;
      root.style.removeProperty("--svl-theme-toggle-vt-duration");
      root.style.removeProperty("--svl-theme-vt-clip-from");
    };

    isTransitioningRef.current = true;

    const transition = viewTransitionDocument.startViewTransition(() => {
      flushSync(commitTheme);
    });

    transition.finished.finally(cleanup).catch(() => {});

    transition.ready
      .then(() => {
        root.animate(
          { clipPath },
          {
            duration: THEME_TRANSITION_DURATION,
            easing: THEME_TRANSITION_EASING,
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  };

  const commonProps = {
    ref: buttonRef,
    type: "button" as const,
    onClick: changeTheme,
    "aria-label": `Switch to ${nextTheme} mode`,
    title: `Switch to ${nextTheme} mode`,
  };

  if (variant === "icon") {
    return (
      <button
        {...commonProps}
        className="grid size-10 shrink-0 place-items-center rounded-[6px] border border-white/20 bg-black/45 text-white backdrop-blur-xl transition-[border-color,background,box-shadow,transform] duration-300 hover:-translate-y-px hover:border-white/45 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(200,210,230,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        {...commonProps}
        className="inline-flex h-[clamp(44px,5.2vw,48px)] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#28282a] px-[clamp(18px,2vw,24px)] text-[clamp(13px,1.4vw,15px)] font-medium text-[#c8c8c8] shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-[transform,background-color,color] duration-200 hover:-translate-y-px hover:bg-[#323234] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span className="grid place-items-center">
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </span>
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    );
  }

  return (
    <button
      {...commonProps}
      className="theme-toggle"
      aria-pressed={theme === "dark"}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-icon theme-icon-sun">
          <SunIcon />
        </span>
        <span className="theme-icon theme-icon-moon">
          <MoonIcon />
        </span>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
