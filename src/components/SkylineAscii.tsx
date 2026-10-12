import { SKYLINE, SKYLINE_COLS, SKYLINE_ROWS } from "./skylineData";

const LAYERS: [keyof typeof SKYLINE, string][] = [
  ["skyWarm", "text-accent-clay/60"],
  ["skyCool", "text-accent-blue/35"],
  ["city", "text-accent-blue/45"],
  ["glass", "text-accent-blue/90"],
  ["windows", "text-secondary"],
  ["lights", "text-accent-clay"],
  ["cables", "text-secondary/50"],
  ["bridge", "text-accent-clay/65"],
  ["waterCool", "text-accent-blue/45"],
  ["waterWarm", "text-accent-clay/55"],
];

export default function SkylineAscii() {
  return (
    <div
      aria-hidden
      className="[container-type:inline-size] pointer-events-none absolute inset-0 overflow-hidden opacity-75 select-none"
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_55%)] leading-none"
        style={{
          fontSize: `clamp(5px, calc(100cqw / ${SKYLINE_COLS * 0.6}), 6px)`,
          width: `${SKYLINE_COLS * 0.6}em`,
          height: `${SKYLINE_ROWS}em`,
        }}
      >
        {LAYERS.map(([name, color]) => (
          <pre key={name} className={`absolute inset-0 ${color}`}>
            {SKYLINE[name]}
          </pre>
        ))}
      </div>
    </div>
  );
}
