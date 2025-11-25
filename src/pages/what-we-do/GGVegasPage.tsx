import React, { useEffect, useLayoutEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { NavbarThemeContext } from "@/App";

import GGVegasTitleSection from "./sections/ggvegas/GGVegasTitleSection";
import GGVegasFeatureSection from "./sections/ggvegas/GGVegasFeatureSection";
import CPFeatureSection from "./sections/ggvegas/CPFeatureSection";

gsap.registerPlugin(ScrollTrigger);

const GGVegasPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    navbarContext?.setNavbarTheme("dark");
  }, [navbarContext]);

  const titleSectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (titleSectionRef.current) {
    }
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-black text-[#f3f4f6]">
      <GGVegasTitleSection ref={titleSectionRef} />
      <GGVegasFeatureSection />
      <CPFeatureSection />
    </div>
  );
};

export default GGVegasPage;
