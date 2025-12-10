"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section
      className="bg-accent-blue/5 border-accent-blue/10 overflow-hidden border-y py-8"
      aria-label="Skills marquee"
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -50 * skills.length],
              }
        }
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
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
      </motion.div>

      {/* Screen reader accessible list */}
      <div className="sr-only">
        <h2>Skills</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
