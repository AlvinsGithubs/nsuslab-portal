import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import whoweare_ggpoker from '@/asset/imgs/about-us-Img/whoweare_ggpoker.webp';
import whoweare_globalnetwork from '@/asset/imgs/about-us-Img/whoweare_globalnetwork.jpg';
import whoweare_iso from '@/asset/imgs/about-us-Img/whoweare_iso.jpg';
import whoweare_wsop from '@/asset/imgs/about-us-Img/whoweare_wsop.jpg';

// 데이터 타입 정의
interface Achievement {
    title: string;
    subTitle: string;
    description: string;
    image: string;
}

const achievementData: Achievement[] = [
    // ... (이전 jsx 파일과 동일한 데이터 내용)
    {
        title: "Global No.1 Traffic - GGPoker",
        subTitle: "전 세계 포커 시장 점유율 1위",
        description: "NSUS Group의 GGPoker는 현재 기준 고객 유입률, Cash, Peak traffic 등 전반적인 모든 지표에서 압도적인 시장 점유율을 차지하고 있으며, 그 격차를 지속적으로 확대하고 있습니다.",
        image: whoweare_ggpoker
    },
    {
        title: "Expanding the market for iGaming",
        subTitle: "Global iGaming Industry 확장",
        description: "NSUS Group은 유럽, 미주, 아시아, 남미 등의 주요 국가와 우호적인 파트너십 관계를 바탕으로 새로운 시장을 지속적으로 개척하여 보다 많은 사람들에게 즐거운 서비스를 제공하려 노력하고 있습니다.",
        image: whoweare_globalnetwork
    },
    {
        title: "ISO Certified Company",
        subTitle: "세계 최고 수준의 정보 보안 관리",
        description: "NSUS Group은 BMM Testlabs 을 통해 제품의 안전성 및 공정성에 대한 인증을 받았습니다. 이를 통해 각 국가 별로 정해진 규정을 지키고 안정적인 제품과 서비스를 제공 하고 있습니다.",
        image: whoweare_iso
    },
    {
        title: "GGPoker & WSOP Partnership",
        subTitle: "세계 최대 규모의 포커 토너먼트 대회 운영사",
        description: "NSUS Group은 세계 최대 규모의 토너먼트 WSOP - World Series of Poker의 운영사로서 iGaming 산업 전반에서 지속적으로 영향력을 확대해 나가고 있습니다.",
        image: whoweare_wsop
    }
];

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
                    <h2 className="section-title text-3xl font-bold text-white lg:text-5xl">Key Achivements</h2>
                    <p className="section-title mt-4 text-gray-400 lg:text-2xl font-bold">
                        NSUSLAB은 글로벌 서비스를 하나의 데이터 생태계로 연결해 전 세계 수백만 플레이어에게 통합된 경험을 제공하고 있습니다.<br />
                        일일 약 10억 건의 트래픽을 단일 네트워크로 안정적으로 운영할 수 있는 역량을 갖추고 있으며,<br />
                        AI 기반 개발 도구와 빅데이터 기술을 누구나 실험하고 즉시 글로벌 서비스에 적용할 수 있는 혁신적 기술 환경을 구축하였습니다.<br />
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