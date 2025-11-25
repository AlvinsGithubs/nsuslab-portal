import React, { useEffect, useLayoutEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { NavbarThemeContext } from "@/App";
import { HEADER_FIXED_HEIGHT } from "@/constants";

import GGPokerSection from "./sections/ggpoker/GGPokerSection";
import GGPokerCardSection from "./sections/ggpoker/GGPokerCardSection";
import ClubGGFeatureSection from "./sections/ggpoker/ClubGGFeatureSection";

gsap.registerPlugin(ScrollTrigger);

const GGPokerPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    navbarContext?.setNavbarTheme("dark");
  }, [navbarContext]);

  const titleSectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const navHeight = HEADER_FIXED_HEIGHT;
    if (titleSectionRef.current) {
      titleSectionRef.current.style.marginTop = `-${navHeight}px`;
      titleSectionRef.current.style.paddingTop = `${navHeight}px`;
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-black text-[#f3f4f6]">
      <GGPokerSection />
      <GGPokerCardSection />
      <ClubGGFeatureSection />
    </div>
  );
};

export default GGPokerPage;
