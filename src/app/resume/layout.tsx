import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Susan Chapas, UX Researcher & Designer and HCI student at NJIT. Interactive timeline of experience, education, and skills.",
});

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
