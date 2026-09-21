"use client";

import { useState } from "react";

export default function LazyIframe({
  src,
  className,
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative isolate h-full w-full">
      <iframe
        src={src}
        className={`relative z-0 transition-opacity duration-300 ${revealed ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} ${className ?? ""}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setRevealed(true)}
        aria-hidden={revealed}
        tabIndex={revealed ? -1 : 0}
        className={`group absolute inset-0 z-20 flex items-center justify-center bg-[#253650] transition-opacity duration-300 hover:bg-[#2d405d] ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <span className="flex flex-col items-center gap-4 rounded-2xl border border-secondary/20 bg-primary/75 px-8 py-6 shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-secondary/80"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-secondary/90 text-lg font-medium">
            Load interactive prototype
          </span>
        </span>
      </button>
    </div>
  );
}
