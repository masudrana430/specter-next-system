import { Footer } from "@/components/Footer";
import ProjectWizard from "@/components/ProjectWizard";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "Start a Project | Specter Visual Lab System" };

export default async function StartProjectPage({ searchParams }: { searchParams: Promise<{ tier?: string; service?: string }> }) {
  const query = await searchParams;
  return (
    <><SiteHeader />
      <main>
        <section className="page-hero"><div className="container narrow"><span className="eyebrow">Project initiation</span><h1>Let&apos;s build your vision.</h1><p>Select a package or configure a custom multi-service scope, then submit your project details and references.</p></div></section>
        <div className="container"><ProjectWizard initialTier={query.tier} initialService={query.service} /></div>
      </main>
      <Footer />
    </>
  );
}
