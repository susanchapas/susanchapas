import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Susan Chapas for UX design, marketing strategy, or web development projects. Based in Jersey City, NJ.",
  openGraph: {
    title: "Contact Susan Chapas | UX Strategist & Marketing Professional",
    description:
      "Let's discuss your next project. Get in touch for UX design, marketing strategy, or web development inquiries.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
