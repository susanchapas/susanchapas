import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Susan Chapas — UX Researcher & Designer, HCI student at NJIT. Interactive timeline of experience, education, and skills.",
  openGraph: {
    title: "Resume | Susan Chapas",
    description:
      "Interactive timeline of experience spanning UX research, marketing strategy, and full-stack development.",
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
