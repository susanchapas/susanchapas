import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import SectionDivider from "@/components/SectionDivider";
import ArtScroller from "@/components/ArtScroller";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider variant="wave" />
      <SelectedWork />
      <ArtScroller />
    </>
  );
}
