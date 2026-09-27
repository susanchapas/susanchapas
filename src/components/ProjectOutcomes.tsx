import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

export interface OutcomeItem {
  label: string;
  value: string;
}

export default function ProjectOutcomes({ items }: { items: OutcomeItem[] }) {
  return (
    <Reveal>
      <Eyebrow>Outcome</Eyebrow>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-accent-clay text-xs tracking-wide uppercase">
              {item.label}
            </dt>
            <dd className="font-body text-secondary mt-1 leading-relaxed">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
