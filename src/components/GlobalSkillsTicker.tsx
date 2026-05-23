"use client";

import { usePathname } from "next/navigation";
import SkillsTicker from "./SkillsTicker";

export default function GlobalSkillsTicker() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <SkillsTicker />;
}
