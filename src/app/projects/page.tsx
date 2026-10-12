import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectIndex from "@/components/ProjectIndex";
import SkylineAscii from "@/components/SkylineAscii";
// import LabBeaker from "@/components/LabBeaker";
import { projects } from "@/lib/projects";
import { ArrowRightIcon } from "@/components/Icons";

const ready = projects.filter((p) => !p.inactive && !p.lab);
// const lab = projects.filter((p) => p.lab);

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
            <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2">
              {ready.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="bg-accent-blue/5 relative py-24 lg:py-32">
        <SkylineAscii />
        <div className="relative container mx-auto bg-[radial-gradient(ellipse_24rem_12rem_at_center,color-mix(in_srgb,var(--background)_65%,transparent),transparent)] px-6 text-center lg:px-12">
          <FadeIn>
            <h2 className="font-display text-secondary mb-6 text-3xl font-bold lg:text-4xl">
              Have a project in mind?
            </h2>
            <p className="font-body text-secondary/70 mx-auto mb-8 max-w-xl text-lg">
              I like working on new problems.
              <br />
              If you have a project, I&apos;d like to hear about it.
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
      {/* <div className="pointer-events-none sticky inset-x-0 bottom-[10px] z-40 mb-[10px] h-0 lg:fixed lg:bottom-[calc(var(--footer-h,0px)+10px)] lg:left-[var(--nav-width,220px)] landscape:fixed landscape:bottom-[calc(var(--footer-h,0px)+10px)]">
        <div className="container mx-auto flex h-0 items-end justify-end px-6 lg:px-12">
          <LabBeaker count={lab.length} />
        </div>
      </div> */}
    </div>
  );
}
