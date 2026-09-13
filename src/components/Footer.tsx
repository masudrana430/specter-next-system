"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { services } from "@/data/site";

export function Footer() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      setStatus(result.message ?? "Subscribed.");
      if (response.ok) form.reset();
    } catch {
      setStatus("Could not submit right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/"><span className="brand-mark">SVL</span><span>SPECTER VISUAL LAB</span></Link>
          <p>Next-generation visual production, creative AI agents, and automated media pipelines.</p>
          <div className="social-row" aria-label="Social placeholders">
            <a href="#linkedin">LinkedIn</a><a href="#x">X</a><a href="#instagram">Instagram</a><a href="#dribbble">Dribbble</a>
          </div>
        </div>

        <div>
          <h3>Company</h3>
          <div className="footer-links">
            <Link href="/about">About Us</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/blog">Blog & Insights</Link>
            <Link href="/#portfolio">Selected Work</Link>
            <Link href="/pricing">Pricing Plans</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3>Services (13)</h3>
          <div className="footer-links compact">
            {services.map((service) => <Link key={service.id} href={`/services#service-${service.number}`}>{service.shortName}</Link>)}
          </div>
        </div>

        <div>
          <h3>Lab Dispatch</h3>
          <p>Monthly briefing on generative models, production systems, 3D, and creative technology.</p>
          <form onSubmit={subscribe} className="newsletter-form">
            <input type="email" name="email" required placeholder="Your work email" aria-label="Newsletter email" />
            <button className="button button-primary" disabled={pending}>{pending ? "Submitting…" : "Subscribe"}</button>
          </form>
          <p className="form-status" role="status">{status}</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Specter Visual Lab.</span>
        <div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/security">Security</Link></div>
      </div>
    </footer>
  );
}
