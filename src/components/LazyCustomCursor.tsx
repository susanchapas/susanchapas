"use client";

import dynamic from "next/dynamic";

// Lazy load CustomCursor - it's non-essential and only for desktop
const CustomCursorComponent = dynamic(() => import("./CustomCursor"), {
  ssr: false,
  loading: () => null,
});

export default function LazyCustomCursor() {
  return <CustomCursorComponent />;
}
