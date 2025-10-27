import React, { useContext, useEffect } from "react";
import { NavbarThemeContext } from "@/App";
import CultureTitleSection from "./sections/culture/CultureTitleSection";
import CultureFeatureSection from "./sections/culture/CultureFeatureSection";
import KeyAchievementSection from "./sections/culture/CultureRecruitSection";

const CultureValuePage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("dark");
    }
  }, [navbarContext]);

  return (
    <div className="bg-nsus-gray-100">
      <CultureTitleSection />
      <CultureFeatureSection />
      <KeyAchievementSection />
    </div>
  );
};

export default CultureValuePage;
