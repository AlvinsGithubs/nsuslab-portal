import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { achievementData } from '@/lib/whoweareData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTilt } from '@/hooks/useTilt';

interface AchievementCardProps {
    title: string;
    description: string;
    subTitle: string;
    image: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, subTitle, image }) => {
    const tiltProps = useTilt();

    return (
        <div {...tiltProps} className="border-hsla achievement-card group relative rounded-xl shadow-lg overflow-hidden cursor-pointer lg:h-96">
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
                <h5 className="font-bold text-gray-200 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {description}
                </h5>
                <h4 className="mt-auto font-bold transition-opacity duration-300 group-hover:opacity-0 text-white">
                    {title}
                </h4>
                <p className="transition-opacity duration-300 group-hover:opacity-0 text-gray-400">
                    {subTitle}
                </p>
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
        <section ref={sectionRef} className="w-full bg-black px-4 md:px-8 py-20 lg:py-40">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center lg:mb-12">
                    <h2 className="section-title text-white mb-4 lg:mb-8">{t('keyachivement_title')}</h2>
                    <h5 className="section-title text-gray-400 mx-auto max-w-screen-lg mb-12 font-bold whitespace-pre-line">
                        {t('keyachivement_desc')}
                    </h5>
                </div>

                <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-4">
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