interface HeroPortraitProps {
  className: string;
}

/**
 * The site is statically exported, so Next's on-demand image optimizer is not
 * available. Keep the LCP portrait responsive at the source rather than
 * sending its 1,633px original to every viewport.
 */
export default function HeroPortrait({ className }: HeroPortraitProps) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet="/assets/misc/hero-portrait-768.webp" />
      <img
        src="/assets/misc/hero-portrait-768.webp"
        alt=""
        width={768}
        height={1004}
        fetchPriority="high"
        decoding="async"
        className={className}
        draggable={false}
      />
    </picture>
  );
}
