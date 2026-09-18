import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { getServiceBySlug, getServiceSlug, services } from "@/data/site";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: getServiceSlug(service),
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service" };
  }

  return {
    title: `${service.name} | Specter Visual Lab`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white text-[#111] dark:bg-[#0b0b0b] dark:text-white">
        <section className="border-b border-black/[0.07] pb-16 pt-32 dark:border-white/10 md:pb-20 md:pt-40">
          <div className="mx-auto w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))]">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
            >
              <span aria-hidden="true">←</span>
              All services
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 md:text-xs">
                  {service.number} / 13 · {service.category}
                </p>

                <h1 className="mt-4 max-w-[980px] text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.065em]">
                  {service.name}
                </h1>

                <p className="mt-7 max-w-[760px] text-base leading-7 text-black/58 dark:text-white/55 md:text-lg md:leading-8">
                  {service.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-black/[0.09] px-3 py-1.5 text-xs font-semibold text-black/60 dark:border-white/10 dark:text-white/60"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-black/[0.08] bg-[#f7f7f4] p-5 dark:border-white/10 dark:bg-[#111]">
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-black/35 dark:text-white/35">
                  Service template
                </p>
                <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
                  This page is intentionally minimal and ready for service-specific content.
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={`/start-a-project?service=${service.id}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white dark:bg-white dark:text-black"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/[0.09] px-5 text-sm font-semibold text-black dark:border-white/10 dark:text-white"
                  >
                    View pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["Overview", "Add the full service overview here."],
                ["What we deliver", "Add deliverables, packages, or capabilities here."],
                ["Process", "Add the service-specific workflow here."],
                ["Selected work", "Add relevant projects, media, or case studies here."],
                ["Timeline & scope", "Add turnaround, scope, and engagement details here."],
                ["FAQ", "Add common service questions and answers here."],
              ].map(([title, placeholder]) => (
                <article
                  key={title}
                  className="min-h-[190px] rounded-[22px] border border-dashed border-black/[0.12] bg-[#fafaf8] p-5 dark:border-white/[0.13] dark:bg-[#101010]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/30 dark:text-white/30">
                    Empty section
                  </p>
                  <h2 className="mt-3 text-xl font-bold tracking-[-0.03em]">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-black/45 dark:text-white/45">
                    {placeholder}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-14 border-t border-black/[0.08] pt-8 dark:border-white/10">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-black/35 dark:text-white/35">
                    Existing scopes
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.subservices.map((scope) => (
                      <span
                        key={scope}
                        className="rounded-full bg-black/[0.045] px-3 py-2 text-sm text-black/60 dark:bg-white/[0.07] dark:text-white/60"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-black/40 dark:text-white/40">
                  Unit: {service.unit}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
