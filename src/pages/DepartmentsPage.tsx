import React, { useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { NavbarThemeContext } from '@/App';
import { HEADER_FIXED_HEIGHT } from '@/constants';

import WhatWeDoTitleSection from './sections/what-we-do/WhatWeDoTitleSection';
import GGVegasTitleSection from './sections/what-we-do/GGVegasTitleSection';
import GameFeatureSection from './sections/what-we-do/GGPokerFeatureSection';
import GGVegasFeatureSection from './sections/what-we-do/GGVegasFeatureSection';
import ClubGGFeatureSection from './sections/what-we-do/ClubGGFeatureSection';
import CPFeatureSection from './sections/what-we-do/CPFeatureSection';
import PlusFeatureSection from './sections/what-we-do/PlusFeatureSection';
import WSOPSection from './sections/what-we-do/WSOPSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const DepartmentsPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        navbarContext?.setNavbarTheme("dark");
    }, [navbarContext]);

    const titleSectionRef = useRef<HTMLElement | null>(null);
    const ggSectionRef = useRef<HTMLElement | null>(null);

    const scrollToSecondSection = () => {
        const target = ggSectionRef.current;
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target },
                ease: "power2.inOut",
            });
        }
    };

    useLayoutEffect(() => {
        const navHeight = HEADER_FIXED_HEIGHT;
        if (titleSectionRef.current) {
            titleSectionRef.current.style.marginTop = `-${navHeight}px`;
            titleSectionRef.current.style.paddingTop = `${navHeight}px`;
        }

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='bg-black text-[#f3f4f6]'>
            <WhatWeDoTitleSection ref={titleSectionRef} onChevronClick={scrollToSecondSection} />
            <GameFeatureSection />
            <GGVegasTitleSection />
            <GGVegasFeatureSection />
            <ClubGGFeatureSection />
            <CPFeatureSection />
            <PlusFeatureSection />
            <WSOPSection />
        </div>
    );
}

export default DepartmentsPage;