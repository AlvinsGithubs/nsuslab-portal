import React, { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

import video from "@/asset/videos/whatweDoVideo3.mp4";
import { useLanguage } from '@/contexts/LanguageContext';

interface WhatWeDoTitleSectionProps {
  onChevronClick: () => void;
}

const WhatWeDoTitleSection = React.forwardRef<HTMLElement, WhatWeDoTitleSectionProps>(({ onChevronClick }, ref) => {
    const { t } = useLanguage();
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".main-title",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
            );
        }, ref as React.RefObject<HTMLElement>);
        return () => ctx.revert();
    }, []); 

    return (
        <section ref={ref} className="!h-[110svh] w-full flex flex-col items-center justify-center overflow-hidden relative">
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={video} type="video/mp4" />
            </video>
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                <div className="main-title section-head text-center max-w-6xl px-4 text-white whitespace-pre-line">
                    {t('whatwedo_title')}
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

export default WhatWeDoTitleSection;