"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const trailImages = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85",
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
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      reduceMotionRef.current = reducedMotion.matches;
    };

    syncMotionPreference();
    reducedMotion.addEventListener?.("change", syncMotionPreference);

    const loop = (now: number) => {
      trailRef.current = trailRef.current.filter((item) => {
        const age = now - item.born;
        if (age >= 1000) {
          item.el.remove();
          return false;
        }

        const progress = age / 1000;
        const scale = 1 - progress * 0.24;
        item.el.style.opacity = String(1 - progress);
        item.el.style.transform = `${item.el.dataset.baseTransform ?? ""} scale(${scale})`;
        return true;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      reducedMotion.removeEventListener?.("change", syncMotionPreference);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      trailRef.current.forEach(({ el }) => el.remove());
      trailRef.current = [];
    };
  }, []);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.opacity = "1";
    }

    if (reduceMotionRef.current) return;

    const now = performance.now();
    if (now - lastSpawnRef.current < 80) return;
    lastSpawnRef.current = now;

    const image = document.createElement("img");
    const rotation = Math.random() * 18 - 9;
    const width = window.innerWidth < 768 ? 110 : 150;
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
    image.style.border = isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(5,26,36,0.08)";
    image.style.boxShadow = isDark
      ? "0 16px 36px rgba(0,0,0,0.42)"
      : "0 12px 30px rgba(5,26,36,0.16)";
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
        .svl-partner-stage { cursor: auto; }
        @media (hover: hover) and (pointer: fine) {
          .svl-partner-stage { cursor: none; }
        }
      `}</style>

      <div
        ref={stageRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={clearTrail}
        className="svl-partner-stage relative mx-auto flex min-h-[520px] max-w-[1480px] select-none items-center justify-center overflow-hidden rounded-[28px] border border-black/[0.06] bg-[#f6f6f2] px-6 py-28 shadow-[0_6px_34px_rgba(5,26,36,0.07)] dark:border-white/10 dark:bg-[#111315] dark:shadow-[0_12px_45px_rgba(0,0,0,0.32)] md:min-h-[680px] md:rounded-[40px] md:py-44"
      >
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.82)_73%)] dark:hidden" />
        <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),rgba(0,0,0,0.42)_76%)] dark:block" />

        <div className="relative z-10 flex max-w-[980px] flex-col items-center text-center">
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
            className="pointer-events-auto mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#051A24] py-2 pl-2 pr-7 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(5,26,36,0.16),inset_0_1px_7px_rgba(255,255,255,0.32)] dark:bg-white dark:text-black dark:shadow-[0_14px_30px_rgba(0,0,0,0.34),inset_0_1px_5px_rgba(255,255,255,0.6)] md:mt-10 md:text-base"
          >
            <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/12 text-[11px] font-bold tracking-[-0.02em] dark:border-black/10 dark:bg-black/[0.06]">
              SVL
            </span>
            <span>Start a project with Specter</span>
          </Link>
        </div>

        <div
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#051A24] opacity-0 dark:bg-white md:block"
        />
      </div>
    </section>
  );
}
