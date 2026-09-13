"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { services } from "@/data/site";

export function ServicesExplorer() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = services
      .map((service) => document.getElementById(`service-${service.number}`))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const index = Number((visible.target as HTMLElement).dataset.index ?? 0);
        setActive(index);
      }
    }, { threshold: [0.3, 0.55, 0.75] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function jump(index: number) {
    setActive(index);
    document.getElementById(`service-${services[index].number}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="services-explorer">
      <nav className="service-progress" aria-label="Services scene navigation">
        {services.map((service, index) => (
          <button
            type="button"
            key={service.id}
            className={active === index ? "active" : ""}
            aria-label={`Jump to ${service.number}. ${service.name}`}
            aria-current={active === index ? "step" : undefined}
            onClick={() => jump(index)}
          ><span>{service.number}</span><b>{service.shortName}</b></button>
        ))}
      </nav>

      <div className="service-scenes">
        {services.map((service, index) => (
          <section className="service-scene" id={`service-${service.number}`} key={service.id} data-index={index}>
            <div className="shell service-scene-grid">
              <div>
                <span className="scene-index">{service.number} / 13 · {service.category}</span>
                <h1>{service.name}</h1>
                <p className="lead">{service.description}</p>
                <div className="chip-row">{service.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div>
                <div className="button-row"><Link href={`/start-a-project?service=${service.id}`} className="button button-primary">Start with this service</Link><Link href="/pricing" className="button">View pricing</Link></div>
              </div>
              <div className="system-card service-system-card">
                <span className="label">SERVICE MODULE</span>
                <h3>Available scopes</h3>
                <ol>{service.subservices.map((sub) => <li key={sub}>{sub}</li>)}</ol>
                <div className="meta-grid"><div><span>Unit</span><strong>{service.unit}</strong></div><div><span>Discipline</span><strong>{service.category}</strong></div></div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
