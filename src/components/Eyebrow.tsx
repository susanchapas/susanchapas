import { ReactNode } from "react";

export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-body mb-4 block text-sm tracking-widest uppercase ${className || "text-accent-lime"}`}
    >
      {children}
    </span>
  );
}
