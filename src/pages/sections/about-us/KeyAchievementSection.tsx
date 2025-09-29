import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { achievementData } from '@/lib/whoweareData';
import { useLanguage } from '@/contexts/LanguageContext';

interface AchievementCardProps {
    title: string;
    description: string;
    subTitle: string;
    image: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, subTitle, image }) => {
    return (
        <div className="achievement-card group relative rounded-2xl shadow-lg overflow-hidden cursor-pointer h-96">
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:blur-md"
            />
            <div
                className="absolute inset-0 bg-black opacity-20 transition-opacity duration-500 ease-in-out group-hover:opacity-70"
                aria-hidden="true"
            ></div>
            <div className="relative flex flex-col h-full p-6 lg:p-8">
                <p className="text-gray-200 text-xl md:text-2xl font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {description}
                </p>
                <h3 className="mt-auto text-2xl lg:text-3xl font-bold transition-opacity duration-300 group-hover:opacity-0 text-white">
                    {title}
                </h3>
                <h3 className="text-lg lg:text-xl transition-opacity duration-300 group-hover:opacity-0 text-gray-400">
                    {subTitle}
                </h3>
            </div>
        </div>
    );
};

const KeyAchievementSection: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current!.querySelectorAll('.section-title'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            gsap.fromTo('.achievement-card',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.card-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="lg:min-h-screen w-full bg-black px-4 md:px-12 py-20">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="md:text-left mb-12">
                    <h2 className="section-title text-3xl font-bold text-white lg:text-5xl">{t('keyachivement_title')}</h2>
                    <p className="section-title mt-4 text-gray-400 lg:text-2xl font-bold whitespace-pre-line">
                        {t('keyachivement_desc')}
                    </p>
                </div>

                <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
                    {achievementData.map((data, index) => (
                        <AchievementCard
                            key={index}
                            title={data.title}
                            subTitle={data.subTitle}
                            description={data.description}
                            image={data.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyAchievementSection;