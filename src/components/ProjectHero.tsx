import Image from "next/image";
import { ReactNode } from "react";

interface ProjectHeroProps {
    src: string;
    alt: string;
    children: ReactNode;
    className?: string;
}

export default function ProjectHero({
    src,
    alt,
    children,
    className = "",
}: ProjectHeroProps) {
    return (
        <section className={`relative flex min-h-[70vh] items-end py-16 lg:py-24 ${className}`}>
            <div className="absolute inset-0 z-0">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Blue filter overlay */}
                <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
                {/* Gradient for extra text readability at the bottom */}
                <div className="from-primary via-primary/40 to-transparent absolute inset-0 bg-gradient-to-t opacity-90" />
            </div>

            <div className="relative z-10 container mx-auto px-6 lg:px-12">
                {children}
            </div>
        </section>
    );
}
