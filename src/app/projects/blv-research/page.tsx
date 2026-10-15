import FadeIn from "@/components/FadeIn";
import BackToProjects from "@/components/BackToProjects";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import Tile from "@/components/Tile";
import ImageSlot from "@/components/ImageSlot";
import ProjectSummary from "@/components/ProjectSummary";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import ResearchStats from "@/components/ResearchStats";
import FeatureGrid from "@/components/FeatureGrid";
import { pageMetadata } from "@/lib/metadata";

const B = "/assets/projects/BLV";

const projectData = {
  title: "BLV Smart Glasses Research",
  subtitle: "How blind and low-vision (BLV) people use AI smart glasses",
  description:
    "Consumer smart glasses now include AI assistants that describe scenes, read text, and answer questions about what the camera sees. Our team interviewed blind and low-vision owners of these glasses to learn where they help, where they fall short, and how people work around their limitations. This is a qualitative accessibility study at NJIT’s Community-Centered Accessibility Lab. I built and maintained the dataset our team analyzes from, and I helped turn it into a paper.",
  heroImage: `${B}/meta-coming-soon.webp`,
  tags: ["Accessibility", "UX Research", "Qualitative Analysis", "Publication"],
  year: "2026",
  role: "Accessibility Researcher",
  lab: "NJIT Community-Centered Accessibility Lab",
};

export const metadata = pageMetadata({
  title: projectData.title,
  description: projectData.subtitle,
  image: "/assets/projects/BLV/meta-coming-soon.webp",
});

const outcomes = [
  { label: "Publication", value: "Paper submitted to ACM CHI 2027" },
  { label: "Dataset", value: "2,146 coded evidence rows from 17 interviews" },
  { label: "Next", value: "Wizard of Oz prototype testing with BLV participants" },
];

const atAGlance = [
  { label: "My role", value: "Study design, data coding, and paper writing" },
  { label: "Team", value: "3 co-authors and a faculty advisor" },
  { label: "Timeline", value: "January 2026 to present" },
  { label: "Methods", value: "Interviews and thematic analysis" },
];

const questions = [
  {
    name: "Where do they help?",
    body: "What BLV owners use AI glasses for in daily life, and which tasks the glasses make easier.",
  },
  {
    name: "Where do they fall short?",
    body: "Which tasks the glasses fail at, and how much those failures affect the people who rely on them.",
  },
  {
    name: "How do people work around them?",
    body: "The strategies owners build to get useful results from the glasses when the AI alone is not enough.",
  },
];

const datasetStats = [
  { value: "2,146", label: "Coded evidence rows" },
  { value: "361", label: "Codes across 22 themes" },
  { value: "20", label: "Charts built on our data" },
];

const consistency = [
  {
    name: "Merging three coding methods",
    body: "Three of us first coded the same interviews in different ways. I compared the approaches side by side and proposed one merged scheme that kept a theme hierarchy, stable code IDs with verbatim quotes, and severity ratings. The team used it for every interview after that.",
  },
  {
    name: "Re-coding early interviews",
    body: "Interviews coded early had far fewer rows than later ones, because the codebook was still small at the start. I re-coded all 17 transcripts against the full codebook, which added 252 rows and left every earlier row in place.",
  },
];

const boards = [
  {
    name: "Affinity clusters",
    body: "The team grouped interview notes into themes on a shared FigJam board.",
    src: `${B}/blv-affinity-board.webp`,
    alt: "Blurred FigJam board of interview notes grouped into theme clusters",
  },
  {
    name: "Rubrics and matrices",
    body: "We added severity rubrics and comparison matrices to sort issues by how much they affect people.",
    src: `${B}/blv-rubrics-board.webp`,
    alt: "Blurred FigJam board with severity rubrics and comparison matrices",
  },
  {
    name: "My cross-check",
    body: "I compared the board against the coded workbook, listed what each was missing, and brought those items to the team.",
    src: `${B}/blv-workbook-crosscheck.webp`,
    alt: "Blurred view of the coded evidence workbook",
  },
];

const paperWork = [
  {
    name: "Framing",
    body: "I drafted options for the paper’s central argument and checked how much coded evidence supported each one. The team adopted the best-supported option.",
  },
  {
    name: "Writing",
    body: "I wrote two findings subsections, a discussion subsection, and the structure for our design implications, all in LaTeX.",
  },
  {
    name: "Audits",
    body: "I built workflows that track how often each author cites each participant, and I ran a privacy review of all 17 transcripts.",
  },
];

const prototyping = [
  {
    name: "Findings to features",
    body: "Each design idea in the prototype traces back to a pattern in our coded interview data. This keeps the prototype focused on problems participants told us about.",
  },
  {
    name: "Wizard of Oz prototype",
    body: "A team member plays the role of the AI and writes its responses live, while the participant uses the interface as if it were automated. We can test new interaction ideas before we commit to building the underlying system.",
  },
  {
    name: "Validation",
    body: "Our next step is testing the prototype with blind and low-vision participants. Their sessions will show us which ideas hold up in use and which need another round of design.",
  },
];

export default function BLVResearchProject() {
  return (
    <div className="">
      <ProjectHero src={projectData.heroImage} alt="">
        <FadeIn trigger="mount">
          <BackToProjects />

          <h1 className="font-display text-secondary mb-4 text-4xl font-bold lg:text-5xl xl:text-6xl">
            {projectData.title}
          </h1>
          <p className="font-body text-secondary/80 mb-8 max-w-2xl text-xl">
            {projectData.subtitle}
          </p>

          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-secondary/50 mb-1 block">Year</span>
              <span className="text-secondary font-medium">{projectData.year}</span>
            </div>
            <div>
              <span className="text-secondary/50 mb-1 block">Role</span>
              <span className="text-secondary font-medium">{projectData.role}</span>
            </div>
            <div>
              <span className="text-secondary/50 mb-1 block">Lab</span>
              <span className="text-secondary font-medium">{projectData.lab}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {projectData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent-blue/20 text-accent-blue rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </ProjectHero>

      <ProjectSummary
        overview={projectData.description}
        glance={atAGlance}
        outcomes={outcomes}
      />

      <SectionTabs
        tabs={[
          {
            id: "study",
            label: "Study",
            content: (
              <section className="bg-accent-blue/5 py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                  <Reveal className="mb-12 max-w-3xl">
                    <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                      17 interviews with BLV owners of AI glasses
                    </h2>
                    <p className="font-body text-secondary/80 text-lg leading-relaxed">
                      We ran semi-structured interviews with 17 blind and low-vision
                      people who own AI glasses, then used thematic analysis on our notes
                      and transcripts. Three co-authors worked on the project, with a
                      faculty advisor guiding the direction as we coded interviews and
                      interpreted findings. I helped design the study for IRB approval and
                      wrote the interview guide.
                    </p>
                  </Reveal>

                  <FeatureGrid features={questions} />
                </div>
              </section>
            ),
          },
          {
            id: "analysis",
            label: "Analysis",
            content: (
              <>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        I built the dataset our team analyzes from
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        I turned 17 interview transcripts into one structured Excel
                        workbook. Every row links a participant ID, a code, and a
                        transcript line number. I wrote Python scripts (pandas, openpyxl)
                        that check each quote against its transcript word for word and
                        recount every total before a new version goes to the team.
                      </p>
                    </Reveal>

                    <ResearchStats stats={datasetStats} />

                    <Reveal delay={0.1} className="mt-8">
                      <ImageSlot
                        src={`${B}/blv-evidence-chart.webp`}
                        alt="Bar chart of coded evidence rows per participant, P001 to P017"
                        ratio="aspect-[16/9]"
                        label="Coded evidence per participant"
                        sizes="(min-width: 1024px) 75vw, 100vw"
                        className="bg-white"
                      />
                    </Reveal>
                  </div>
                </section>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        I kept the data consistent as it grew
                      </h2>
                    </Reveal>

                    <FeatureGrid features={consistency} columns={2} />
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        We ran our thematic analysis in FigJam
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        The boards below are blurred because the data is confidential.
                      </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-3">
                      {boards.map((board, i) => (
                        <Tile
                          key={board.name}
                          delay={i * 0.08}
                          className="group bg-accent-blue/5 border-accent-blue/10 hover:border-accent-lime/40 h-full rounded-2xl border p-5 transition-colors"
                        >
                          <ImageSlot
                            src={board.src}
                            alt={board.alt}
                            ratio="aspect-[4/3]"
                            label={board.name}
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="mb-5 bg-white"
                          />
                          <h3 className="font-display text-accent-blue group-hover:text-accent-lime mb-3 text-lg font-bold transition-colors">
                            {board.name}
                          </h3>
                          <p className="font-body text-secondary/70 text-sm leading-relaxed">
                            {board.body}
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            ),
          },
          {
            id: "paper",
            label: "Paper",
            content: (
              <>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        I helped turn the data into a paper
                      </h2>
                    </Reveal>

                    <FeatureGrid features={paperWork} />
                  </div>
                </section>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Now, we&apos;re prototyping
                      </h2>
                    </Reveal>

                    <FeatureGrid features={prototyping} />
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      <section className="bg-accent-blue/5 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <Tile className="border-accent-lime/50 rounded-2xl border-2 p-6">
            <span className="text-accent-lime font-body text-xs tracking-widest uppercase">
              Findings coming soon
            </span>
            <p className="font-body text-secondary/80 mt-2 leading-relaxed">
              The study is unpublished and the data is confidential. Findings, quotes, and
              participant details will appear here after the paper is reviewed.
            </p>
          </Tile>
        </div>
      </section>

      <ProjectNavFooter nextHref="/projects/archlog" />
    </div>
  );
}
