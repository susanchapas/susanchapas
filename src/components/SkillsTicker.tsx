"use client";

const skills = [
  "CRM Integration",
  "UX Research",
  "React Native",
  "Accessibility",
  "Branding",
  "English/Spanish Bilingual",
  "Figma",
  "Miro",
  "Marketing Campaigns",
  "Sales Strategy",
  "Event Planning & Coordination",
  "Full-Stack Engineering",
  "Lead Qualification",
  "Adobe Creative Cloud",
  "TypeScript",
  "Next.js",
  "User Testing",
  "Data Analysis",
];

export default function SkillsTicker() {
  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section
      className="bg-accent-blue/5 border-accent-blue/10 overflow-hidden border-y py-8"
      aria-label="Skills marquee"
    >
      {/* CSS-based animation - much more efficient than JS */}
      <div
        className="animate-marquee flex gap-8 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={`${skill}-${index}`} className="flex items-center gap-8">
            <span className="font-display text-secondary/80 hover:text-accent-lime text-lg transition-colors lg:text-xl">
              {skill}
            </span>
            <span className="text-accent-lime text-2xl" aria-hidden="true">
              •
            </span>
          </div>
        ))}
      </div>

      {/* Screen reader accessible list */}
      <div className="sr-only">
        <p id="skills-heading">Skills and Expertise</p>
        <ul aria-labelledby="skills-heading">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
