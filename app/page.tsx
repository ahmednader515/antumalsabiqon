import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CharactersSection } from "@/components/sections/CharactersSection";
import { HowToPlaySection } from "@/components/sections/HowToPlaySection";
import { NewsSection } from "@/components/sections/NewsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CharactersSection />
      <HowToPlaySection />
      <NewsSection />
    </>
  );
}
