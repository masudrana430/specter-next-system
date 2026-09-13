import Link from "next/link";

const metrics = [
  { value: "13", label: "Integrated services" },
  { value: "500+", label: "Projects delivered" },
  { value: "24–72h", label: "Typical turnaround" },
];

function StudioMark({ label }: { label: string }) {
  return (
    <span className="grid size-9 place-items-center rounded-full border border-white/45 bg-[#202020] text-[12px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
      {label}
    </span>
  );
}

export function HomeHeroContent() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[70] flex min-h-[620px] flex-col font-['Inter','Segoe_UI',system-ui,sans-serif] text-white">
      <div className="flex flex-1 items-center justify-center px-5 pb-[150px] pt-[118px] max-[720px]:pb-[180px] max-[720px]:pt-[100px] max-[480px]:pb-[168px]">
        <div className="flex w-full max-w-[1060px] flex-col items-center text-center">
          <div className="mb-[clamp(18px,2.8vh,30px)] inline-flex items-center">
            <span className="relative z-[1] flex items-center">
              <StudioMark label="AI" />
              <span className="-ml-3"><StudioMark label="3D" /></span>
              <span className="-ml-3"><StudioMark label="UX" /></span>
            </span>
            <span className="-ml-3 inline-flex min-h-9 items-center rounded-full border border-white/35 bg-black/65 pl-6 pr-5 text-[clamp(11px,1.25vw,13.5px)] font-medium tracking-[-0.01em] text-white/90 shadow-[0_8px_26px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              AI + human craft · 13 integrated services
            </span>
          </div>

          <h1 className="m-0 max-w-[1050px] font-['BubbledotICG-FinePos','Geist_Pixel_Circle',monospace] text-[clamp(42px,6.8vw,88px)] font-normal leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.22)] max-[720px]:text-[clamp(38px,10.5vw,64px)] max-[480px]:text-[clamp(34px,10vw,48px)]">
            <span className="block">Visual Intelligence</span>
            <span className="block">Built For Modern Brands</span>
          </h1>

          <p className="mx-auto mt-[clamp(18px,2.8vh,28px)] max-w-[760px] text-[clamp(15px,1.55vw,19px)] font-normal leading-[1.55] tracking-[-0.02em] text-white/82 drop-shadow-[0_2px_16px_rgba(0,0,0,0.28)] max-[720px]:max-w-[560px] max-[480px]:text-[14px]">
            Specter Visual Lab combines AI, design, development, 3D, image, video, and growth into one connected production system—from first idea to market-ready execution.
          </p>

          <div className="pointer-events-auto mt-[clamp(22px,3.2vh,34px)] flex flex-wrap justify-center gap-3 max-[520px]:w-full max-[520px]:px-4">
            <Link
              href="/start-a-project"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white bg-white px-7 text-[14px] font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.22)] max-[520px]:flex-1"
              style={{ color: "#111111" }}
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-black/35 px-7 text-[14px] font-medium text-white backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-black/50 max-[520px]:flex-1"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[clamp(26px,4vh,42px)] px-[clamp(22px,6vw,72px)] max-[720px]:bottom-[24px]">
        <div className="mx-auto grid max-w-[920px] grid-cols-3 gap-4 max-[720px]:gap-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="font-['BubbledotICG-FinePos','Geist_Pixel_Circle',monospace] text-[clamp(24px,3vw,34px)] leading-none tracking-[-0.04em] text-white">{metric.value}</div>
              <div className="mt-1 text-[clamp(10px,1.1vw,12.5px)] font-medium tracking-[-0.01em] text-white/65">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
