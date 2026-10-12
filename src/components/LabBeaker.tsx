import Link from "next/link";

export default function LabBeaker({ count }: { count: number }) {
  return (
    <Link
      href="/projects/the-lab"
      className="group border-accent-lime/40 hover:border-accent-lime focus-visible:border-accent-lime pointer-events-auto inline-flex items-center rounded-full border bg-[color-mix(in_oklab,var(--color-primary),black_50%)] transition-colors"
    >
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-liquid)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="text-secondary pl-4 font-mono text-xs">
            Peek into <span className="text-accent-lime">The Lab</span>
            <span className="text-secondary/50"> / {count} experiments</span>
          </span>
          <span className="text-accent-lime pr-3" aria-hidden="true">
            →
          </span>
        </span>
      </span>
      <span className="relative grid size-12 shrink-0 place-items-center rounded-full">
        {[
          "[--spark-x:-10px] [--spark-y:-14px]",
          "[--spark-x:10px] [--spark-y:-14px] [animation-delay:0.6s]",
          "[--spark-x:-4px] [--spark-y:-18px] [animation-delay:1.2s]",
          "[--spark-x:4px] [--spark-y:-18px] [animation-delay:1.8s]",
        ].map((c) => (
          <span
            key={c}
            className={`bg-accent-lime animate-beaker-spark absolute top-[13px] left-1/2 -ml-0.5 size-1 rounded-full ${c}`}
          />
        ))}
        <svg
          viewBox="0 0 24 24"
          className="text-accent-lime animate-beaker-tilt relative size-6 overflow-visible"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L14 9V3" />
          <path
            d="M7.5 15h9l2 4a1.5 1.5 0 0 1-1.3 2H6.3A1.5 1.5 0 0 1 5 19z"
            fill="currentColor"
            fillOpacity={0.35}
            stroke="none"
          />
          <circle
            cx="10.5"
            cy="17"
            r="0.9"
            fill="currentColor"
            stroke="none"
            className="animate-beaker-bubble"
          />
          <circle
            cx="13.5"
            cy="18"
            r="0.7"
            fill="currentColor"
            stroke="none"
            className="animate-beaker-bubble [animation-delay:0.7s]"
          />
          <circle
            cx="12"
            cy="17.5"
            r="0.6"
            fill="currentColor"
            stroke="none"
            className="animate-beaker-bubble [animation-delay:1.4s]"
          />
        </svg>
      </span>
    </Link>
  );
}
