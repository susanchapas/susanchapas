"use client";

import { usePathname } from "next/navigation";
import ArtScroller from "./ArtScroller";
import GlobalSkillsTicker from "./GlobalSkillsTicker";
import Footer from "./Footer";

export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname === "/about") {
    return (
      <div className="lg:hidden">
        <GlobalSkillsTicker />
        <Footer />
      </div>
    );
  }

  if (pathname === "/resume") {
    return (
      <>
        <ArtScroller />
        <Footer />
      </>
    );
  }

  return (
    <>
      <GlobalSkillsTicker />
      <Footer />
    </>
  );
}
