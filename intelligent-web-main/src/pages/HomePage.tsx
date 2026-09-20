import { HeroSection } from "@/components/home/HeroSection";
import { CloudPlatformsStrip } from "@/components/home/CloudPlatformsStrip";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { CloudCapabilitiesSection } from "@/components/home/CloudCapabilitiesSection";
import { ServicesBentoSection } from "@/components/home/ServicesBentoSection";
import { CredibilitySection } from "@/components/home/CredibilitySection";
import { CtaBand } from "@/components/home/CtaBand";
import { CloudIntroExperience } from "@/components/home/CloudIntroExperience";

export function HomePage() {
  return (
    <>
      <CloudIntroExperience />
      <HeroSection />
      <CloudPlatformsStrip />
      <HomeIntroSection />
      <CloudCapabilitiesSection />
      <ServicesBentoSection />
      <CredibilitySection />
      <CtaBand />
    </>
  );
}
