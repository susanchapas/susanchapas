import AboutStudioWall from "@/components/AboutStudioWall";
import AboutMobile from "@/components/AboutMobile";

export default function AboutPage() {
  return (
    <div className="bg-primary relative overflow-hidden">
      <section className="gradient-mesh relative hidden overflow-hidden lg:block lg:py-0">
        <AboutStudioWall />
      </section>
      <AboutMobile />
    </div>
  );
}
