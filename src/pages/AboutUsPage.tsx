import React, { useRef, useLayoutEffect, useContext, useEffect } from 'react';
import { NavbarThemeContext } from '@/App';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

import GlobalSection from '@/pages/sections/about-us/GlobalSection';
import WhoWeAreTitleSection from '@/pages/sections/about-us/WhoWeAreTitleSection';
import CultureSection from '@/pages/sections/about-us/CultureSection';
import KeyAchievementSection from '@/pages/sections/about-us/KeyAchievementSection';
import FeatureSection from '@/pages/sections/about-us/FeatureSection';
import { HEADER_FIXED_HEIGHT } from "@/constants";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const AboutUsPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        if (navbarContext) {
            navbarContext.setNavbarTheme("dark");
        }
    }, [navbarContext]);

    const mainSectionRef = useRef<HTMLElement | null>(null);
    const componentRootRef = useRef<HTMLDivElement | null>(null);
    const featureSectionRef = useRef<HTMLElement | null>(null);
    const globalSectionRef = useRef<HTMLElement | null>(null);

    const isScrolling = useRef(false);
    const scrollToSecondSection = () => {
        if (isScrolling.current || !featureSectionRef.current) return;
        isScrolling.current = true;
        const targetY = featureSectionRef.current.getBoundingClientRect().top + window.scrollY;
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetY },
            ease: "power2.inOut",
            onComplete: () => { isScrolling.current = false; }
        });
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const navHeight = HEADER_FIXED_HEIGHT;

            if (mainSectionRef.current) {
                mainSectionRef.current.style.marginTop = `-${navHeight}px`;
                mainSectionRef.current.style.paddingTop = `${navHeight}px`;
            }
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={componentRootRef} className='bg-black text-[#f3f4f6]'>
            <WhoWeAreTitleSection ref={mainSectionRef} onChevronClick={scrollToSecondSection} />
            <FeatureSection ref={featureSectionRef} />
            <KeyAchievementSection />
            <GlobalSection ref={globalSectionRef} />
            <CultureSection />
        </div>
    );
}

export default AboutUsPage;