import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { cultureData } from '@/lib/whoweareData';
import { useLanguage } from '@/contexts/LanguageContext';

const CultureSection: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".animated-item",
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-20 md:px-12 text-black">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="text-leading md:text-left mb-12 px-4 md:px-8">
                    <h2 className="animated-item text-3xl font-bold text-black lg:text-5xl whitespace-pre-line">
                        {t('culture_title')}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
                    {cultureData.map((card) => (
                        <div key={card.id} className="animated-item flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-200">
                            <div className="w-full aspect-square">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">
                                    {card.description}
                                </p>
                                <a href={`#${card.linkTo}`} className="group inline-flex items-center pt-4">
                                    <span className="hover-line-effect text-black font-bold">{card.linkText}</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CultureSection;