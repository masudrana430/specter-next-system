"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Keep the lightweight animated preview media from the supplied reference.
// They load quickly enough for a one-second cursor trail and preserve the
// reference section's most important visual behavior.
const trailImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
];

type TrailItem = {
  el: HTMLImageElement;
  born: number;
};

export function HomePartnerSection() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lastSpawnRef = useRef(0);
  const imageIndexRef = useRef(0);
  const trailRef = useRef<TrailItem[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Preload the complete trail set so newly spawned previews are visible
    // immediately instead of spending most of their one-second lifetime loading.
    const preloaded = trailImages.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    const loop = (now: number) => {
      trailRef.current = trailRef.current.filter((item) => {
        const age = now - item.born;

        if (age >= 1000) {
          item.el.remove();
          return false;
        }

        const progress = age / 1000;
        const scale = 1 - progress * 0.25;

        item.el.style.opacity = String(1 - progress);
        item.el.style.transform = `${item.el.dataset.baseTransform ?? ""} scale(${scale})`;
        return true;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      trailRef.current.forEach(({ el }) => el.remove());
      trailRef.current = [];
      preloaded.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  const moveCursor = (x: number, y: number) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.opacity = "1";
  };

  const spawnTrailImage = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || event.pointerType === "touch") return;

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Custom cursor should track every pointer frame, not the throttled image cadence.
    moveCursor(x, y);

    const now = performance.now();
    if (now - lastSpawnRef.current < 80) return;
    lastSpawnRef.current = now;

    const image = document.createElement("img");
    const rotation = Math.random() * 20 - 10;
    const width = window.innerWidth < 768 ? 105 : 150;
    const baseTransform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    const isDark = document.documentElement.dataset.theme === "dark";

    image.src = trailImages[imageIndexRef.current % trailImages.length];
    imageIndexRef.current += 1;
    image.alt = "";
    image.draggable = false;
    image.dataset.baseTransform = baseTransform;
    image.style.position = "absolute";
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.width = `${width}px`;
    image.style.aspectRatio = "4 / 3";
    image.style.objectFit = "cover";
    image.style.borderRadius = "18px";
    image.style.pointerEvents = "none";
    image.style.userSelect = "none";
    image.style.zIndex = "4";
    image.style.opacity = "1";
    image.style.transform = `${baseTransform} scale(1)`;
    image.style.boxShadow = isDark
      ? "0 16px 38px rgba(0,0,0,0.44)"
      : "0 12px 30px rgba(5,26,36,0.16)";
    image.style.border = isDark
      ? "1px solid rgba(255,255,255,0.14)"
      : "1px solid rgba(5,26,36,0.08)";
    image.style.willChange = "transform, opacity";

    stage.appendChild(image);
    trailRef.current.push({ el: image, born: now });
  };

  const clearTrail = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
    trailRef.current.forEach(({ el }) => {
      el.style.opacity = "0";
    });
  };

  return (
    <section className="w-full bg-white px-3 py-8 dark:bg-[#0b0b0b] md:px-5 md:py-12">
      <style>{`
        .svl-partner-stage {
          isolation: isolate;
          cursor: auto;
        }
        .svl-partner-cursor {
          display: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .svl-partner-stage {
            cursor: none;
          }
          .svl-partner-cursor {
            display: block;
          }
        }
      `}</style>

      <div
        ref={stageRef}
        onPointerMove={spawnTrailImage}
        onPointerEnter={spawnTrailImage}
        onPointerLeave={clearTrail}
        className="svl-partner-stage relative mx-auto flex min-h-[520px] max-w-[1480px] select-none items-center justify-center overflow-hidden rounded-[28px] border border-black/[0.06] bg-[#f6f6f2] px-6 py-28 shadow-[0_6px_34px_rgba(5,26,36,0.07)] dark:border-white/10 dark:bg-[#111315] dark:shadow-[0_12px_45px_rgba(0,0,0,0.32)] md:min-h-[680px] md:rounded-[40px] md:py-44"
      >
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(255,255,255,0.76)_72%)] dark:hidden" />
        <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),rgba(0,0,0,0.4)_74%)] dark:block" />

        <div className="pointer-events-none relative z-10 flex max-w-[980px] flex-col items-center text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#051A24]/55 dark:text-white/45 md:text-xs">
            Specter Visual Lab · One studio, thirteen disciplines
          </p>

          <h2 className="font-['Instrument_Serif','Times_New_Roman',serif] text-[clamp(4rem,8vw,8.6rem)] font-normal italic leading-[0.82] tracking-[-0.045em] text-[#0D212C] dark:text-white">
            Build the next thing with us.
          </h2>

          <p className="mt-7 max-w-[640px] text-[14px] leading-6 text-[#051A24]/62 dark:text-white/58 md:mt-9 md:text-[16px] md:leading-7">
            From first concept to final launch, Specter brings AI, design, engineering, visual production, and growth into one focused creative partnership.
          </p>

          <Link
            href="/start-a-project"
            className="pointer-events-auto mt-8 inline-flex min-h-14 items-center gap-3 rounded-full border border-[#051A24]/10 bg-white py-2 pl-2 pr-3 text-sm font-semibold text-[#051A24] shadow-[0_12px_30px_rgba(5,26,36,0.10)] hover:bg-[#fbfbf8] dark:border-white/[0.14] dark:bg-[#181b1e] dark:text-white dark:shadow-[0_14px_34px_rgba(0,0,0,0.38)] dark:hover:bg-[#1d2024] md:mt-10 md:min-h-16 md:gap-4 md:pr-4 md:text-base"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#051A24] text-[10px] font-bold tracking-[0.04em] text-white shadow-sm dark:bg-white dark:text-black md:size-12 md:text-[11px]">
              SVL
            </span>
            <span className="whitespace-nowrap px-1">Start a project with Specter</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#051A24]/10 bg-[#051A24]/[0.05] text-[#051A24] dark:border-white/10 dark:bg-white/[0.07] dark:text-white md:size-10" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h8.5M8 4l3.5 3.5L8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        <div
          ref={cursorRef}
          aria-hidden="true"
          className="svl-partner-cursor pointer-events-none absolute z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#051A24] opacity-0 dark:bg-white"
        />
      </div>
    </section>
  );
}
