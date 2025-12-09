import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import SkillsTicker from "@/components/SkillsTicker";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider variant="wave" />
      <SelectedWork />
      <SkillsTicker />
    </>
  );
}
