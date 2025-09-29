import React, { useEffect, useState, forwardRef, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

import { fetchAllGlobalLicenses } from '@/lib/contentful';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GlobalLicense } from '@/types';

interface PartnershipCardProps {
    imgSrc: string;
    text: string;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({ imgSrc, text }) => {
    return (
        <div className="group relative w-full aspect-[16/22] rounded-2xl overflow-hidden shadow-md">
            <img
                src={imgSrc}
                alt={text}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-end p-6 md:p-8">
                <p className="text-white text-xl md:text-3xl font-semibold max-w-[80%]">
                    {text}
                </p>
            </div>
        </div>
    );
};

const GlobalSection = forwardRef<HTMLElement, {}>((_props, ref) => {
    const { t } = useLanguage();
    const [licenses, setLicenses] = useState<GlobalLicense[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cardWidth, setCardWidth] = useState(0);
    const [carouselWidth, setCarouselWidth] = useState(0);
    const carouselContainerRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const getLicenses = async () => {
            try {
                const data = await fetchAllGlobalLicenses();
                setLicenses(data);
            } catch (error) {
                console.error("Error fetching global licenses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getLicenses();
    }, []);

    useLayoutEffect(() => {
        if (!ref || !(ref as React.RefObject<HTMLElement>).current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(".animated-item",
                { opacity: 0, y: 80 },
                {
                    opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: {
                        trigger: (ref as React.RefObject<HTMLElement>).current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, ref as React.RefObject<HTMLElement>);
        return () => ctx.revert();
    }, [ref]);

    useEffect(() => {
        const calculateSizes = () => {
            if (carouselContainerRef.current && licenses.length > 0) {
                const containerWidth = carouselContainerRef.current.offsetWidth;
                const isDesktop = window.innerWidth >= 768;
                const gap = isDesktop ? 32 : 20;
                
                const newCardWidth = isDesktop ? containerWidth / 4.5 : containerWidth * 0.5;
                setCardWidth(newCardWidth);

                const totalWidth = (licenses.length * 2 * newCardWidth) + ((licenses.length * 2) * gap);
                setCarouselWidth(totalWidth);
            }
        };
        
        if (!isLoading) {
            calculateSizes();
        }
        window.addEventListener('resize', calculateSizes);
        return () => window.removeEventListener('resize', calculateSizes);
    }, [isLoading, licenses]);

    return (
        <section ref={ref} className="w-full bg-white py-20 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                <div className="md:text-left mb-12">
                    <h2 className="animated-item text-3xl font-bold text-black lg:text-5xl">{t('global_title')}</h2>
                    <p className="animated-item mt-4 text-gray-400 lg:text-2xl font-bold whitespace-pre-line">
                        {t('global_desc')}
                    </p>
                </div>
            </div>

            <div
                ref={carouselContainerRef}
                className="animated-item max-w-[1600px] mx-auto px-8 md:px-16"
            >
                <motion.div
                    className="flex items-center gap-5 md:gap-8"
                    style={{
                        width: carouselWidth,
                        animationName: 'marquee',
                        animationDuration: `${licenses.length * 5}s`,
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        animationPlayState: isHovered ? 'paused' : 'running',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isLoading ? (
                        <div className='w-full text-center py-10'><p>Loading licenses...</p></div>
                    ) : (
                        [...licenses, ...licenses].map((card, index) => (
                            <div
                                key={`${card.id}-${index}`}
                                style={{ width: cardWidth, flexShrink: 0 }}
                                className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                            >
                                <PartnershipCard
                                    imgSrc={card.imageUrl}
                                    text={card.text}
                                />
                            </div>
                        ))
                    )}
                </motion.div>
            </div>
        </section>
    );
});

export default GlobalSection;