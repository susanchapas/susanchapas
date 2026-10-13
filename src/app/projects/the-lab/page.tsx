import FadeIn from "@/components/FadeIn";
import LabNotebook from "@/components/LabNotebook";
import BackToProjects from "@/components/BackToProjects";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The Lab",
  description: "Side projects and early concepts that are still in development.",
});

const lab = projects.filter((p) => p.lab);

export default function LabPage() {
  return (
    <section
      className="gradient-mesh relative min-h-screen overflow-hidden py-20 lg:py-32"
      aria-labelledby="lab-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgb(187 205 243 / 0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative container mx-auto px-6 lg:px-12">
        <FadeIn trigger="mount" className="mb-20 lg:mb-28">
          <BackToProjects />
          <h1
            id="lab-heading"
            className="font-display text-secondary mb-4 text-4xl font-bold lg:text-5xl xl:text-6xl"
          >
            The Lab
          </h1>
          <p className="font-body text-secondary/70 max-w-xl text-lg">
            Side projects and early concepts that are still in development.
          </p>
        </FadeIn>
        <LabNotebook projects={lab} />
      </div>
    </section>
  );
}
