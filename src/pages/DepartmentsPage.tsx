import React, { useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { NavbarThemeContext } from '@/App';
import { HEADER_FIXED_HEIGHT } from '@/constants';

import whatwedoVideo from "@/asset/videos/whatwedo-1.mp4";
import GGVegasTitleSection from './sections/what-we-do/GGVegasTitleSection';
import GameFeatureSection from './sections/what-we-do/GGPokerFeatureSection';
import GGVegasFeatureSection from './sections/what-we-do/GGVegasFeatureSection';
import ClubGGFeatureSection from './sections/what-we-do/ClubGGFeatureSection';
import CPFeatureSection from './sections/what-we-do/CPFeatureSection';
import PlusFeatureSection from './sections/what-we-do/PlusFeatureSection';
import WSOPSection from './sections/what-we-do/WSOPSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface WhatWeDoTitleSectionProps {
  onChevronClick: () => void;
}
const WhatWeDoTitleSection = React.forwardRef<HTMLElement, WhatWeDoTitleSectionProps>(({ onChevronClick }, ref) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".main-title",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
            );
        }, ref as React.RefObject<HTMLElement>);
        return () => ctx.revert();
    }, [ref]);

        return (
        <section ref={ref} className="!h-[110svh] w-full flex flex-col items-center justify-center overflow-hidden relative">
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={whatwedoVideo} type="video/mp4" />
            </video>
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                <div className="main-title text-5xl md:text-6xl lg:text-7xl font-bold text-center max-w-6xl px-4 leading-normal md:leading-relaxed text-white">
                    Global No. 1 <br /> iGaming Company
                </div>
            </div>
            <div onClick={onChevronClick} className="scroll-chevron absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10">
                <div className="w-10 h-10 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
        </section>
    );
});

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