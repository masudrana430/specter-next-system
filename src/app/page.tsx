import Link from "next/link";
import { DarkHomeHero } from "@/components/DarkHomeHero";
import { HomeHeroContent } from "@/components/HomeHeroContent";
import { HomeImageShowcase } from "@/components/HomeImageShowcase";
import { HomeIndustriesMarquee } from "@/components/HomeIndustriesMarquee";
import { HomeNavbar } from "@/components/HomeNavbar";
import { HomePartnerSection } from "@/components/HomePartnerSection";
import { HomeReviewsSection } from "@/components/HomeReviewsSection";
import { HomeServiceShowcase } from "@/components/HomeServiceShowcase";
import { HomeWorkflowSection } from "@/components/HomeWorkflowSection";
import { BeforeAfterDemo } from "@/components/HomeInteractive";
import { ReferenceHomeHero } from "@/components/ReferenceHomeHero";

export default function HomePage() {
  return (
    <>
      <div className="home-hero-shell relative">
        <style>{`
          .home-hero-shell section[aria-labelledby="hero-title"] header,
          .home-hero-shell section[aria-labelledby="hero-title"] main,
          .home-hero-shell section[aria-labelledby="hero-title"] footer,
          .home-hero-shell section[aria-labelledby="svl-dark-hero-title"] header,
          .home-hero-shell section[aria-labelledby="svl-dark-hero-title"] main,
          .home-hero-shell section[aria-labelledby="svl-dark-hero-title"] footer {
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `}</style>
        <HomeNavbar />
        <HomeHeroContent />
        <div className="dark:hidden"><ReferenceHomeHero /></div>
        <div className="hidden dark:block"><DarkHomeHero /></div>
      </div>

      <main>
        <HomeServiceShowcase />
        <HomeIndustriesMarquee />
        <HomeImageShowcase />
        <HomePartnerSection />

        <section className="section alt-section">
          <div className="shell two-col">
            <div>
              <span className="eyebrow">Interactive Production Demo</span>
              <h2>Before / after comparison workflow</h2>
              <p>Preserves the source project’s category-switching comparison pattern with keyboard-friendly native controls.</p>
            </div>
            <BeforeAfterDemo />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">The SVL Advantage</span>
              <h2>Why Teams Choose Us</h2>
            </div>
            <div className="card-grid four-col">
              {["AI + Human Craft", "Enterprise-Grade Tools", "Built to Scale", "One Team, Every Discipline"].map((title, i) => (
                <article className="card" key={title}>
                  <span className="service-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{[
                    "Automation accelerates the work while skilled people direct the result.",
                    "Modern model and production tooling organized into repeatable workflows.",
                    "The same operating model can handle a hero asset or a large batch.",
                    "Strategy, production, engineering, post, and growth live in one service map.",
                  ][i]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HomeWorkflowSection />
        <HomeReviewsSection />

        <section className="section alt-section">
          <div className="shell two-col">
            <div>
              <span className="eyebrow">Our Story</span>
              <h2>Thirteen Years of Craft. Reimagined for the AI Era.</h2>
              <p>Specter Visual Lab combines visual-production experience with AI-first tooling and compact direct collaboration.</p>
              <div className="chip-row">
                <span className="chip">13+ Years Experience</span>
                <span className="chip">Global Clientele</span>
                <span className="chip">AI Pipelines</span>
              </div>
              <Link className="button" href="/about">Learn More About Us</Link>
            </div>
            <div className="system-card">
              <span className="label">OPERATING MODEL</span>
              <h3>Direct, multidisciplinary, pipeline-oriented.</h3>
              <p>The source site’s About page centers direct access, accountability, enterprise AI tools, and integrated production disciplines.</p>
            </div>
          </div>
        </section>

        <section className="section alt-section" id="contact">
          <div className="shell final-cta">
            <span className="eyebrow">Let’s Create</span>
            <h2>Ready to start your project?</h2>
            <p>Pick a structured tier or create a custom scope from the 13 service disciplines.</p>
            <Link className="button button-primary" href="/start-a-project">Start a Project</Link>
          </div>
        </section>
      </main>
    </>
  );
}
