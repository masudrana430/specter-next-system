"use client";

import { useEffect, useRef, type RefObject } from "react";
import { industries } from "@/data/site";

const ROW_ONE = industries.slice(0, 5);
const ROW_TWO = industries.slice(5);

const IDLE_SPEED = 14;
const MIN_BOOST = 420;
const MAX_BOOST = 1900;
const SCROLL_GAIN = 18;
const WHEEL_GAIN = 8;
const DECAY = 3.8;

type IndustryGroupProps = {
  items: string[];
  firstGroupRef?: RefObject<HTMLDivElement | null>;
};

function IndustryGroup({ items, firstGroupRef }: IndustryGroupProps) {
  return (
    <div
      ref={firstGroupRef}
      className="flex shrink-0 items-center gap-7 pr-7 md:gap-12 md:pr-12"
    >
      {items.map((item) => (
        <div key={item} className="flex shrink-0 items-center gap-7 md:gap-12">
          <span className="whitespace-nowrap text-[clamp(2.8rem,6.8vw,6.8rem)] font-semibold uppercase leading-[0.86] tracking-[-0.06em] text-[#151515] dark:text-[#f3f3f0]">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="size-3 shrink-0 rounded-full bg-black/18 dark:bg-white/22 md:size-4"
          />
        </div>
      ))}
    </div>
  );
}

export function HomeIndustriesMarquee() {
  const rowOneTrackRef = useRef<HTMLDivElement | null>(null);
  const rowTwoTrackRef = useRef<HTMLDivElement | null>(null);
  const rowOneGroupRef = useRef<HTMLDivElement | null>(null);
  const rowTwoGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rowOneTrack = rowOneTrackRef.current;
    const rowTwoTrack = rowTwoTrackRef.current;
    const rowOneGroup = rowOneGroupRef.current;
    const rowTwoGroup = rowTwoGroupRef.current;

    if (!rowOneTrack || !rowTwoTrack || !rowOneGroup || !rowTwoGroup) return;

    let rowOneWidth = 0;
    let rowTwoWidth = 0;
    let rowOnePosition = 0;
    let rowTwoPosition = 0;
    let rowOneBoost = 0;
    let rowTwoBoost = 0;
    let lastScrollY = window.scrollY;
    let lastFrame = performance.now();
    let raf = 0;

    const measureRowOne = () => {
      const nextWidth = rowOneGroup.getBoundingClientRect().width;
      if (!nextWidth) return;
      rowOnePosition = rowOneWidth
        ? (rowOnePosition / rowOneWidth) * nextWidth
        : -nextWidth * 0.5;
      rowOneWidth = nextWidth;
    };

    const measureRowTwo = () => {
      const nextWidth = rowTwoGroup.getBoundingClientRect().width;
      if (!nextWidth) return;
      rowTwoPosition = rowTwoWidth
        ? (rowTwoPosition / rowTwoWidth) * nextWidth
        : -nextWidth * 0.5;
      rowTwoWidth = nextWidth;
    };

    const observer = new ResizeObserver(() => {
      measureRowOne();
      measureRowTwo();
    });

    observer.observe(rowOneGroup);
    observer.observe(rowTwoGroup);
    measureRowOne();
    measureRowTwo();

    const inject = (strength: number) => {
      const amount = Math.max(MIN_BOOST, strength) * 0.42;
      rowOneBoost = Math.min(MAX_BOOST, rowOneBoost + amount);
      rowTwoBoost = Math.min(MAX_BOOST, rowTwoBoost + amount);
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;
      if (delta) inject(delta * SCROLL_GAIN);
    };

    const onWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaY);
      if (delta) inject(delta * WHEEL_GAIN);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (rowOneWidth) {
        rowOnePosition += (IDLE_SPEED + rowOneBoost) * dt;
        while (rowOnePosition >= 0) rowOnePosition -= rowOneWidth;
        while (rowOnePosition < -rowOneWidth) rowOnePosition += rowOneWidth;
        rowOneTrack.style.transform =
          `translate3d(${rowOnePosition.toFixed(2)}px,0,0)`;
      }

      if (rowTwoWidth) {
        rowTwoPosition -= (IDLE_SPEED + rowTwoBoost) * dt;
        while (rowTwoPosition >= 0) rowTwoPosition -= rowTwoWidth;
        while (rowTwoPosition < -rowTwoWidth) rowTwoPosition += rowTwoWidth;
        rowTwoTrack.style.transform =
          `translate3d(${rowTwoPosition.toFixed(2)}px,0,0)`;
      }

      rowOneBoost *= Math.exp(-DECAY * dt);
      rowTwoBoost *= Math.exp(-DECAY * dt);

      if (rowOneBoost < 0.5) rowOneBoost = 0;
      if (rowTwoBoost < 0.5) rowTwoBoost = 0;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section
      aria-labelledby="svl-industries-title"
      className="overflow-hidden bg-white py-16 text-[#161616] dark:bg-[#0b0b0b] dark:text-[#f5f5f2] md:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] overflow-hidden">
        <div className="px-3 pb-9 md:px-6 md:pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50 dark:text-white/45 md:text-xs">
            Specter Visual Lab · Cross-industry creative systems
          </p>
          <h2
            id="svl-industries-title"
            className="mt-3 text-[clamp(3.2rem,8.8vw,8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]"
          >
            Industries served
          </h2>
          <p className="mt-5 max-w-[650px] text-sm leading-6 text-black/58 dark:text-white/55 md:text-base md:leading-7">
            From commerce and luxury to healthcare, travel, education, and technology—Specter builds visual and digital systems across sectors.
          </p>
        </div>

        <div className="grid gap-4 border-y border-black/[0.07] py-7 dark:border-white/[0.09] md:gap-6 md:py-10">
          <div className="overflow-hidden py-1">
            <div
              ref={rowOneTrackRef}
              className="flex w-max items-center will-change-transform"
            >
              <IndustryGroup items={ROW_ONE} firstGroupRef={rowOneGroupRef} />
              <IndustryGroup items={ROW_ONE} />
              <IndustryGroup items={ROW_ONE} />
            </div>
          </div>

          <div className="overflow-hidden py-1">
            <div
              ref={rowTwoTrackRef}
              className="flex w-max items-center will-change-transform"
            >
              <IndustryGroup items={ROW_TWO} firstGroupRef={rowTwoGroupRef} />
              <IndustryGroup items={ROW_TWO} />
              <IndustryGroup items={ROW_TWO} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
