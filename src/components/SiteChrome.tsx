"use client";

import { usePathname } from "next/navigation";
import GlobalSkillsTicker from "./GlobalSkillsTicker";
import Footer from "./Footer";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname === "/about") return null;

  return (
    <>
      <GlobalSkillsTicker />
      <Footer />
    </>
  );
}
