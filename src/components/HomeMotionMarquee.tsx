"use client";

import { useEffect, useRef } from "react";

const motionPreviews = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ROW_ONE = motionPreviews.slice(0, 11);
const ROW_TWO = motionPreviews.slice(11);

const IDLE_SPEED = 14;
const MIN_BOOST = 420;
const MAX_BOOST = 1900;
const SCROLL_GAIN = 18;
const WHEEL_GAIN = 8;
const DECAY = 3.8;

type MotionGroupProps = {
  images: string[];
  firstGroupRef?: React.RefObject<HTMLDivElement | null>;
};

function MotionGroup({ images, firstGroupRef }: MotionGroupProps) {
  return (
    <div ref={firstGroupRef} className="flex shrink-0 gap-3 pr-3">
      {images.map((src, index) => (
        <article
          key={`${src}-${index}`}
          className="svl-motion-card h-[190px] w-[300px] shrink-0 overflow-hidden rounded-[22px] p-1.5 md:h-[270px] md:w-[420px] md:rounded-[28px] md:p-2"
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block size-full rounded-[17px] object-cover md:rounded-[20px]"
          />
        </article>
      ))}
    </div>
  );
}

export function HomeMotionMarquee() {
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

    const preloaded = motionPreviews.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

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
      rowOnePosition = rowOneWidth ? (rowOnePosition / rowOneWidth) * nextWidth : -nextWidth * 0.5;
      rowOneWidth = nextWidth;
    };

    const measureRowTwo = () => {
      const nextWidth = rowTwoGroup.getBoundingClientRect().width;
      if (!nextWidth) return;
      rowTwoPosition = rowTwoWidth ? (rowTwoPosition / rowTwoWidth) * nextWidth : -nextWidth * 0.5;
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
        rowOneTrack.style.transform = `translate3d(${rowOnePosition.toFixed(2)}px,0,0)`;
      }

      if (rowTwoWidth) {
        rowTwoPosition -= (IDLE_SPEED + rowTwoBoost) * dt;
        while (rowTwoPosition >= 0) rowTwoPosition -= rowTwoWidth;
        while (rowTwoPosition < -rowTwoWidth) rowTwoPosition += rowTwoWidth;
        rowTwoTrack.style.transform = `translate3d(${rowTwoPosition.toFixed(2)}px,0,0)`;
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
      preloaded.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  return (
    <section className="svl-motion-marquee overflow-hidden py-20 md:py-28" aria-labelledby="svl-motion-title">
      <style>{`
        .svl-motion-marquee {
          background: #ffffff;
          color: #161616;
        }
        .svl-motion-card {
          background: rgba(255,255,255,.96);
          border: 1px solid rgba(0,0,0,.10);
          box-shadow: 0 18px 50px rgba(30,25,18,.08);
        }
        [data-theme="dark"] .svl-motion-marquee {
          background: #0b0b0b;
          color: #f5f5f2;
        }
        [data-theme="dark"] .svl-motion-card {
          background: rgba(22,22,22,.94);
          border-color: rgba(255,255,255,.11);
          box-shadow: 0 20px 52px rgba(0,0,0,.32);
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1280px] overflow-hidden">
        <div className="px-3 pb-11 md:px-6 md:pb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50 dark:text-white/45 md:text-xs">
            Specter Visual Lab · Motion, product & campaign systems
          </p>
          <h2
            id="svl-motion-title"
            className="mt-3 max-w-[1180px] text-[clamp(3.4rem,9.5vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]"
          >
            Ideas in motion
          </h2>
          <p className="mt-6 max-w-[640px] text-sm leading-6 text-black/58 dark:text-white/55 md:text-base md:leading-7">
            A moving reel of the visual language Specter builds across digital products, campaigns, brand systems, and launch-ready creative. Scroll to accelerate the work.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="overflow-hidden py-1.5">
            <div ref={rowOneTrackRef} className="flex w-max will-change-transform">
              <MotionGroup images={ROW_ONE} firstGroupRef={rowOneGroupRef} />
              <MotionGroup images={ROW_ONE} />
              <MotionGroup images={ROW_ONE} />
            </div>
          </div>

          <div className="overflow-hidden py-1.5">
            <div ref={rowTwoTrackRef} className="flex w-max will-change-transform">
              <MotionGroup images={ROW_TWO} firstGroupRef={rowTwoGroupRef} />
              <MotionGroup images={ROW_TWO} />
              <MotionGroup images={ROW_TWO} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
