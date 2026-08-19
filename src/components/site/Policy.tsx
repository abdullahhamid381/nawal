import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { company } from "@/data/company";

export type PolicySection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export function PolicyPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: PolicySection[];
}) {
  return (
    <>
      <PageHeader title={title} description={description} crumbs={[{ label: title }]} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-32 rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slug(s.heading)}`} className="text-muted-foreground transition-colors hover:text-foreground">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <article className="max-w-3xl">
          <p className="mb-8 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
            {company.policyUpdated} — this policy is an editable template. Replace bracketed values with your final
            business policy before publishing.
          </p>
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.03}>
              <section id={slug(s.heading)} className="mb-10 scroll-mt-32">
                <h2 className="text-xl font-bold">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
          <p className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
            Questions about this policy? Email{" "}
            <a href={`mailto:${company.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {company.email}
            </a>{" "}
            or call {company.phone}.
          </p>
        </article>
      </div>
    </>
  );
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
