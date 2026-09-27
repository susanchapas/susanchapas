import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Susan Chapas for internship opportunities, freelance projects, or collaborations. HCI student based in Jersey City, NJ.",
  openGraph: {
    title: "Contact Susan Chapas | HCI Student & Developer",
    description:
      "Currently seeking internships. Get in touch for UX design, development, or creative collaboration.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
