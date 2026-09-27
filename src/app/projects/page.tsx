import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectIndex from "@/components/ProjectIndex";
import { projects } from "@/lib/projects";
import { ArrowRightIcon } from "@/components/Icons";

const ready = projects.filter((p) => !p.inactive);
const inProgress = projects.filter((p) => p.inactive);

export default function ProjectsPage() {
  const header = (
    <>
      <h1 className="font-display text-secondary mb-4 text-4xl font-bold lg:text-5xl xl:text-6xl">
        Projects
      </h1>
      <p className="font-body text-secondary/70 mb-8 max-w-xl text-lg lg:mb-10">
        Case studies from my work in UX research, product design, and branding. Each one
        covers the problem, the research behind it, and the design decisions that
        followed.
      </p>
    </>
  );

  return (
    <div className="">
      <section className="bg-primary py-16 lg:py-[5.5rem]" aria-label="Project list">
        <FadeIn trigger="mount" className="container mx-auto px-6 lg:px-12">
          <div className="hidden lg:block">
            <ProjectIndex projects={ready}>{header}</ProjectIndex>
          </div>
          <div className="lg:hidden">
            {header}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {ready.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section
        className="bg-accent-blue/5 py-16 lg:py-24"
        aria-labelledby="in-progress-heading"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <h2
              id="in-progress-heading"
              className="font-display text-secondary mb-3 text-3xl font-bold lg:text-4xl"
            >
              Currently Working On
            </h2>
            <p className="font-body text-secondary/70 mb-10 max-w-xl text-lg">
              These projects are in progress. Case studies will follow.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center lg:px-12">
          <FadeIn>
            <h2 className="font-display text-secondary mb-6 text-3xl font-bold lg:text-4xl">
              Have a project in mind?
            </h2>
            <p className="font-body text-secondary/70 mx-auto mb-8 max-w-xl text-lg">
              I like working on new problems. If you have a project, I&apos;d like to hear
              about it.
            </p>
            <Link
              href="/contact"
              className="bg-accent-lime text-primary font-display hover:bg-accent-lime/90 inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-colors"
            >
              Start a Conversation
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
