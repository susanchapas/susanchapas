import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Susan Chapas about UX internships, research collaborations, or freelance design work. HCI student based in Jersey City, NJ.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
