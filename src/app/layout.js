const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navber";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Lesson Vault — Real-World Wisdom & Life Lessons",
  description: "Explore, share, and discover impactful real-world life lessons on career, relationships, personal growth, leadership, and more.",
  keywords: "life lessons, wisdom, career advice, personal growth, leadership, mentor insights",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
