"use client";

import Link from "next/link";
import { type CSSProperties, type MutableRefObject, type RefObject, useEffect, useRef, useState } from "react";

const SHOWCASE_IMAGE = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85";

const capabilityCards = [
  { title: "AI & Automation", number: "01" },
  { title: "Brand & Product", number: "02" },
  { title: "Web & App", number: "03" },
  { title: "Visual & Growth", number: "04" },
];

type MaskPosition = { x: number; y: number; sw: number; sh: number };

type MaskedPanelProps = {
  sectionImage: string;
  position: MaskPosition;
  imageWidth: number;
  focalX: number;
  className: string;
  cardRef: (node: HTMLDivElement | null) => void;
  children: React.ReactNode;
  style?: CSSProperties;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return isMobile;
}

function useMaskPositions(
  sectionRef: RefObject<HTMLElement | null>,
  cardRefs: MutableRefObject<(HTMLDivElement | null)[]>,
  count: number,
) {
  const [positions, setPositions] = useState<MaskPosition[]>(
    () => Array.from({ length: count }, () => ({ x: 0, y: 0, sw: 0, sh: 0 })),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      setPositions(
        Array.from({ length: count }, (_, index) => {
          const card = cardRefs.current[index];
          if (!card) return { x: 0, y: 0, sw: sectionRect.width, sh: sectionRect.height };
          const rect = card.getBoundingClientRect();
          return {
            x: rect.left - sectionRect.left,
            y: rect.top - sectionRect.top,
            sw: sectionRect.width,
            sh: sectionRect.height,
          };
        }),
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(section);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    measure();
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cardRefs, count, sectionRef]);

  return positions;
}

function useImageWidth(src: string, sectionRef: RefObject<HTMLElement | null>) {
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let naturalWidth = 0;
    let naturalHeight = 0;
    const image = new window.Image();

    const calculate = () => {
      if (!naturalWidth || !naturalHeight || !sectionRef.current) return;
      setImageWidth(naturalWidth * (sectionRef.current.clientHeight / naturalHeight));
    };

    image.onload = () => {
      naturalWidth = image.naturalWidth;
      naturalHeight = image.naturalHeight;
      calculate();
    };
    image.src = src;

    const observer = new ResizeObserver(calculate);
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef, src]);

  return imageWidth;
}

function MaskedPanel({
  sectionImage,
  position,
  imageWidth,
  focalX,
  className,
  cardRef,
  children,
  style,
}: MaskedPanelProps) {
  const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;

  const backgroundStyle: CSSProperties = position.sh > 0
    ? {
        backgroundImage: `url(${sectionImage})`,
        backgroundSize: `auto ${position.sh}px`,
        backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundImage: `url(${sectionImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  return (
    <div ref={cardRef} className={className} style={{ ...backgroundStyle, ...style }}>
      {children}
    </div>
  );
}

export function HomeImageShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  const positions = useMaskPositions(sectionRef, cardRefs, 4);
  const imageWidth = useImageWidth(SHOWCASE_IMAGE, sectionRef);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const revealStyle = (index: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  const focalX = isMobile ? 0.65 : 0.8;

  return (
    <section
      ref={sectionRef}
      aria-label="Specter Visual Lab capabilities showcase"
      className="min-h-screen w-full overflow-hidden bg-white px-3 pb-2 pt-2 dark:bg-[#0b0b0b] md:h-screen md:px-5"
    >
      <div className="grid min-h-[920px] grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-2 md:h-full md:min-h-0 md:grid-cols-2 md:grid-rows-[1fr_1fr_.8fr]">
        <MaskedPanel
          sectionImage={SHOWCASE_IMAGE}
          position={positions[0]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cardRefs.current[0] = node; }}
          className="relative min-h-[170px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={revealStyle(0)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/15" />
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 md:p-7">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/55">Selected work</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-black md:text-3xl">Ideas shaped into systems.</h2>
            </div>
          </div>
          <p className="absolute bottom-5 left-5 z-10 max-w-[300px] text-xs font-semibold leading-5 text-black/75 md:bottom-7 md:left-7 md:text-sm">
            Strategy, design, AI, and production working as one connected creative pipeline.
          </p>
        </MaskedPanel>

        <MaskedPanel
          sectionImage={SHOWCASE_IMAGE}
          position={positions[1]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cardRefs.current[1] = node; }}
          className="relative min-h-[240px] overflow-hidden rounded-xl md:row-span-2 md:min-h-0 md:rounded-2xl"
          style={revealStyle(1)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
            <p className="max-w-[520px] text-sm font-medium leading-6 text-white/90 md:text-base">
              From AI agents and digital products to high-end visual production, Specter Visual Lab brings concept, craft, engineering, and launch execution under one studio.
            </p>
            <Link
              href="/#portfolio"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-white/90"
            >
              Explore our work
            </Link>
          </div>
        </MaskedPanel>

        <MaskedPanel
          sectionImage={SHOWCASE_IMAGE}
          position={positions[2]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cardRefs.current[2] = node; }}
          className="relative min-h-[170px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={revealStyle(2)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/25" />
          <h2 className="absolute left-5 top-5 z-10 text-[clamp(3rem,7vw,6.3rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white md:left-7 md:top-7">
            Build<br />what matters.
          </h2>
        </MaskedPanel>

        <MaskedPanel
          sectionImage={SHOWCASE_IMAGE}
          position={positions[3]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cardRefs.current[3] = node; }}
          className="relative col-span-1 min-h-[280px] overflow-hidden rounded-xl md:col-span-2 md:min-h-0 md:rounded-2xl"
          style={revealStyle(3)}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 z-10 grid grid-cols-2 gap-2 p-2 md:grid-cols-4 md:p-3">
            {capabilityCards.map((item, index) => (
              <div
                key={item.title}
                className={`flex min-h-0 flex-col justify-between rounded-xl p-4 backdrop-blur-md md:rounded-2xl md:p-5 ${index === 0 ? "bg-white/90 text-black" : "bg-black/25 text-white"}`}
              >
                <h3 className="max-w-[180px] text-xl font-semibold leading-[1.05] tracking-[-0.035em] md:text-[clamp(1.4rem,2.3vw,2.2rem)]">
                  {item.title}
                </h3>
                <span className={`self-end grid size-9 place-items-center rounded-full border text-xs font-semibold md:size-11 ${index === 0 ? "border-black/35" : "border-white/55"}`}>
                  {item.number}
                </span>
              </div>
            ))}
          </div>
        </MaskedPanel>
      </div>
    </section>
  );
}
