"use client";

const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Goals · scope · audience",
    detail: "We define the problem, success criteria, constraints, and the right production path.",
  },
  {
    number: "02",
    title: "Strategize",
    subtitle: "Direction · system · plan",
    detail: "We turn the brief into a clear creative, technical, and delivery strategy.",
  },
  {
    number: "03",
    title: "Design + AI",
    subtitle: "Concepts · prototypes · agents",
    detail: "We shape the visual language, product experience, and AI-assisted production system.",
  },
  {
    number: "04",
    title: "Build + Produce",
    subtitle: "Design · code · content",
    detail: "Design, development, 3D, image, video, and automation move into production.",
  },
  {
    number: "05",
    title: "QA + Refine",
    subtitle: "Review · test · polish",
    detail: "Every output is checked for consistency, usability, quality, and launch readiness.",
  },
  {
    number: "06",
    title: "Launch + Grow",
    subtitle: "Deploy · measure · iterate",
    detail: "We launch, monitor, optimize, and evolve the system with your next growth cycle.",
  },
];

function WorkflowIcon({ index }: { index: number }) {
  const paths = [
    <path key="a" d="M4 11h16M11 4v16M7 7l8 8M15 7l-8 8" />,
    <path key="b" d="M4 6h16M6 12h12M8 18h8" />,
    <path key="c" d="M5 17 9 7l3 7 3-10 4 13" />,
    <path key="d" d="M5 5h6v6H5zM13 13h6v6h-6zM13 5h6v4h-6zM5 15h6v4H5z" />,
    <path key="e" d="m5 12 4 4L19 6M4 20h16" />,
    <path key="f" d="M5 17 17 5M8 5h9v9M5 5v14h14" />,
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[index]}
    </svg>
  );
}

function FlowNode({
  index,
  className,
}: {
  index: number;
  className: string;
}) {
  const step = steps[index];

  return (
    <div
      className={`svl-workflow-node absolute z-10 min-h-[88px] w-[210px] rounded-[18px] border border-black/[0.08] bg-white/95 p-4 shadow-[0_16px_42px_rgba(0,0,0,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/95 dark:shadow-[0_18px_46px_rgba(0,0,0,0.38)] xl:w-[230px] ${className}`}
      style={{ animationDelay: `${-index * 0.72}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-black/[0.07] bg-[#f3f3ef] text-black dark:border-white/10 dark:bg-white/[0.07] dark:text-white">
          <WorkflowIcon index={index} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
            {step.number}
          </p>
          <p className="text-[13px] font-bold leading-5 tracking-[-0.02em] text-black dark:text-white">
            {step.title}
          </p>
          <p className="mt-0.5 whitespace-normal text-[10px] leading-4 text-black/45 dark:text-white/45">
            {step.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function KineticHeading({ text }: { text: string }) {
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

export function HomeWorkflowSection() {
  return (
    <section
      aria-labelledby="svl-workflow-title"
      className="relative overflow-hidden border-y border-black/[0.07] bg-white py-16 text-[#111] dark:border-white/10 dark:bg-[#0b0b0b] dark:text-white md:py-24"
    >
      <style>{`
        @keyframes svl-workflow-dash {
          to { stroke-dashoffset: -96; }
        }

        @keyframes svl-workflow-node-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -7px; }
        }

        @keyframes svl-workflow-orbit {
          to { rotate: 360deg; }
        }

        @keyframes svl-workflow-core-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes svl-workflow-mobile-pulse {
          0%, 100% { opacity: .35; transform: scale(.78); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        .svl-workflow-path {
          fill: none;
          stroke-width: 2;
          stroke-dasharray: 7 9;
          animation: svl-workflow-dash 2.8s linear infinite;
        }

        .svl-workflow-node {
          animation: svl-workflow-node-float 4.6s ease-in-out infinite;
        }

        .svl-workflow-orbit {
          animation: svl-workflow-orbit 9s linear infinite;
        }

        .svl-workflow-core {
          animation: svl-workflow-core-float 4.6s ease-in-out infinite;
        }

        .svl-workflow-mobile-dot {
          animation: svl-workflow-mobile-pulse 1.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .svl-workflow-path,
          .svl-workflow-node,
          .svl-workflow-orbit,
          .svl-workflow-core,
          .svl-workflow-mobile-dot {
            animation: none !important;
          }
          .svl-workflow-particles {
            display: none;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="max-w-[960px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/45 dark:text-white/45 md:text-xs">
            Our workflow · one connected production system
          </p>

          <h2
            id="svl-workflow-title"
            className="mt-4 text-[clamp(3rem,6.6vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em]"
          >
            <KineticHeading text="From first signal to" />
            <KineticHeading text="launch-ready work." />
          </h2>

          <p className="mt-5 max-w-[700px] text-sm leading-6 text-black/58 dark:text-white/55 md:text-base md:leading-7">
            Strategy, AI, design, engineering, production, and growth move through one coordinated workflow—so every decision stays connected from discovery to launch.
          </p>
        </div>

        <div className="mt-12 hidden lg:block">
          <div className="relative min-h-[560px] overflow-hidden rounded-[30px] border border-black/[0.08] bg-[#f7f7f4] shadow-[0_24px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#111] dark:shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.045),transparent_42%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_42%)]"
            />

            <svg
              viewBox="0 0 1200 560"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              <defs>
                <filter id="svlParticleGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path className="svl-workflow-path stroke-black/25 dark:stroke-white/25" d="M 170 280 H 535" />
              <path className="svl-workflow-path stroke-black/25 dark:stroke-white/25" d="M 355 105 V 225 H 535" />
              <path className="svl-workflow-path stroke-black/25 dark:stroke-white/25" d="M 355 455 V 335 H 535" />
              <path className="svl-workflow-path stroke-black/25 dark:stroke-white/25" d="M 665 280 H 1030" />
              <path className="svl-workflow-path stroke-black/25 dark:stroke-white/25" d="M 665 225 H 845 V 105" />
              <path className="svl-workflow-path stroke-black/25 dark:stroke-white/25" d="M 665 335 H 845 V 455" />

              <g filter="url(#svlParticleGlow)" className="svl-workflow-particles">
                <circle r="4.5" className="fill-black dark:fill-white">
                  <animateMotion dur="3.8s" repeatCount="indefinite" path="M 170 280 H 535" />
                </circle>
                <circle r="4" className="fill-black/70 dark:fill-white/75">
                  <animateMotion dur="3.3s" begin="-1.2s" repeatCount="indefinite" path="M 355 105 V 225 H 535" />
                </circle>
                <circle r="4" className="fill-black/55 dark:fill-white/65">
                  <animateMotion dur="3.5s" begin="-2.2s" repeatCount="indefinite" path="M 355 455 V 335 H 535" />
                </circle>
                <circle r="4.5" className="fill-black dark:fill-white">
                  <animateMotion dur="3.9s" begin="-0.7s" repeatCount="indefinite" path="M 665 280 H 1030" />
                </circle>
                <circle r="4" className="fill-black/70 dark:fill-white/75">
                  <animateMotion dur="3.4s" begin="-1.8s" repeatCount="indefinite" path="M 665 225 H 845 V 105" />
                </circle>
                <circle r="4" className="fill-black/55 dark:fill-white/65">
                  <animateMotion dur="3.2s" begin="-2.7s" repeatCount="indefinite" path="M 665 335 H 845 V 455" />
                </circle>
              </g>

              <circle
                cx="600"
                cy="280"
                r="79"
                fill="none"
                className="stroke-black/30 dark:stroke-white/30"
                strokeWidth="1.6"
                strokeDasharray="5 8"
              />
            </svg>

            <FlowNode index={0} className="left-7 top-1/2 -translate-y-1/2" />
            <FlowNode index={1} className="left-[17%] top-8" />
            <FlowNode index={2} className="left-[17%] bottom-8" />

            <div className="absolute left-1/2 top-1/2 z-20 size-40 -translate-x-1/2 -translate-y-1/2">
              <div className="svl-workflow-core relative size-full">
                <div className="svl-workflow-orbit absolute -inset-4 rounded-full border border-dashed border-black/25 shadow-[0_0_26px_rgba(0,0,0,0.08)] dark:border-white/25 dark:shadow-[0_0_28px_rgba(255,255,255,0.05)]" />
                <div className="relative grid size-full place-items-center rounded-full border border-black/[0.08] bg-black text-white shadow-[0_22px_55px_rgba(0,0,0,0.23)] dark:border-white/15 dark:bg-white dark:text-black dark:shadow-[0_22px_60px_rgba(0,0,0,0.45)]">
                  <div className="px-5 text-center">
                    <p className="text-xl font-black tracking-[-0.04em]">SPECTER</p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] opacity-60">
                      Production System
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <FlowNode index={3} className="right-[17%] top-8" />
            <FlowNode index={4} className="right-[17%] bottom-8" />
            <FlowNode index={5} className="right-7 top-1/2 -translate-y-1/2" />

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-black/[0.07] bg-white/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40 backdrop-blur dark:border-white/10 dark:bg-black/35 dark:text-white/40">
              One team · one system · one launch path
            </div>
          </div>
        </div>

        <div className="relative mt-10 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[21px] top-8 w-px bg-black/12 dark:bg-white/12"
          />

          <div className="grid gap-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="relative flex gap-4 rounded-[20px] border border-black/[0.08] bg-[#f7f7f4] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.055)] dark:border-white/10 dark:bg-[#111] dark:shadow-[0_12px_30px_rgba(0,0,0,0.28)]"
              >
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <span className="grid size-[42px] place-items-center rounded-full border border-black/[0.09] bg-white text-xs font-black text-black shadow-sm dark:border-white/10 dark:bg-white dark:text-black">
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="svl-workflow-mobile-dot mt-2 size-1.5 rounded-full bg-black/40 dark:bg-white/45" />
                  )}
                </div>

                <div className="min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-lg bg-black/[0.045] text-black dark:bg-white/[0.07] dark:text-white">
                      <WorkflowIcon index={index} />
                    </span>
                    <h3 className="text-[17px] font-bold tracking-[-0.025em]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-black/38 dark:text-white/38">
                    {step.subtitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/58 dark:text-white/55">
                    {step.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Connected", "Strategy through launch"],
            ["Human-led", "AI where it creates leverage"],
            ["Launch-ready", "QA built into every stage"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="border-t border-black/[0.08] pt-5 dark:border-white/10"
            >
              <p className="text-2xl font-black tracking-[-0.045em] md:text-3xl">
                {title}
              </p>
              <p className="mt-1 text-sm text-black/48 dark:text-white/48">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
