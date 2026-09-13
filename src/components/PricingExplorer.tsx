"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { detailedPricing, tiers } from "@/data/pricing";
import { services } from "@/data/site";
import { Faq } from "./HomeInteractive";

const faqItems = [
  { q: "Are these prices final?", a: "No. The source project presents detailed prices as illustrative. Final pricing is confirmed against scope, complexity, volume, timeline, and commercial requirements." },
  { q: "Can I mix services?", a: "Yes. Use Start a Project and choose Custom to combine any of the 13 disciplines and set quantities for each sub-service." },
  { q: "What is the difference between project tiers and volume pricing?", a: "Project tiers package studio capacity and service levels. Detailed pricing shows example service-specific scopes and volume bands." },
  { q: "Can an enterprise engagement use custom infrastructure?", a: "Yes. The Enterprise model supports custom governance, agreements, delivery rules, and dedicated infrastructure options." },
];

export function PricingExplorer() {
  const [filter, setFilter] = useState(services[0].id);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const selected = useMemo(() => detailedPricing.find((item) => item.serviceId === filter) ?? detailedPricing[0], [filter]);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (services.some((service) => service.id === hash)) setFilter(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <>
      <section className="section pricing-hero"><div className="shell narrow center"><span className="eyebrow">Transparent Investment</span><h1>High-Impact Creative Firepower. Predictable, Transparent Scale.</h1><p className="lead">Choose a fixed full-service tier or inspect service-specific production bands.</p></div></section>

      <section className="section section-tight"><div className="shell pricing-tier-grid">
        {tiers.map((tier) => {
          const isExpanded = expanded[tier.id] ?? false;
          return <article className={`card pricing-tier-card ${tier.featured ? "featured" : ""}`} key={tier.id}>
            {tier.featured && <span className="popular-badge">Most Popular</span>}
            <h2>{tier.name}</h2><p>{tier.description}</p><div className="price"><strong>{tier.price}</strong><span>{tier.period}</span></div>
            <ul className="check-list">{tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
            {isExpanded && <ul className="check-list extra-list">{tier.extras.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>}
            <button type="button" className="text-button" onClick={() => setExpanded((s) => ({ ...s, [tier.id]: !isExpanded }))}>{isExpanded ? "Show fewer features" : `+${tier.extras.length} more features`}</button>
            <Link className="button" href={`/start-a-project?tier=${tier.id}`}>{tier.id === "enterprise" ? "Contact Enterprise" : `Choose ${tier.name}`} →</Link>
          </article>;
        })}
      </div></section>

      <section className="section alt-section" id="detailed-pricing"><div className="shell">
        <div className="section-heading"><span className="eyebrow">Detailed Service Pricing</span><h2>Pick a service to inspect scope bands</h2><p>Illustrative pricing; final rates are confirmed per project.</p></div>
        <div className="pricing-filter" role="group" aria-label="Filter pricing by discipline">
          {services.map((service) => <button type="button" key={service.id} aria-pressed={filter === service.id} className={filter === service.id ? "active" : ""} onClick={() => { setFilter(service.id); history.replaceState(null, "", `#${service.id}`); }}>{service.name}</button>)}
        </div>

        <div className="detailed-pricing-head"><span>{selected.serviceName}</span><small>{selected.category}</small></div>
        <div className="offering-grid">{selected.offerings.map((offering) => <article className="card offering-card" key={offering.title}>
          <div><span className="eyebrow">{offering.badge}</span><h3>{offering.title}</h3><p>{offering.description}</p></div>
          <div className="volume-grid">{offering.tiers.map((band) => <div className={`volume-band ${band.popular ? "popular" : ""} ${band.custom ? "custom" : ""}`} key={band.label}><span>{band.label}</span><strong>{band.price}</strong><small>{band.note}</small></div>)}</div>
          <Link href={`/start-a-project?service=${selected.serviceId}`} className="button button-primary">Configure this service →</Link>
        </article>)}</div>
      </div></section>

      <section className="section"><div className="shell narrow"><div className="section-heading"><span className="eyebrow">FAQ</span><h2>Pricing questions</h2></div><Faq items={faqItems} /></div></section>
    </>
  );
}
