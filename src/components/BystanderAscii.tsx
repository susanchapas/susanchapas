import { BYSTANDER, BYSTANDER_COLS, BYSTANDER_ROWS } from "./bystanderData";

const LAYERS: [keyof typeof BYSTANDER, string][] = [
  ["dim", "text-secondary/30"],
  ["mid", "text-secondary/60"],
  ["bright", "text-secondary"],
];

export default function BystanderAscii({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`[container-type:inline-size] pointer-events-none w-full select-none ${className}`}
    >
      <div
        className="relative [mask-image:linear-gradient(to_bottom,black_70%,transparent)] font-mono leading-none"
        style={{
          fontSize: `calc(100cqw / ${BYSTANDER_COLS * 0.6})`,
          width: `${BYSTANDER_COLS * 0.6}em`,
          height: `${BYSTANDER_ROWS}em`,
        }}
      >
        {LAYERS.map(([name, color]) => (
          <pre key={name} className={`absolute inset-0 font-[inherit] ${color}`}>
            {BYSTANDER[name]}
          </pre>
        ))}
      </div>
    </div>
  );
}
