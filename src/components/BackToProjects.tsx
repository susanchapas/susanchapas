import TransitionLink from "./TransitionLink";
import { ArrowRightIcon } from "@/components/Icons";

export default function BackToProjects() {
  return (
    <TransitionLink
      href="/projects"
      className="text-accent-lime font-body mb-6 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm transition-all hover:gap-4"
    >
      <ArrowRightIcon className="h-4 w-4 rotate-180" />
      Back to Projects
    </TransitionLink>
  );
}
