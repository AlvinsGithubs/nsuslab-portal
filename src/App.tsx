import React, { useState, useEffect, createContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CareersPage from "@/pages/CareersPage";
import WhatWeDoPage from "@/pages/WhatWeDoPage";
import BenefitsPage from "@/pages/BenefitsPage";
import CultureValuePage from "@/pages/CultureValuePage";
import FaqPage from "@/pages/FaqPage";
import HistoryPage from "@/pages/HistoryPage";
import LoginPage from "@/pages/LoginPage";
import JobDetailPage from "@/pages/JobDetailPage";
import DepartmentDetailPage from "@/pages/DepartmentDetailPage";
import PeopleDetailPage from "@/pages/PeopleDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";
import NewsroomPage from "@/pages/NewsroomPage";
import BusinessUpdatesPage from "@/pages/BusinessUpdatesPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import AboutUsPage from "@/pages/AboutUsPage";
import ContactPage from "@/pages/ContactPage";
import RoadToNsusPage from "@/pages/RoadToNsusPage";
import OurStoryPage from "@/pages/OurStoryPage";
import FinancialInfoSection from "@/pages/sections/about-us/FinancialInfoSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GGVegasPage from "./pages/GGVegasPage";
import PlatformPage from "./pages/PlatformPage";
import GGPokerPage from "./pages/GGPokerPage";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// 1. Context에 담길 값의 타입을 정의하고 export 합니다.
export interface NavbarThemeContextType {
  navbarTheme: "light" | "dark";
  setNavbarTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

// 2. Context를 생성하고 export 합니다. AboutUsPage에서 이 값을 사용합니다.
export const NavbarThemeContext = createContext<NavbarThemeContextType | null>(
  null
);

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || "#/");

  // 3. Context를 통해 공유할 네비게이션 테마 상태를 생성합니다.
  const [navbarTheme, setNavbarTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      setRoute(hash);

      const elementId = hash.split("#").pop();
      if (elementId && document.getElementById(elementId)) {
        // Let the browser handle anchor scrolling
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

    if (page === "jobs" && slug) {
      return <JobDetailPage slug={slug} />;
    }
    if (page === "departments" && slug) {
      return <DepartmentDetailPage slug={slug} />;
    }
    if (page === "people" && slug) {
      return <PeopleDetailPage slug={slug} />;
    }
    if (page === "news" && slug) {
      return <NewsDetailPage slug={slug} />;
    }

    switch (`#/${page}`) {
      case "#/careers":
        return <CareersPage />;
      case "#/career": // CAREER 버튼용 새로운 라우트 추가
        return <HomePage />;
      case "#/road-to-nsus":
        return <RoadToNsusPage />;
      case "#/whatwedo":
        return <WhatWeDoPage />;
      case "#/ggpoker":
        return <GGPokerPage />;
      case "#/ggvegas":
        return <GGVegasPage />;
      case "#/platform":
        return <PlatformPage />;
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
      case "#/login":
        return <LoginPage />;
      case "#/news":
        return <NewsroomPage />;
      case "#/business-updates":
        return <BusinessUpdatesPage />;
      case "#/about":
        return <AboutUsPage />;
      case "#/":
        return <AboutUsPage />; // 기본 페이지를 AboutUsPage로 변경
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <LanguageProvider>
      {/* 4. 생성한 Context Provider로 앱을 감싸고, value를 전달합니다. */}
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
