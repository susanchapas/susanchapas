import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import BackToProjects from "@/components/BackToProjects";
import ProjectHero from "@/components/ProjectHero";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import Tile from "@/components/Tile";
import Eyebrow from "@/components/Eyebrow";
import ProjectNavFooter from "@/components/ProjectNavFooter";
import HowMightWe from "@/components/HowMightWe";
import ResearchStats from "@/components/ResearchStats";
import InsightGrid from "@/components/InsightGrid";

const projectData = {
  title: "Sous Sense",
  subtitle: "Modular IoT Food Intelligence for the Modern Kitchen",
  description:
    "Sous Sense started as an entrepreneurship project at NJIT and became a fully developed product concept. The sensor kit retrofits into any fridge, freezer, or pantry and tells you what food you have, how fresh it is, and what to buy next. The project includes brand identity, package design, advertising, and a business plan with five-year financial projections.",
  tags: ["Brand Identity", "Package Design", "Business Strategy", "Advertising"],
  year: "2026",
  role: "Founder & Designer",
  type: "Academic Project",
};

const researchStats = [
  { value: "$161B", label: "Annual U.S. food waste losses" },
  { value: "$338B", label: "Projected smart home market by 2030" },
  { value: "3", label: "Competitor categories analyzed" },
];

const insights = [
  {
    title: "Food waste is massive, but solutions target awareness, not prevention.",
    body: "The U.S. loses $161 billion in food waste annually. Most interventions focus on consumer education or composting. Very few products intervene at the point of spoilage, where the loss actually happens.",
  },
  {
    title: "Smart fridges solve the right problem at the wrong price.",
    body: "Built-in sensors can track freshness and inventory, but smart refrigerators start at $2,500 and require replacing a working appliance. The technology is sound; the delivery model is not.",
  },
  {
    title: "Manual tracking apps fail because they depend on user discipline.",
    body: "Pantry tracking apps require users to log every item by hand. Compliance drops within weeks. Any solution that relies on manual entry is fighting human behavior.",
  },
  {
    title: "No existing product bridges IoT sensing with kitchen-specific intelligence.",
    body: "General-purpose IoT platforms offer connectivity but no domain knowledge. They can tell you a sensor fired, but not that your produce drawer is two days from spoilage.",
  },
  {
    title: "Recurring revenue matters as much as the hardware.",
    body: "Hardware margins are healthy but capped. The subscription layer, where software interprets sensor data into actionable alerts, carries 85%+ margins and grows with the installed base.",
  },
];

const resultMetrics = [
  { value: "$4.4M", label: "Projected Year 5 revenue" },
  { value: "72.3%", label: "Gross margin by Year 5" },
  { value: "88.5%", label: "Software subscription margin" },
  { value: "Year 2", label: "Projected profitability" },
];

const posters = [
  {
    src: "/gallery/sous-sense-posters-01.png",
    alt: "Sous Sense advertising poster, design 1",
  },
  {
    src: "/gallery/sous-sense-posters-02.png",
    alt: "Sous Sense advertising poster, design 2",
  },
];

const atAGlance = [
  { label: "My role", value: "Founder & Designer" },
  { label: "Team", value: "Solo" },
  { label: "Timeline", value: "Ongoing" },
  { label: "Disciplines", value: "Brand identity, package design, advertising, business strategy" },
];

const tools = ["Adobe Illustrator", "Procreate", "SCORE Financial Model", "Figma"];

export default function SousSenseProject() {
  return (
    <div className="">
      <ProjectHero src="/assets/projects/sous-sense/peppers.jpg" alt="Sous Sense brand cover">
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
              <span className="text-secondary/50 mb-1 block">Type</span>
              <span className="text-secondary font-medium">{projectData.type}</span>
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

      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-3 lg:px-12">
          <FadeIn className="lg:col-span-2">
            <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
              Overview
            </h2>
            <p className="font-body text-secondary/80 text-lg leading-relaxed">
              {projectData.description}
            </p>
          </FadeIn>

          <Tile
            delay={0.1}
            className="bg-accent-blue/5 border-accent-blue/10 rounded-2xl border p-6"
          >
            <h3 className="font-display text-secondary mb-5 text-sm tracking-widest uppercase">
              At a glance
            </h3>
            <dl className="space-y-4">
              {atAGlance.map((item) => (
                <div key={item.label}>
                  <dt className="text-secondary/50 text-xs tracking-wide uppercase">
                    {item.label}
                  </dt>
                  <dd className="font-body text-secondary mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Tile>
        </div>
      </section>

      <SectionTabs
        tabs={[
          {
            id: "challenge",
            label: "Challenge",
            content: (
              <section className="bg-accent-blue/5 py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                  <Reveal className="mb-12 max-w-3xl">
                    <Eyebrow>The Challenge</Eyebrow>
                    <p className="font-body text-secondary/80 text-lg leading-relaxed">
                      American households throw away about $1,500 worth of food
                      every year. Small restaurants lose even more, sometimes over
                      $100,000 annually from spoiled inventory. Smart refrigerators
                      have the right technology for this problem. The issue is
                      price: they start at $2,500, and you need to replace your
                      whole appliance to get one.
                    </p>
                    <p className="font-body text-secondary/80 mt-4 text-lg leading-relaxed">
                      The project scope covered the full product from concept to
                      investor presentation: brand identity, packaging for both
                      consumer and commercial kits, advertising posters, a 24-page
                      business plan with five-year projections, and a 16-slide
                      investor pitch deck.
                    </p>
                  </Reveal>

                  <HowMightWe>bring smart-fridge sensing technology to any kitchen without requiring a full appliance replacement?</HowMightWe>
                </div>
              </section>
            ),
          },
          {
            id: "research",
            label: "Research",
            content: (
              <>
                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>The Research</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Mapping the market landscape
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        Research started with the U.S. food waste landscape and
                        the smart home market. Three competitor categories were
                        analyzed: smart refrigerator manufacturers, manual pantry
                        tracking apps, and general-purpose IoT platforms. The goal
                        was to find where the gap sat between the technology that
                        exists and the price point that makes it accessible.
                      </p>
                    </Reveal>

                    <ResearchStats stats={researchStats} />
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-12 max-w-3xl">
                      <Eyebrow>Key Insights</Eyebrow>
                      <h2 className="font-display text-secondary text-2xl font-bold lg:text-3xl">
                        Five findings shaped the product strategy
                      </h2>
                    </Reveal>

                    <InsightGrid
                      items={insights}
                      thesis={
                        <>
                          The opportunity is a{" "}
                          <span className="text-accent-lime">retrofit sensor kit</span>{" "}
                          paired with{" "}
                          <span className="text-accent-lime">subscription software</span>{" "}
                          that turns any fridge into a smart one.
                        </>
                      }
                    />
                  </div>
                </section>

                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <Reveal className="mb-8 max-w-3xl">
                      <Eyebrow>Projected Outcome</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Financial model validation
                      </h2>
                    </Reveal>
                    <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
                      {resultMetrics.map((metric, index) => (
                        <FadeIn
                          key={metric.label}
                          direction="scale"
                          delay={index * 0.1}
                          className="bg-accent-blue/5 border-accent-blue/10 rounded-xl border p-6 text-center"
                        >
                          <div className="font-display text-accent-lime mb-2 text-3xl font-bold lg:text-4xl">
                            {metric.value}
                          </div>
                          <div className="font-body text-secondary/70 text-sm">
                            {metric.label}
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                    <Reveal>
                      <p className="font-body text-secondary/80 max-w-3xl text-lg leading-relaxed">
                        The financial model projects $200K in first-year revenue
                        growing to $4.4M by Year 5, with profitability beginning
                        in Year 2. Revenue comes from two sources: one-time
                        hardware sales that build the installed base, and recurring
                        SaaS subscriptions that grow with it. The subscription side
                        carries gross margins above 85%, creating stable,
                        predictable cash flow as the customer base expands.
                      </p>
                    </Reveal>
                  </div>
                </section>
              </>
            ),
          },
          {
            id: "design",
            label: "Design",
            content: (
              <>
                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <FadeIn className="max-w-3xl">
                      <Eyebrow>Branding</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Building the kitchen assistant brand
                      </h2>
                      <p className="font-body text-secondary/80 text-lg leading-relaxed">
                        The name comes from &ldquo;sous chef,&rdquo; the second-in-command
                        in a professional kitchen. The product works in the background,
                        keeping track of inventory and freshness so you can focus on
                        cooking. The wordmark uses a serif typeface with a chef&rsquo;s hat
                        woven into the letterform, and the visual identity uses warm tones
                        that suit a kitchen environment.
                      </p>
                    </FadeIn>
                  </div>
                </section>

                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <FadeIn>
                      <Eyebrow>Advertising</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Consumer launch posters
                      </h2>
                      <p className="font-body text-secondary/80 mb-10 max-w-3xl text-lg leading-relaxed">
                        These posters were designed for the consumer product launch. They
                        explain what the product does and why it&rsquo;s worth buying.
                      </p>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {posters.map((poster, index) => (
                          <FadeIn
                            key={poster.src}
                            delay={index * 0.15}
                            className="group relative overflow-hidden rounded-xl"
                          >
                            <Image
                              src={poster.src}
                              alt={poster.alt}
                              width={2550}
                              height={3300}
                              loading="lazy"
                              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(min-width: 768px) 50vw, 100vw"
                            />
                          </FadeIn>
                        ))}
                      </div>
                    </FadeIn>
                  </div>
                </section>

                <section className="bg-accent-blue/5 py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <FadeIn>
                      <Eyebrow>Revenue</Eyebrow>
                      <h2 className="font-display text-secondary mb-6 text-2xl font-bold lg:text-3xl">
                        Hardware plus subscription pricing
                      </h2>
                      <p className="font-body text-secondary/80 mb-8 max-w-3xl text-lg leading-relaxed">
                        The business model pairs one-time hardware sales with recurring
                        software subscriptions. The hardware is intentionally limited
                        without the app, so every kit sold becomes a subscriber.
                      </p>
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {[
                          {
                            label: "Consumer Kit",
                            price: "$149",
                            margin: "65.1% GM",
                            recurring: false,
                          },
                          {
                            label: "Consumer App",
                            price: "$12.99/mo",
                            margin: "88.5% GM",
                            recurring: true,
                          },
                          {
                            label: "Commercial Kit",
                            price: "$499",
                            margin: "66.9% GM",
                            recurring: false,
                          },
                          {
                            label: "Commercial App",
                            price: "$69.99/mo",
                            margin: "85.7% GM",
                            recurring: true,
                          },
                        ].map((product, index) => (
                          <FadeIn
                            key={product.label}
                            delay={index * 0.1}
                            className={`rounded-xl border p-6 ${
                              product.recurring
                                ? "border-accent-lime/20 bg-accent-lime/5"
                                : "border-accent-blue/10 bg-accent-blue/5"
                            }`}
                            style={{ "--ty": "20px" } as React.CSSProperties}
                          >
                            {product.recurring && (
                              <span className="text-accent-lime mb-2 block text-xs font-semibold tracking-widest uppercase">
                                Recurring
                              </span>
                            )}
                            <div className="font-display text-secondary mb-1 text-2xl font-bold">
                              {product.price}
                            </div>
                            <div className="font-body text-secondary/70 text-sm">
                              {product.label}
                            </div>
                            <div className="font-body text-secondary/50 mt-2 text-xs">
                              {product.margin}
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </FadeIn>
                  </div>
                </section>

                <section className="bg-primary py-16 lg:py-24">
                  <div className="container mx-auto px-6 lg:px-12">
                    <FadeIn>
                      <Eyebrow>Tools & Technologies</Eyebrow>
                      <h2 className="font-display text-secondary mb-8 text-2xl font-bold lg:text-3xl">
                        What I used
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {tools.map((tool, index) => (
                          <FadeIn
                            as="span"
                            key={tool}
                            direction="scale"
                            delay={index * 0.05}
                            className="bg-accent-blue/5 border-accent-blue/20 text-secondary font-body rounded-full border px-4 py-2 text-sm"
                          >
                            {tool}
                          </FadeIn>
                        ))}
                      </div>
                    </FadeIn>
                  </div>
                </section>
              </>
            ),
          },
        ]}
      />

      <ProjectNavFooter nextHref="/projects/chimera" />
    </div>
  );
}
