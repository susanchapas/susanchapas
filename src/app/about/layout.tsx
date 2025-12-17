import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Susan Chapas - UX Strategist, Marketing Professional, and Full-Stack Developer. Discover my journey from marketing to human-computer interaction.",
  openGraph: {
    title: "About Susan Chapas | UX Strategist & Marketing Professional",
    description:
      "Learn about Susan Chapas - UX Strategist, Marketing Professional, and Full-Stack Developer based in Jersey City, NJ.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
