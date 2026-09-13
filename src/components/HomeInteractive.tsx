"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <div className="stat-card" ref={ref}><strong>{value}{suffix}</strong><span>{label}</span></div>;
}

const comparisonData = {
  ecommerce: ["Raw 3D Pass", "Studio Packshot"],
  editorial: ["Flat Camera RAW", "Editorial Color Grade"],
  jewelry: ["Unfinished CAD", "Photoreal Caustics"],
  realestate: ["Overcast Structural", "Twilight CGI Render"],
} as const;

type Category = keyof typeof comparisonData;

export function BeforeAfterDemo() {
  const [category, setCategory] = useState<Category>("ecommerce");
  const [split, setSplit] = useState(50);
  const [raw, edited] = comparisonData[category];

  return (
    <div className="comparison-block">
      <div className="tab-row" role="tablist" aria-label="Before and after categories">
        {(Object.keys(comparisonData) as Category[]).map((key) => (
          <button key={key} role="tab" aria-selected={category === key} className={category === key ? "active" : ""} onClick={() => { setCategory(key); setSplit(50); }}>
            {key === "realestate" ? "Real Estate" : key[0].toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="comparison-stage" style={{ "--split": `${split}%` } as CSSProperties}>
        <div className="comparison-side raw"><span>BEFORE</span><strong>{raw}</strong><p>Source / working material</p></div>
        <div className="comparison-side edited"><span>AFTER</span><strong>{edited}</strong><p>Production-ready output</p></div>
        <div className="comparison-divider" />
      </div>
      <label className="range-label">Comparison split
        <input type="range" min="0" max="100" value={split} onChange={(e) => setSplit(Number(e.target.value))} />
      </label>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{items.map((item, index) => (
    <div className="faq-item" key={item.q}>
      <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
        <span>{item.q}</span><span>{open === index ? "−" : "+"}</span>
      </button>
      {open === index && <div className="faq-answer"><p>{item.a}</p></div>}
    </div>
  ))}</div>;
}
