import AccessibleButton from "@/components/AccessibleButton";
import { ArrowRightIcon } from "@/components/Icons";
import { projects } from "@/lib/projects";

export default function ProjectNavFooter({
  nextHref,
  nextLabel = "Next Project",
}: {
  nextHref: string;
  nextLabel?: string;
}) {
  const nextProject = projects.find((p) => p.href === nextHref);

  return (
    <section className="bg-primary border-accent-blue/10 border-t py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <AccessibleButton href="/projects" variant="outline">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            All Projects
          </AccessibleButton>
          <div className="group relative">
            <AccessibleButton href={nextHref}>
              {nextLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </AccessibleButton>
            {nextProject?.title && (
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-secondary/90 px-3 py-1.5 text-sm text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {nextProject.title}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
