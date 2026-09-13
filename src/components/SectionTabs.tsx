"use client";

import { motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { getLenis } from "@/lib/lenis";

export type SectionTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export default function SectionTabs({ tabs }: { tabs: SectionTab[] }) {
  const layoutId = useId();
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  const updateActive = useCallback(() => {
    if (isScrollingRef.current) return;
    const navHeight = navRef.current?.offsetHeight ?? 64;
    let current = tabs[0]?.id;
    for (const tab of tabs) {
      const el = sectionRefs.current.get(tab.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top - navHeight <= 1) current = tab.id;
    }
    setActiveId(current);
  }, [tabs]);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  function scrollToSection(id: string) {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    isScrollingRef.current = true;
    setActiveId(id);
    const navHeight = navRef.current?.offsetHeight ?? 64;
    const target = el.getBoundingClientRect().top + window.scrollY - navHeight;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 0.6,
        onComplete: () => { isScrollingRef.current = false; },
      });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
      setTimeout(() => { isScrollingRef.current = false; }, 700);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + tabs.length) % tabs.length;
    scrollToSection(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <div
        ref={navRef}
        className="bg-primary sticky top-16 z-30 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] lg:top-0"
      >
        <div className="container mx-auto flex justify-center px-6 py-4 lg:px-12">
          <nav
            aria-label="Project sections"
            className="border-accent-blue/15 bg-accent-blue/10 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab, i) => {
              const selected = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  aria-current={selected ? "true" : undefined}
                  onClick={() => scrollToSection(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`font-body relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                    selected
                      ? "text-primary"
                      : "text-secondary/60 hover:text-secondary hover:bg-secondary/5"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId={layoutId}
                      className="bg-accent-lime absolute inset-0 rounded-full shadow-[0_4px_14px_-2px_rgba(111,205,157,0.45)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          ref={(el) => { if (el) sectionRefs.current.set(tab.id, el); }}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
