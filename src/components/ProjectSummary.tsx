import Reveal from "./Reveal";

export interface SummaryItem {
  label: string;
  value: string;
}

const heading = "font-display text-secondary text-3xl font-bold tracking-[-0.02em] lg:text-4xl";

export default function ProjectSummary({
  overview,
  glance,
  outcomes,
}: {
  overview: string;
  glance: SummaryItem[];
  outcomes: SummaryItem[];
}) {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <Reveal className="lg:col-span-7">
          <h2 className={heading}>Overview</h2>
          <p className="font-body text-secondary/80 mt-6 max-w-[42rem] text-lg leading-relaxed">
            {overview}
          </p>
          <dl className="mt-10 grid max-w-[42rem] gap-x-8 gap-y-6 sm:grid-cols-2">
            {glance.map((item) => (
              <div key={item.label} className="border-accent-blue/20 border-t pt-3">
                <dt className="text-secondary/50 text-sm">{item.label}</dt>
                <dd className="text-secondary mt-1 leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal
          delay={0.1}
          className="bg-accent-blue/5 border-accent-blue/10 self-start rounded-2xl border p-6 sm:p-8 lg:col-span-5"
        >
          <h2 className={heading}>Outcomes</h2>
          <dl className="mt-6 space-y-6">
            {outcomes.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-accent-clay font-semibold">{item.label}</dt>
                <dd className="font-body text-secondary/70 mt-1 leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
