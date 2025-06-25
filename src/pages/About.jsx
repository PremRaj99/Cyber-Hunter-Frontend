import {
  HeroSection,
  AboutSection,
  MissionVisionSection,
  LeadershipSection,
  DomainsSection,
  ProjectsSection,
  CommunitySection
} from '../components/About';

export default function CyberhunterAbout() {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <LeadershipSection />
      <DomainsSection />
      <ProjectsSection />
      <CommunitySection />
      {/* <RoadmapSection />
      <FooterSection /> */}
    </div>
  );
}