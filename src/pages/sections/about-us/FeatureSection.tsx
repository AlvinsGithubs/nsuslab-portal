import { forwardRef, useEffect, useRef, useState } from 'react';

import s1Img from '@/asset/imgs/about-us-Img/s1Img.jpg';
import s2Img from '@/asset/imgs/about-us-Img/s2Img.jpg';
import whoweare_b from '@/asset/imgs/about-us-Img/whoweare_b.jpg';
import whoweare_miro from '@/asset/imgs/about-us-Img/whoweare_miro.jpg';

interface Feature {
    title: string;
    heading: string;
    description: string;
    listItems: string[];
    imageSrc: string;
    bgColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
}

const featureData: Feature[] = [
    {
        title: "Our Mission",
        heading: "iGaming을 통해\n세상을 연결합니다",
        description: "NSUS Group은 현재 북미, 유럽, 아시아 등 지역에 700명 이상의 임직원들이 일하고 있는 다국적 기업으로 iGaming 업계의 유니콘이며, NSUSLAB은 NSUS Group의 개발 스튜디오로서 그룹의 핵심적인 역할을 담당하고 있습니다.\n\n우리는 iGaming을 통해 세상을 연결하고자 합니다. 이를 통해 유저의 즐거움을 극대화 하는 것이 NSUSLAB이 지향하는 궁극적인 목표이자 존재의 이유입니다.",
        listItems: ["NSUS Group - Forefront of marketing and technology", "NSUSLAB - Development Studio"],
        imageSrc: s1Img,
        bgColor: '#111111',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "Our Vision",
        heading: "Global No.1\niGaming Company",
        description: "NSUSLAB은 그 누구도 감히 상상하지 못했던 Global No.1 Poker Game 이라는 성공 신화를 만든 노하우를 바탕으로 Casino 시장에서도 또 한 번 혁신적인 제품을 가지고 세계 최고가 되고자 합니다. \n\n이를 통해 iGaming Industry 전반에서 독보적인 리더로 자리매김할 것입니다.",
        listItems: ["GGPoker - Classic Games", "GGPoker - Tournament", "GGVegas - Table Games", "GGVegas - Slots","ClubGG","WSOP+" ],
        imageSrc: s2Img,
        bgColor: '#841e09',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "Our Value",
        heading: "새로운 차원의\n엔터테인먼트를 제공합니다",
        description: "NSUSLAB은 새로운 차원의 엔터테인먼트를 제공하여 \nGlobal iGaming Community의 리더가 되고자 합니다. \n\n명품을 만들기 위해서는 끊임없는 노력과 인내가 필요합니다. 이 도전이 쉽지 않은 것을 알기에 확신이 없는 프로젝트는 시작하지 않을 것이며, 한번 시작한 프로젝트는 명품이 될 때까지 지속적인 지원이 이루어 지도록 할 것입니다.",
        listItems: [],
        imageSrc: whoweare_b,
        bgColor: '#4f46e5',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffedd5',
    },
    {
        title: "We're Hiring",
        heading: "NSUSLAB의 위대한 도전을\n함께하실 분을 찾습니다.",
        description: "외부 투자에 의지하고 성공에 대한 막연한 희망으로 프로젝트를 진행하는 대부분의 게임 개발사와는 달리, NSUSLAB은 성공한 제품과 사업에 의한 안정적 매출을 기반으로 보다 큰 성공을 이루기 위해 달리고 있습니다. \n\n 우리는 단지 꿈만 꾸는 것이 아닌, 좋은 현실을 더 좋게 만들고자 합니다. 안정적인 개발 환경에서 세계 시장을 제패하기 위해 도전적 성장과 경험을 함께 할 좋은 인재들을 적극 영입하고 있습니다.",
        listItems: ["도전과 성장의 기회", "자유롭고 수평적인 문화", "최고의 보상과 근무 환경"],
        imageSrc: whoweare_miro,
        bgColor: '#111111',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    }
];


const FeatureSection = forwardRef<HTMLElement, {}>((props, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const textSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const textGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    const handleNavClick = (index: number) => {
        const targetSection = textSectionRefs.current[index];
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    
    useEffect(() => {
        const textSections = textSectionRefs.current.filter(Boolean) as HTMLDivElement[];
        const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
        const textGroups = textGroupRefs.current.filter(Boolean) as HTMLDivElement[];

        if (textSections.length === 0) return;

        let currentCenterIdx = -1;
        let ticking = false;

        const update = () => {
            const vh = window.innerHeight;
            // 텍스트 사라지는 시점 : fadeOutLine이 낮을수록 늦게 낮아짐
            const fadeOutLine = vh * 0.30; 
            const centerLine = vh * 0.50;
            const preInLine = vh * 3.0;

            let bestCenterIdx = -1;
            let minCenterDist = Infinity;

            textSections.forEach((section, i) => {
                const rect = section.getBoundingClientRect();
                const textGroup = textGroups[i];
                if (!textGroup) return;

                if (rect.top < preInLine && rect.bottom > 0) {
                    textGroup.classList.remove('enter', 'out');
                    textGroup.classList.add('in');
                } else if (rect.top >= preInLine) {
                    textGroup.classList.remove('in', 'out');
                    textGroup.classList.add('enter');
                }
                
                const midPoint = rect.top + rect.height / 2;
                if (i < textSections.length - 1 && midPoint < fadeOutLine) {
                    textGroup.classList.remove('in');
                    textGroup.classList.add('out');
                }

                const dist = Math.abs(midPoint - centerLine);
                if (dist < minCenterDist) {
                    minCenterDist = dist;
                    bestCenterIdx = i;
                }
            });

            if (bestCenterIdx !== currentCenterIdx) {
                setActiveIndex(bestCenterIdx);
                currentCenterIdx = bestCenterIdx;
            }
            
            let bestPeekIdx = -1;
            let minPeekDist = Infinity;
            textSections.forEach((section, i) => {
                if (i === currentCenterIdx) return;
                const rect = section.getBoundingClientRect();
                if (rect.top > centerLine) {
                    const dist = rect.top - centerLine;
                    if (dist < minPeekDist) {
                        minPeekDist = dist;
                        bestPeekIdx = i;
                    }
                }
            });

            images.forEach((img, i) => {
                img.classList.toggle('show', i === currentCenterIdx);
                if (i !== currentCenterIdx) {
                    img.classList.toggle('peek', i === bestPeekIdx);
                } else {
                    img.classList.remove('peek');
                }
            });
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        textGroups.forEach(tg => tg.classList.add('enter'));
        update();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <section 
            ref={ref} 
            className="w-full transition-colors duration-500 ease-in-out"
            style={{ backgroundColor: featureData[activeIndex]?.bgColor || featureData[0].bgColor }}
        >
            <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:gap-x-8">
                <div className="sticky top-0 hidden lg:flex flex-col justify-center h-screen px-4 whitespace-pre-line">
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold" style={{ color: featureData[activeIndex]?.primaryTextColor }}>NSUS</h1>
                        <nav>
                            <ul>
                                {featureData.map((feature, index) => (
                                    <li key={index} className="py-2">
                                        <button onClick={() => handleNavClick(index)} className="font-semibold text-lg transition-all duration-300" style={{ color: activeIndex === index ? featureData[activeIndex]?.primaryTextColor : featureData[activeIndex]?.secondaryTextColor, opacity: activeIndex === index ? 1 : 0.6 }}>
                                            {feature.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="w-full relative col-start-1 lg:col-start-2">
                    {featureData.map((feature, index) => (
                        <div key={index} ref={el => { if (el) textSectionRefs.current[index] = el; }} className="flex flex-col justify-center items-start lg:min-h-screen px-8 py-24 lg:py-0">
                            <div 
                                ref={el => { if (el) textGroupRefs.current[index] = el; }}
                                className={`
                                    w-full max-w-lg will-change-transform
                                    transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    [&.enter]:opacity-0 [&.enter]:translate-y-8
                                    [&.in]:opacity-100 [&.in]:translate-y-0
                                    [&.out]:opacity-0 [&.out]:-translate-y-6
                                `}
                            >
                                <h2 className="text-3xl font-bold lg:text-4xl leading-tight whitespace-pre-line" style={{ color: feature.primaryTextColor }}>{feature.heading}</h2>
                                <p className="mt-6 text-lg lg:text-xl leading-relaxed whitespace-pre-line" style={{ color: feature.secondaryTextColor }}>{feature.description}</p>
                                {feature.listItems && feature.listItems.length > 0 && (
                                    <ul className="mt-6 space-y-3">
                                        {feature.listItems.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-center">
                                                <span className="text-xl font-semibold opacity-80" style={{ color: feature.primaryTextColor }}>‣</span>
                                                <p className="ml-4 text-lg font-medium" style={{ color: feature.primaryTextColor }}>{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="mt-12 w-full max-w-md mx-auto lg:hidden rounded-2xl overflow-hidden aspect-square object-cover object-right">
                                <img src={feature.imageSrc} alt={feature.title} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="sticky top-0 hidden lg:flex items-center justify-center h-screen">
                    <div className="relative w-full h-auto max-w-2xl aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        {featureData.map((feature, index) => (
                            <img
                                key={index}
                                ref={el => { if (el) imageRefs.current[index] = el; }}
                                src={feature.imageSrc}
                                alt={feature.title}
                                className={`
                                    absolute inset-0 h-full w-full object-cover object-right
                                    transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    opacity-0 scale-105 z-10
                                    [&.show]:opacity-100 [&.show]:scale-100 [&.show]:z-20
                                    [&.peek]:opacity-45 [&.peek]:scale-102 [&.peek]:z-10
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default FeatureSection;
