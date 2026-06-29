import Image from "next/image";
import Banner from "./components/Banner";
import PublicLessonsPage from "./public-lessons/page";
import TopContributors from "./components/TopContributors";
import AddLesson from "./components/AddLesson";
import HowItWorks from "./components/Work";
import ExploreCategories from "./components/Expolore";


const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export default function Home() {
  return (
    <div>
      <Banner/>
      {/* <PublicLessonsPage/> */}
    <AddLesson/>
    <HowItWorks/>
    <ExploreCategories/>
      <TopContributors/>
    </div>
  );
}
