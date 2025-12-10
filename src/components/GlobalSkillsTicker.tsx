"use client";

import { usePathname } from "next/navigation";
import SkillsTicker from "./SkillsTicker";

export default function GlobalSkillsTicker() {
    const pathname = usePathname();

    // Don't render on home page
    if (pathname === "/") {
        return null;
    }

    return <SkillsTicker />;
}
