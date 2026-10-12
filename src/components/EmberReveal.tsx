import Image from "next/image";

const emberSpots = [
  [8, 62, 0],
  [22, 38, 3.1],
  [37, 74, 6.4],
  [51, 46, 1.7],
  [64, 68, 4.6],
  [77, 34, 2.4],
  [88, 58, 7.2],
  [95, 80, 5.3],
];

const unlit =
  "transition-opacity duration-[5s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/pane:duration-[640ms] group-focus-within:duration-[640ms]";

export default function EmberReveal({
  src,
  overlay,
  veil = "bg-black",
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: {
  src: string;
  overlay?: string;
  veil?: string;
  sizes?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-[50%_40%]"
        sizes={sizes}
      />
      <span
        className={`absolute inset-0 ${veil} group-focus-within:opacity-25 group-hover/pane:opacity-25 ${unlit}`}
      />
      <span
        className={`pointer-events-none absolute inset-0 group-focus-within:opacity-0 group-hover/pane:opacity-0 ${unlit}`}
        aria-hidden="true"
      >
        {emberSpots.map(([x, y, delay]) => (
          <i
            key={x}
            className="ember"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animationDelay: `-${delay}s, -${delay / 2}s`,
            }}
          />
        ))}
      </span>
      {overlay && (
        <Image
          src={overlay}
          alt=""
          fill
          className="pointer-events-none object-cover"
          sizes={sizes}
        />
      )}
    </>
  );
}
