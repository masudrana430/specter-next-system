"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const SECTION1_IMAGE = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85";
const SECTION2_IMAGE = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85";
const SECTION3_IMG1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85";
const SECTION3_IMG2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85";
const SECTION3_BG = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85";

const sectionOneBars = [
  "AI-Powered Production",
  "Design + Development",
  "Campaign-Ready Delivery",
];

const capabilityCards = [
  { title: "AI & Automation", number: "01", active: true },
  { title: "Brand & Product", number: "02", active: false },
  { title: "Web & App", number: "03", active: false },
  { title: "Visual & Growth", number: "04", active: false },
];

type MaskPosition = { x: number; y: number; sw: number; sh: number };

type MaskedPanelProps = {
  sectionImage: string;
  position: MaskPosition;
  imageWidth: number;
  focalX: number;
  className: string;
  cardRef: (node: HTMLDivElement | null) => void;
  children?: ReactNode;
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

function useStaggeredReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const getStyle = (index: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  return { containerRef, getStyle };
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

function ArrowIcon({ white = false }: { white?: boolean }) {
  return (
    <span className={`grid size-9 place-items-center rounded-full border md:size-12 ${white ? "border-white text-white" : "border-black text-black"}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="-rotate-45" aria-hidden="true">
        <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function SectionOne({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useMaskPositions(sectionRef, cards, 4);
  const imageWidth = useImageWidth(SECTION1_IMAGE, sectionRef);
  const reveal = useStaggeredReveal();
  const focalX = isMobile ? 0.7 : 0.8;

  const setSection = (node: HTMLElement | null) => {
    sectionRef.current = node;
    reveal.containerRef.current = node;
  };

  return (
    <section
      ref={setSection}
      aria-label="Specter integrated studio system"
      className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-2 overflow-hidden bg-white px-3 pb-2 pt-2 dark:bg-[#0b0b0b] md:h-screen md:px-6"
    >
      {sectionOneBars.map((feature, index) => (
        <MaskedPanel
          key={feature}
          sectionImage={SECTION1_IMAGE}
          position={positions[index]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cards.current[index] = node; }}
          className="relative h-14 w-full shrink-0 overflow-hidden rounded-xl md:h-20 md:rounded-2xl"
          style={reveal.getStyle(index)}
        >
          <div className="absolute inset-0 bg-white/15 dark:bg-black/10" />
          <span className="relative z-10 flex h-full items-center justify-center text-center text-lg font-semibold tracking-[-0.025em] text-black md:text-3xl dark:text-white">
            {feature}
          </span>
        </MaskedPanel>
      ))}

      <MaskedPanel
        sectionImage={SECTION1_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        cardRef={(node) => { cards.current[3] = node; }}
        className="relative min-h-[460px] w-full flex-1 overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
        style={reveal.getStyle(3)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
        <p className="absolute left-4 top-4 z-10 max-w-[230px] text-xs font-semibold leading-5 text-black md:left-7 md:top-7 md:max-w-[330px] md:text-sm dark:text-white">
          One multidisciplinary studio connecting strategy, AI, design, engineering, visual production, and growth.
        </p>
        <div className="absolute bottom-5 left-3 z-10 md:bottom-8 md:left-4">
          <span className="mb-2 block text-xs font-semibold text-black md:text-sm dark:text-white">Built for ambitious brands</span>
          <h2 className="text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.79] tracking-[-0.06em] text-black dark:text-white">
            Visual<br />Systems
          </h2>
        </div>
        <Link href="/start-a-project" className="absolute bottom-6 right-4 z-10 text-xs font-semibold text-white underline-offset-4 hover:underline md:bottom-10 md:right-8 md:text-sm">
          Start a Project
        </Link>
      </MaskedPanel>
    </section>
  );
}

function SectionTwo({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useMaskPositions(sectionRef, cards, 4);
  const imageWidth = useImageWidth(SECTION2_IMAGE, sectionRef);
  const reveal = useStaggeredReveal();
  const focalX = isMobile ? 0.65 : 0.8;

  const setSection = (node: HTMLElement | null) => {
    sectionRef.current = node;
    reveal.containerRef.current = node;
  };

  return (
    <section
      ref={setSection}
      aria-label="Specter capabilities gallery"
      className="mx-auto min-h-screen w-full max-w-[1280px] overflow-hidden bg-white px-3 pb-2 pt-2 dark:bg-[#0b0b0b] md:h-screen md:px-6"
    >
      <div className="grid min-h-[920px] grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-2 md:h-full md:min-h-0 md:grid-cols-2 md:grid-rows-[1fr_1fr_.8fr]">
        <MaskedPanel
          sectionImage={SECTION2_IMAGE}
          position={positions[0]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cards.current[0] = node; }}
          className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={reveal.getStyle(0)}
        >
          <h2 className="absolute left-5 top-4 z-10 text-2xl font-semibold tracking-[-0.035em] text-white md:left-7 md:top-6 md:text-3xl md:text-black">Selected Work</h2>
          <p className="absolute bottom-4 left-5 z-10 text-xs font-semibold text-white md:bottom-6 md:left-7 md:text-sm md:text-black">Creative systems built to perform.</p>
        </MaskedPanel>

        <MaskedPanel
          sectionImage={SECTION2_IMAGE}
          position={positions[1]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cards.current[1] = node; }}
          className="relative min-h-[220px] overflow-hidden rounded-xl md:row-span-2 md:min-h-0 md:rounded-2xl"
          style={reveal.getStyle(1)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <p className="absolute bottom-16 left-5 z-10 max-w-[370px] text-xs font-semibold leading-5 text-white md:bottom-20 md:left-7 md:text-sm">
            From AI agents and digital products to image, video, and launch campaigns—one team carries the work from concept to release.
          </p>
          <Link href="/#portfolio" className="absolute bottom-4 right-4 z-10 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black md:bottom-6 md:right-6 md:px-8 md:py-5 md:text-lg">
            View Work
          </Link>
        </MaskedPanel>

        <MaskedPanel
          sectionImage={SECTION2_IMAGE}
          position={positions[2]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cards.current[2] = node; }}
          className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={reveal.getStyle(2)}
        >
          <h2 className="absolute left-5 top-4 z-10 text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white md:left-7 md:top-6 md:text-black">
            Make<br />it matter
          </h2>
        </MaskedPanel>

        <MaskedPanel
          sectionImage={SECTION2_IMAGE}
          position={positions[3]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(node) => { cards.current[3] = node; }}
          className="relative col-span-1 min-h-[260px] overflow-hidden rounded-xl md:col-span-2 md:min-h-0 md:rounded-2xl"
          style={reveal.getStyle(3)}
        >
          <div className="absolute inset-0 z-10 grid grid-cols-2 gap-2 p-2 md:grid-cols-4 md:p-3">
            {capabilityCards.map((item) => (
              <div
                key={item.title}
                className={`flex min-h-0 flex-col justify-between rounded-xl p-4 backdrop-blur-md md:rounded-2xl md:p-5 ${item.active ? "bg-white/90 text-black" : "bg-white/20 text-white"}`}
              >
                <h3 className="max-w-[180px] text-xl font-semibold leading-[1.05] tracking-[-0.035em] md:text-[clamp(1.4rem,2.3vw,2.2rem)]">{item.title}</h3>
                <span className={`self-end grid size-8 place-items-center rounded-full border text-xs font-semibold md:size-12 ${item.active ? "border-black text-black" : "border-white text-white"}`}>{item.number}</span>
              </div>
            ))}
          </div>
        </MaskedPanel>
      </div>
    </section>
  );
}

function SectionThree() {
  const reveal = useStaggeredReveal();

  return (
    <section
      ref={(node) => { reveal.containerRef.current = node; }}
      aria-label="Specter studio operating model"
      className="mx-auto min-h-screen w-full max-w-[1280px] overflow-hidden bg-white px-3 pb-2 pt-2 dark:bg-[#0b0b0b] md:h-screen md:px-6"
    >
      <div className="grid min-h-[1120px] grid-cols-1 gap-2 md:h-full md:min-h-0 md:grid-cols-2">
        <div className="flex min-h-0 flex-col gap-2">
          <div className="flex min-h-[190px] flex-[1.2] flex-col justify-between rounded-xl bg-stone-50 p-5 md:min-h-0 md:rounded-2xl md:p-7 dark:bg-[#171717]" style={reveal.getStyle(0)}>
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-black dark:text-white">
              One Studio<br />Every Discipline
            </h2>
            <p className="text-xs font-semibold text-black/70 md:text-sm dark:text-white/70">Direct collaboration from strategy to final delivery.</p>
          </div>

          <div className="flex min-h-[160px] flex-1 gap-2 md:min-h-0" style={reveal.getStyle(1)}>
            <div className="flex-1 overflow-hidden rounded-xl md:rounded-2xl">
              <img src={SECTION3_IMG1} alt="Specter creative production study" className="size-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden rounded-xl md:rounded-2xl">
              <img src={SECTION3_IMG2} alt="Specter multidisciplinary studio study" className="size-full object-cover" />
            </div>
          </div>

          <div className="flex min-h-[170px] flex-[0.8] items-end justify-between gap-5 rounded-xl bg-zinc-200 p-5 md:min-h-0 md:rounded-2xl md:p-7 dark:bg-[#262626]" style={reveal.getStyle(2)}>
            <div>
              <p className="mb-2 text-xs font-semibold text-black/65 md:mb-3 md:text-sm dark:text-white/65">Project partnership</p>
              <h3 className="text-xl font-semibold leading-6 tracking-[-0.03em] text-black md:text-3xl md:leading-8 dark:text-white">
                Strategy<br />Production<br />Growth
              </h3>
            </div>
            <Link href="/start-a-project" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black md:px-8 md:py-5 md:text-lg">Start a Project</Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl" style={reveal.getStyle(3)}>
          <img src={SECTION3_BG} alt="Specter Visual Lab collaborative production" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 md:bottom-5 md:left-5 md:right-5">
            <Link href="/about" className="flex h-36 flex-1 flex-col justify-between rounded-xl bg-white p-3 md:h-52 md:rounded-2xl md:p-5">
              <h4 className="text-lg font-semibold leading-5 tracking-[-0.035em] text-black md:text-2xl md:leading-7">How we<br />work together</h4>
              <ArrowIcon />
            </Link>
            <Link href="/services" className="flex h-36 flex-1 flex-col justify-between rounded-xl bg-black/25 p-3 text-white backdrop-blur-xl md:h-52 md:rounded-2xl md:p-5">
              <h4 className="text-lg font-semibold leading-5 tracking-[-0.035em] md:text-2xl md:leading-7">What we<br />build for brands</h4>
              <ArrowIcon white />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeImageShowcase() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full bg-white dark:bg-[#0b0b0b]">
      <SectionOne isMobile={isMobile} />
      <SectionTwo isMobile={isMobile} />
      <SectionThree />
    </div>
  );
}
