import CareersApplication from "@/components/CareersApplication";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "Careers | Specter Visual Lab System" };

const reasons = [
  ["Real client work", "Ship work for real campaigns instead of mock exercises."],
  ["Modern AI stack", "Work with generative, automation, visual, and engineering systems."],
  ["Direct leadership access", "Collaborate closely with senior decision makers."],
  ["Grow with the studio", "Take ownership across disciplines as the operation scales."],
];

export default function CareersPage() {
  return (
    <><SiteHeader />
      <main>
        <section className="page-hero"><div className="container narrow"><span className="eyebrow">Join the collective</span><h1>Engineered by artists, powered for what&apos;s next.</h1><p>Apply across one or several of the studio&apos;s 13 disciplines.</p><div className="button-row"><a className="button primary" href="#sectors">See open sectors ↓</a><a className="button" href="#applyForm">Apply now →</a></div></div></section>
        <section className="section-block container"><div className="section-heading"><span className="eyebrow">Studio culture</span><h2>Why work with us</h2></div><div className="card-grid four">{reasons.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <div className="container"><CareersApplication /></div>
      </main>
      <Footer />
    </>
  );
}
