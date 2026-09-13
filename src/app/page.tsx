import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BeforeAfterDemo } from "@/components/HomeInteractive";
import { HomepageDarkBg } from "@/components/HomepageDarkBg";
import { SiteHeader } from "@/components/SiteHeader";
import { industries, portfolio, services, testimonials } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="home-hero" aria-labelledby="home-hero-title">
          <HomepageDarkBg />

          <div className="shell home-hero-inner">
            <div className="home-trust-row hero-reveal hero-delay-1">
              <div className="home-trust-avatars" aria-hidden="true">
                <span><b>AI</b></span>
                <span><b>3D</b></span>
                <span><b>DEV</b></span>
              </div>
              <span className="home-trust-pill">13 disciplines. One integrated studio.</span>
            </div>

            <h1 id="home-hero-title" className="home-hero-title">
              <span className="home-title-line hero-title-delay-1">Visual Intelligence</span>
              <span className="home-title-line hero-title-delay-2">Designed To Evolve</span>
            </h1>

            <p className="home-hero-subhead hero-reveal hero-delay-2">
              AI agents, brand systems, product experiences, visual production, post-production, SEO, and campaigns—connected in one production system built for modern brands.
            </p>

            <div className="home-hero-actions hero-reveal hero-delay-3">
              <Link className="home-hero-cta home-hero-cta-primary" href="/start-a-project">Start a Project</Link>
              <Link className="home-hero-cta home-hero-cta-secondary" href="/services">Explore Services</Link>
            </div>
          </div>

          <div className="shell home-hero-stats" aria-label="Studio metrics">
            <div className="home-hero-stat hero-reveal hero-delay-4"><span className="home-stat-icon">+</span><strong>13+</strong><small>Years Experience</small></div>
            <div className="home-hero-stat hero-reveal hero-delay-5"><span className="home-stat-icon">#</span><strong>500+</strong><small>Projects Delivered</small></div>
            <div className="home-hero-stat hero-reveal hero-delay-6"><span className="home-stat-icon">*</span><strong>13</strong><small>Integrated Disciplines</small></div>
            <div className="home-hero-stat hero-reveal hero-delay-7"><span className="home-stat-icon">&lt;</span><strong>24–72h</strong><small>Typical Turnaround</small></div>
          </div>
        </section>

        <section className="section section-tight border-section">
          <div className="shell">
            <p className="section-kicker">Industries served</p>
            <div className="chip-row">{industries.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="shell">
            <div className="section-heading"><span className="eyebrow">Comprehensive Capabilities</span><h2>What We Do</h2><p>Thirteen specialized service disciplines carried over from the original SVL system.</p></div>
            <div className="card-grid services-grid">{services.map((service) => (
              <article className="card service-card" key={service.id}>
                <span className="service-number">{service.number}</span><h3>{service.name}</h3><p>{service.description}</p>
                <Link href={`/services#service-${service.number}`}>Explore service →</Link>
              </article>
            ))}</div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="shell two-col">
            <div><span className="eyebrow">Interactive Production Demo</span><h2>Before / after comparison workflow</h2><p>Preserves the source project’s category-switching comparison pattern with keyboard-friendly native controls.</p></div>
            <BeforeAfterDemo />
          </div>
        </section>

        <section className="section">
          <div className="shell"><div className="section-heading"><span className="eyebrow">The SVL Advantage</span><h2>Why Teams Choose Us</h2></div>
            <div className="card-grid four-col">
              {["AI + Human Craft", "Enterprise-Grade Tools", "Built to Scale", "One Team, Every Discipline"].map((title, i) => <article className="card" key={title}><span className="service-number">0{i + 1}</span><h3>{title}</h3><p>{["Automation accelerates the work while skilled people direct the result.", "Modern model and production tooling organized into repeatable workflows.", "The same operating model can handle a hero asset or a large batch.", "Strategy, production, engineering, post, and growth live in one service map."][i]}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="shell"><div className="section-heading"><span className="eyebrow">Client Stories</span><h2>What Clients Say</h2></div>
            <div className="card-grid four-col">{testimonials.map((item) => <article className="card" key={item.name}><div className="stars">★★★★★</div><p>“{item.quote}”</p><h3>{item.name}</h3><small>{item.role}</small></article>)}</div>
          </div>
        </section>

        <section className="section" id="portfolio">
          <div className="shell"><div className="section-heading"><span className="eyebrow">Case Studies</span><h2>Selected Work</h2><p>Portfolio placeholders preserve the original six-card system without copying its imagery.</p></div>
            <div className="portfolio-grid">{portfolio.map((item, index) => <article className="portfolio-card" key={item.title}><div className="portfolio-placeholder">PROJECT {String(index + 1).padStart(2, "0")}</div><span>{item.tag}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="shell two-col"><div><span className="eyebrow">Our Story</span><h2>Thirteen Years of Craft. Reimagined for the AI Era.</h2><p>Specter Visual Lab combines visual-production experience with AI-first tooling and compact direct collaboration.</p><div className="chip-row"><span className="chip">13+ Years Experience</span><span className="chip">Global Clientele</span><span className="chip">AI Pipelines</span></div><Link className="button" href="/about">Learn More About Us</Link></div><div className="system-card"><span className="label">OPERATING MODEL</span><h3>Direct, multidisciplinary, pipeline-oriented.</h3><p>The source site’s About page centers direct access, accountability, enterprise AI tools, and integrated production disciplines.</p></div></div>
        </section>

        <section className="section"><div className="shell callout"><div><span className="eyebrow">Join The Collective</span><h2>We’re Building a World-Class Team</h2><p>Apply across one or more of the 13 creative and technical sectors.</p></div><Link className="button button-primary" href="/careers">View Careers</Link></div></section>

        <section className="section alt-section" id="contact"><div className="shell final-cta"><span className="eyebrow">Let’s Create</span><h2>Ready to start your project?</h2><p>Pick a structured tier or create a custom scope from the 13 service disciplines.</p><Link className="button button-primary" href="/start-a-project">Start a Project</Link></div></section>
      </main>
      <Footer />
    </>
  );
}
