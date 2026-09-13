import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { QuestionIcon } from "@/components/Icons";

export default function HowMightWe({
  children,
  delay = 0.1,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-5">
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent-lime">
          <QuestionIcon className="text-accent-lime" />
        </div>
        <div>
          <span className="text-accent-lime font-body text-base tracking-widest uppercase">
            How might we
          </span>
          <p className="font-display text-secondary mt-2 text-2xl leading-snug font-bold lg:text-3xl">
            <span className="text-accent-lime">&hellip;</span>
            {children}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
