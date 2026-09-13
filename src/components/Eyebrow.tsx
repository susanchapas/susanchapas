import { ReactNode } from "react";

export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-accent-lime font-body mb-4 block text-sm tracking-widest uppercase">
      {children}
    </span>
  );
}
