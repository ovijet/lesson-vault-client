import Banner from "./components/Banner";
import AddLesson from "./components/AddLesson";
import HowItWorks from "./components/Work";
import ExploreCategories from "./components/Expolore";
import TopContributors from "./components/TopContributors";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQSection";
import CommunityNewsletter from "./components/CommunityNewsletter";

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <AddLesson />
      <HowItWorks />
      <ExploreCategories />
      <TopContributors />
      {/* New Section 1: Community Impact & Verified Reviews */}
      <Testimonials />
      {/* New Section 2: Interactive FAQ Accordion */}
      <FAQSection />
      {/* High Converting Community Newsletter Callout */}
      <CommunityNewsletter />
    </main>
  );
}
