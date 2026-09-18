"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { getServiceSlug, services } from "@/data/site";

const seeds = [
  {
    id: "ai-agent",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85",
    eyebrow: "AI + Automation",
  },
  {
    id: "branding",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85",
    eyebrow: "Brand Systems",
  },
  {
    id: "product-design",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85",
    eyebrow: "Product + 3D",
  },
  {
    id: "web-dev",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85",
    eyebrow: "Digital Product",
  },
  {
    id: "marketing-campaigns",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85",
    eyebrow: "Growth + Campaigns",
  },
];

const showcaseItems = seeds.flatMap((seed) => {
  const service = services.find((item) => item.id === seed.id);
  return service
    ? [
        {
          ...seed,
          name: service.name,
          description: service.description,
          href: `/services/${getServiceSlug(service)}`,
        },
      ]
    : [];
});

const slotClasses = [
  "left-0 h-full w-[72%] sm:w-[66%]",
  "left-[73.5%] h-[88%] w-[18%] sm:left-[67.5%] sm:w-[16%]",
  "left-[92.5%] h-[76%] w-[11%] sm:left-[84.5%] sm:w-[9.5%]",
  "left-[104.5%] h-[64%] w-[7%] sm:left-[95%] sm:w-[6%]",
  "left-[112.5%] h-[52%] w-[5%] sm:left-[102%] sm:w-[4.5%]",
] as const;

function KineticText({ text }: { text: string }) {
  return (
    <span className="flex flex-wrap font-[300]">
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:calc(1em*125/6000)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:calc(1em/12)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(1em*250/6000)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:calc(1em/12)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:calc(1em/12)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}

function Magnetic({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transition =
      "transform 500ms cubic-bezier(0.22,1,0.36,1)";
    ref.current.style.transform = "translate3d(0,0,0)";
  };

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (disabled || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(
      -10,
      Math.min(10, (event.clientX - (rect.left + rect.width / 2)) * 0.08),
    );
    const y = Math.max(
      -10,
      Math.min(10, (event.clientY - (rect.top + rect.height / 2)) * 0.08),
    );

    ref.current.style.transition = "transform 90ms ease-out";
    ref.current.style.transform = `translate3d(${x}px,${y}px,0)`;
  };

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className="inline-flex will-change-transform"
    >
      {children}
    </span>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-4 ${direction === "right" ? "rotate-180" : ""}`}
    >
      <path
        d="m12.5 4.5-5.5 5.5 5.5 5.5M7.5 10H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const rotate = (direction: "next" | "previous") => {
    if (isAnimating || showcaseItems.length < 2) return;
    setIsAnimating(true);

    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % showcaseItems.length
        : (current - 1 + showcaseItems.length) % showcaseItems.length,
    );

    window.setTimeout(() => setIsAnimating(false), 760);
  };

  const active = showcaseItems[activeIndex];

  return (
    <section className="relative overflow-hidden border-y border-black/[0.07] bg-white py-16 text-[#111] dark:border-white/10 dark:bg-[#0b0b0b] dark:text-white sm:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[760px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/45 dark:text-white/45 md:text-xs">
              Explore Specter
            </p>

            <h2 className="mt-2 text-[clamp(2.6rem,5.4vw,5.4rem)] font-bold leading-[0.94] tracking-[-0.055em]">
              <KineticText text="Choose what to build next." />
            </h2>

            <p className="mt-4 max-w-[620px] text-sm leading-6 text-black/55 dark:text-white/55 md:text-base md:leading-7">
              Move through Specter’s core capabilities and open the service that matches your next launch, product, or campaign.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic disabled={isAnimating}>
              <button
                type="button"
                aria-label="Previous service"
                disabled={isAnimating}
                onClick={() => rotate("previous")}
                className="grid size-11 place-items-center rounded-xl border border-black/[0.09] bg-[#f6f6f2] text-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              >
                <Arrow direction="left" />
              </button>
            </Magnetic>

            <Magnetic disabled={isAnimating}>
              <button
                type="button"
                aria-label="Next service"
                disabled={isAnimating}
                onClick={() => rotate("next")}
                className="grid size-11 place-items-center rounded-xl border border-black/[0.09] bg-[#f6f6f2] text-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              >
                <Arrow direction="right" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="relative h-[380px] overflow-hidden rounded-[22px] sm:h-[470px] lg:h-[520px]">
          {showcaseItems.map((item, index) => {
            const slot =
              (index - activeIndex + showcaseItems.length) %
              showcaseItems.length;
            const isActive = slot === 0;

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label={`Open ${item.name}`}
                className={`group absolute bottom-0 overflow-hidden rounded-[18px] border border-white/10 bg-[#111] shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-[left,width,height,transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.38)] ${slotClasses[slot]}`}
                style={{ zIndex: 20 - slot }}
              >
                <img
                  src={item.image}
                  alt=""
                  draggable={false}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/22 to-transparent" />

                <div
                  className={`absolute inset-x-0 bottom-0 p-5 text-white transition-[opacity,transform] duration-500 sm:p-6 ${isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 max-w-[620px] text-[clamp(2rem,4vw,4.2rem)] font-black leading-[0.92] tracking-[-0.05em]">
                    {item.name}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                    View service
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {active && (
          <div className="mt-6 grid gap-5 border-t border-black/[0.08] pt-5 dark:border-white/10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <p className="max-w-[760px] text-sm leading-6 text-black/55 dark:text-white/55">
              {active.description}
            </p>

            <Link
              href={active.href}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/[0.09] px-4 text-sm font-semibold text-black dark:border-white/10 dark:text-white"
            >
              Explore {active.name}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
