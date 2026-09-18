"use client";

import Link from "next/link";
import {
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { testimonials } from "@/data/site";

const reviewImages = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85",
];

const rotations = [-7, 6, -4, 8];

function KineticText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`flex flex-wrap font-[300] ${className}`}>
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
  strength = 0.18,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transition =
      "transform 500ms cubic-bezier(0.22,1,0.36,1)";
    ref.current.style.transform = "translate3d(0,0,0)";
  };

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(
      -18,
      Math.min(18, (event.clientX - (rect.left + rect.width / 2)) * strength),
    );
    const y = Math.max(
      -18,
      Math.min(18, (event.clientY - (rect.top + rect.height / 2)) * strength),
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
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "" : "rotate-180"}
    >
      <path
        d="M12.75 4.5 7.25 10l5.5 5.5M7.75 10h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeReviewsSection() {
  const [active, setActive] = useState(0);

  const previous = () => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="relative isolate overflow-hidden border-y border-black/[0.07] bg-[#f7f7f4] py-16 text-[#121212] dark:border-white/10 dark:bg-[#0b0b0b] dark:text-white md:py-24">
      <style>{`
        @keyframes svl-review-lift {
          0% { translate: 0 0; }
          50% { translate: 0 -52px; }
          100% { translate: 0 0; }
        }
        @keyframes svl-review-word {
          from { opacity: 0; filter: blur(10px); transform: translateY(5px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-black/[0.035] blur-3xl dark:bg-white/[0.035]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full bg-black/[0.045] blur-3xl dark:bg-white/[0.025]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-[900px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black/65 shadow-sm dark:border-white/10 dark:bg-white/[0.055] dark:text-white/65">
              <span className="size-1.5 rounded-full bg-black dark:bg-white" />
              Client stories
            </div>

            <h2 className="mt-5 text-[clamp(3.2rem,7.4vw,7.3rem)] font-black leading-[0.86] tracking-[-0.06em]">
              <KineticText
                text="Built through craft"
                className="block [font-optical-sizing:auto]"
              />
              <KineticText
                text="remembered by clients."
                className="block bg-gradient-to-r from-black via-black/65 to-black/35 bg-clip-text text-transparent [font-optical-sizing:auto] dark:from-white dark:via-white/70 dark:to-white/35"
              />
            </h2>

            <p className="mt-5 max-w-[650px] text-sm leading-6 text-black/58 dark:text-white/55 md:text-base md:leading-7">
              Real outcomes from teams using Specter for visual production, AI workflows, digital products, and launch-ready creative systems.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-black/45 dark:text-white/45">
            <span className="text-3xl leading-none">“</span>
            Results clients remember.
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-[0_24px_70px_rgba(0,0,0,0.38)] sm:p-8 md:rounded-[36px]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/35 to-transparent dark:via-white/35"
          />

          <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-12 py-8 md:grid-cols-2 md:gap-20 md:py-14">
            <div className="relative min-h-[320px] md:min-h-[380px]">
              <div className="absolute inset-0">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === active;
                  const relative =
                    (index - active + testimonials.length) % testimonials.length;
                  const depth = relative === 0 ? 0 : Math.min(relative, 3);
                  const translateX = relative === 0 ? 0 : depth * 7;
                  const translateY = relative === 0 ? 0 : depth * 8;

                  return (
                    <div
                      key={testimonial.name}
                      className="absolute inset-0 origin-bottom [perspective:1000px] transition-[opacity,transform] duration-400 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : Math.max(0.28, 0.72 - depth * 0.12),
                        zIndex: isActive ? 40 : testimonials.length - depth,
                        transform: `translate3d(${translateX}px,${translateY}px,${isActive ? 0 : -100}px) scale(${isActive ? 1 : 0.95 - depth * 0.015}) rotate(${isActive ? 0 : rotations[index % rotations.length]}deg)`,
                        animation: isActive
                          ? "svl-review-lift 400ms ease-in-out"
                          : undefined,
                      }}
                    >
                      <img
                        src={reviewImages[index % reviewImages.length]}
                        alt={`Specter project visual for ${testimonial.name}`}
                        draggable={false}
                        className="size-full rounded-[26px] object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex min-h-[320px] flex-col justify-between py-2 md:min-h-[380px] md:py-4">
              <div key={active}>
                <h3 className="text-2xl font-bold tracking-[-0.03em]">
                  {testimonials[active].name}
                </h3>
                <p className="mt-1 text-sm text-black/45 dark:text-white/45">
                  {testimonials[active].role}
                </p>

                <p className="mt-8 text-lg leading-8 text-black/58 dark:text-white/70 md:text-xl md:leading-9">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <span
                      key={`${word}-${index}-${active}`}
                      className="inline-block"
                      style={{
                        opacity: 0,
                        animation: "svl-review-word 200ms ease-in-out forwards",
                        animationDelay: `${index * 20}ms`,
                      }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </p>
              </div>

              <div className="mt-12 flex gap-4 md:mt-0">
                <Magnetic>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous review"
                    className="grid size-11 place-items-center rounded-full border border-black/10 bg-[#f4f4f1] text-black transition-colors hover:bg-[#e9e9e4] dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:bg-white/[0.11]"
                  >
                    <Arrow direction="left" />
                  </button>
                </Magnetic>

                <Magnetic>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next review"
                    className="grid size-11 place-items-center rounded-full border border-black/10 bg-[#f4f4f1] text-black transition-colors hover:bg-[#e9e9e4] dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:bg-white/[0.11]"
                  >
                    <Arrow direction="right" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-black/[0.08] pt-6 text-sm md:flex-row md:items-center md:justify-between dark:border-white/10">
          <p className="text-black/55 dark:text-white/55">
            One studio. Direct collaboration. Work built to move from concept to launch.
          </p>

          <Magnetic>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 font-bold text-black dark:text-white"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
