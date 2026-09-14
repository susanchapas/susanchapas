import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { ArrowRightIcon } from "@/components/Icons";

export default function ProjectsPage() {
  return (
    <div className="">
      <section className="bg-primary py-16 lg:py-24" aria-label="Project list">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent-blue/5 py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center lg:px-12">
          <FadeIn>
            <h2 className="font-display text-secondary mb-6 text-3xl font-bold lg:text-4xl">
              Have a project in mind?
            </h2>
            <p className="font-body text-secondary/70 mx-auto mb-8 max-w-xl text-lg">
              I like working on new problems. If you have a project,
              I&apos;d like to hear about it.
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
