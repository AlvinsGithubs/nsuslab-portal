import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

import cardImg2 from '@/asset/imgs/cardImg2.png';
import whoweare_iGaming from '@/asset/imgs/whoweare_iGaming.jpg';
import whoweare_culture3 from '@/asset/imgs/whoweare_culture3.png';

// 데이터 타입 정의
interface Culture {
    id: number;
    image: string;
    title: string;
    description: string;
    linkTo: string;
    linkText: string;
}

const sectionTitle = {
    line1: "상상 그 이상의 즐거움",
    line2: "NSUSLAB이 여러분을 기다립니다",
};

const cultureData: Culture[] = [
    // ... (이전 jsx 파일과 동일한 데이터 내용)
    {
        id: 1,
        image: whoweare_iGaming,
        title: "도전과 성장의 기회",
        description: "실시간 글로벌 서비스를 운영한다는 것은 도전적인 과제입니다. 그리고 그 도전을 함께 할 수 있는 다양한 역량을 가진 엔지니어와 함께 서로의 경험과 지식을 공유하며 성장합니다.",
        linkTo: "/departments",
        linkText: "What We Do",
    },
    {
        id: 2,
        image: cardImg2,
        title: "자유롭고 수평적인 문화",
        description: "자유롭고 수평적인 업무 환경과 직원 간 유대를 중시하며 어떠한 이슈라도 의견을 제시하고 정당한 피드백을 받을 수 있는 앤서스만의 기업 문화를 만들어가고 있습니다.",
        linkTo: "/culture",
        linkText: "NSUS Culture",
    },
    {
        id: 3,
        image: whoweare_culture3,
        title: "최고의 보상과 근무 환경",
        description: "폭발적인 성장세와 매출을 기반으로 업계 평균을 상회하는 보상을 제공하여 구성원의 안정적인 생활을 보장하고, 업무에 몰입할 수 있는 최적의 업무 환경을 제공합니다.",
        linkTo: "/financial-info",
        linkText: "Financial Info",
    }
];

const CultureSection: React.FC = () => {
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
        <section ref={sectionRef} className="w-full bg-white py-20 px-4 md:px-12 text-black">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="text-leading md:text-left mb-12 px-4 md:px-8">
                    <h2 className="animated-item text-3xl font-bold text-black lg:text-5xl">
                        {sectionTitle.line1}<br />{sectionTitle.line2}
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