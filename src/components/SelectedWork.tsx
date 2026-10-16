"use client";

import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const homeProjects = [
  "/projects/archlog",
  "/projects/sous-sense",
  "/projects/chimera",
].map((href) => projects.find((p) => p.href === href)!);

export default function SelectedWork() {
  return (
    <section
      className="bg-primary content-visibility-auto py-[5rem] lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2
          id="projects-heading"
          className="font-display text-secondary mb-6 text-4xl font-bold lg:text-5xl xl:text-6xl"
        >
          Projects
        </h2>
        <p className="font-body text-secondary/70 mb-10 max-w-2xl text-lg lg:mb-16">
          Research, full-stack development, and product work. I like being part of every
          step, from talking to people about their problems to building and shipping the
          fix, and honestly, all of it is a lot of fun to me.
        </p>
        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {homeProjects.map((project, index) => (
            <ProjectCard key={project.href} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
