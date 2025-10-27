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
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-12 lg:py-24 px-4 md:px-8 text-black">
            <div className="max-w-screen-2xl mx-auto">
                <h3 className="animated-item  text-black whitespace-pre-line text-center mb-12 lg:mb-24">
                    {t('culture_title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cultureData.map((card) => (
                        <div key={card.id} className="animated-item flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-200">
                            <div className="w-full md:aspect-square">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <p className="mb-4 font-bold">{card.title}</p>
                                <p className="text-gray-600 flex-grow">
                                    {card.description}
                                </p>
                                <a href={`#${card.linkTo}`} className="group inline-flex items-center pt-4">
                                    <p className="text-black font-bold group-hover:text-nsus-blue">{card.linkText}</p>
                                    <ArrowUpRight className="group-hover:text-nsus-blue"/>
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