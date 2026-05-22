"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

export type SectionTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export default function SectionTabs({ tabs }: { tabs: SectionTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <div className="bg-primary sticky top-16 z-30 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] lg:top-0">
        <div className="container mx-auto px-6 py-4 lg:px-12">
          <div
            role="tablist"
            aria-label="Project sections"
            className="border-accent-blue/15 bg-accent-blue/10 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab, i) => {
              const selected = tab.id === activeTab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`font-body relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                    selected
                      ? "text-primary"
                      : "text-secondary/60 hover:text-secondary hover:bg-secondary/5"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="section-tab-pill"
                      className="bg-accent-lime absolute inset-0 rounded-full shadow-[0_4px_14px_-2px_rgba(204,255,0,0.45)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
