"use client";

import { MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-accent-blue/20 border-t px-6 py-3 landscape:sticky landscape:bottom-0 landscape:z-40 landscape:py-1.5 lg:px-12">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="font-body text-secondary/70 flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>Jersey City</span>
        </div>
        <p className="font-body text-secondary/70 text-sm">
          © {currentYear} Susan Chapas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
