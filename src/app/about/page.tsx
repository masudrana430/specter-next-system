import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { values } from "@/data/site";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return <>
    <SiteHeader />
    <main>
      <section className="section hero"><div className="shell narrow"><span className="eyebrow">About Specter Visual Lab</span><h1>Connect Vision with Velocity.</h1><p className="lead">Direct collaboration, veteran visual-production craft, and modern AI systems organized around accountability and speed.</p></div></section>

      <section className="section section-tight alt-section"><div className="shell"><div className="media-placeholder"><div><span className="label">FILM 01 · WHO WE ARE</span><h2>Studio introduction</h2><video controls preload="metadata" playsInline><source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" /></video><p>Demo media source. Replace it with your studio film during design/content customization.</p></div></div></div></section>

      <section className="section"><div className="shell two-col"><div><span className="eyebrow">Our Vision</span><h2>The Standard of Direct Accountability</h2><p>Strong creative partnerships are built on direct ownership, trusted specialists, clear communication, and experienced hands guiding technology.</p><p>The source story emphasizes more than 13 years of production leadership, direct founder access, and a compact specialist team rather than an account-management relay.</p></div><div className="system-card"><span className="label">VISION PRINCIPLES</span><ul className="check-list"><li>✓ Direct creative ownership</li><li>✓ Compact specialist teams</li><li>✓ Technology guided by production experience</li><li>✓ Clear accountability from brief to deployment</li></ul></div></div></section>

      <section className="section alt-section"><div className="shell"><div className="section-heading"><span className="eyebrow">Our Mission</span><h2>An Unfair Visual Advantage for Modern Brands</h2><p>Collapse the distance between high-end design craft and autonomous technological speed across 13 integrated disciplines.</p></div><div className="chip-row center-chips"><span className="chip">13 Integrated Disciplines</span><span className="chip">Direct Direction</span><span className="chip">Enterprise AI Pipelines</span><span className="chip">24–72h Rapid Turnaround</span></div></div></section>

      <section className="section"><div className="shell"><div className="media-placeholder"><div><span className="label">FILM 02 · THE PROCESS</span><h2>Inside the Lab process</h2><video controls preload="metadata" playsInline><source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" /></video><p>Demo media source. The HTML5 video behavior is preserved.</p></div></div></div></section>

      <section className="section alt-section"><div className="shell"><div className="section-heading"><span className="eyebrow">How We Work</span><h2>Our Values</h2></div><div className="card-grid three-col">{values.map(([title, description], index) => <article className="card" key={title}><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="section"><div className="shell callout"><div><span className="eyebrow">Next Step</span><h2>Build a scope around your actual workflow.</h2></div><Link className="button button-primary" href="/start-a-project">Start a Project</Link></div></section>
    </main>
    <Footer />
  </>;
}
