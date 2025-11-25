import React, { useState, useEffect, createContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareersPage from "@/pages/career/JobsPage";
import WhatWeDoPage from "@/pages/what-we-do/WhatWeDoPage";
import BenefitsPage from "@/pages/career/BenefitsPage";
import CultureValuePage from "@/pages/career/CultureValuePage";
import FaqPage from "@/pages/career/FaqPage";
import HistoryPage from "@/pages/about-us/HistoryPage";
import TeamsDetailPage from "@/pages/career/TeamsDetailPage";
import LifeDetailPage from "@/pages/career/LifeDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";
import BusinessUpdatesPage from "@/pages/newsroom/BusinessUpdatesPage";
import NewsDetailPage from "@/pages/newsroom/NewsDetailPage";
import AboutUsPage from "@/pages/about-us/AboutUsPage";
import ContactPage from "@/pages/about-us/ContactPage";
import RoadToNsusPage from "@/pages/career/RoadToNsusPage";
import OurStoryPage from "@/pages/career/OurStoryPage";
import FinancialInfoSection from "@/pages/about-us/sections/FinancialInfoSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import GGVegasPage from "./pages/what-we-do/GGVegasPage";
import WSOPPage from "./pages/what-we-do/WSOPPage";
import GGPokerPage from "./pages/what-we-do/GGPokerPage";
import PressReleasePage from "./pages/newsroom/PressReleasePage";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export interface NavbarThemeContextType {
  navbarTheme: "light" | "dark";
  setNavbarTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const NavbarThemeContext = createContext<NavbarThemeContextType | null>(
  null
);

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || "#/");
  const [navbarTheme, setNavbarTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      setRoute(hash);

      const elementId = hash.split("#").pop();
      if (elementId && document.getElementById(elementId)) {
      } else {
        window.scrollTo(0, 0);
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderPage = () => {
    const path = route.startsWith("#/") ? route.substring(2) : "";
    const parts = path.split("/");
    const page = parts[0].split("#")[0]; // Handle anchor links
    const slug = parts[1];

    if (page === "departments" && slug) {
      return <TeamsDetailPage slug={slug} />;
    }
    if (page === "people" && slug) {
      return <LifeDetailPage slug={slug} />;
    }
    if (page === "news" && slug) {
      return <NewsDetailPage slug={slug} />;
    }

    switch (`#/${page}`) {
      case "#/careers":
        return <CareersPage />;
      case "#/road-to-nsus":
        return <RoadToNsusPage />;
      case "#/whatwedo":
        return <WhatWeDoPage />;
      case "#/ggpoker":
        return <GGPokerPage />;
      case "#/ggvegas":
        return <GGVegasPage />;
      case "#/wsop":
        return <WSOPPage />;
      case "#/departments":
        return <OurStoryPage />;
      case "#/benefits":
        return <BenefitsPage />;
      case "#/financial-info":
        return <FinancialInfoSection />;
      case "#/culture":
        return <CultureValuePage />;
      case "#/history":
        return <HistoryPage />;
      case "#/contact":
        return <ContactPage />;
      case "#/faq":
        return <FaqPage />;
      case "#/news":
        return <PressReleasePage />;
      case "#/business-updates":
        return <BusinessUpdatesPage />;
      case "#/about":
        return <AboutUsPage />;
      case "#/":
        return <AboutUsPage />; // 기본 페이지
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <LanguageProvider>
      <NavbarThemeContext.Provider value={{ navbarTheme, setNavbarTheme }}>
        <div className="bg-white min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-grow">{renderPage()}</main>
          <Footer />
        </div>
      </NavbarThemeContext.Provider>
    </LanguageProvider>
  );
};

export default App;
