import Image from "next/image";
import Banner from "./components/Banner";
import PublicLessonsPage from "./public-lessons/page";

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export default function Home() {
  return (
    <div>
      <Banner/>
      <PublicLessonsPage/>
    </div>
  );
}
