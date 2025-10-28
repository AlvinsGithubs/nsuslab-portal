import React, { useRef, useLayoutEffect, useContext, useEffect } from "react";
import { NavbarThemeContext } from "@/App";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HEADER_FIXED_HEIGHT } from "@/constants";

import GlobalSection from "@/pages/sections/about-us/GlobalSection";
import WhoWeAreTitleSection from "@/pages/sections/about-us/WhoWeAreTitleSection";
import CultureSection from "@/pages/sections/about-us/CultureSection";
import FeatureSection from "@/pages/sections/about-us/FeatureSection";
import FinancialInfoSection from "@/pages/sections/about-us/FinancialInfoSection";

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("dark");
    }
  }, [navbarContext]);

  const mainSectionRef = useRef<HTMLElement | null>(null);
  const componentRootRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (mainSectionRef.current) {
        mainSectionRef.current.style.marginTop = `-${HEADER_FIXED_HEIGHT}px`;
        mainSectionRef.current.style.paddingTop = `${HEADER_FIXED_HEIGHT}px`;
      }

      ScrollTrigger.refresh();

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, componentRootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRootRef} className="bg-black text-[#f3f4f6]">
      <WhoWeAreTitleSection ref={mainSectionRef} />
      <FeatureSection />
      <FinancialInfoSection />
      <GlobalSection />
      <CultureSection /> 
    </div>
  );
};

export default AboutUsPage;
