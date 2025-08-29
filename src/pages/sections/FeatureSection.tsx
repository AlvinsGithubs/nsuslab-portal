import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import s1Img from '@/asset/imgs/s1Img.jpg';
import s2Img from '@/asset/imgs/s2Img.jpg';
import whoweare_b from '@/asset/imgs/whoweare_b.jpg';
import whoweare_miro from '@/asset/imgs/whoweare_miro.jpg';

// 데이터 타입 정의
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
    // ... (이전 jsx 파일과 동일한 데이터 내용)
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
    const imageRefs = useRef<HTMLImageElement[]>([]);
    const mobileImageRefs = useRef<HTMLDivElement[]>([]);
    const textSectionRefs = useRef<HTMLDivElement[]>([]);
    
    const addToImageRefs = (el: HTMLImageElement | null) => {
        if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el);
    };
    const addToMobileImageRefs = (el: HTMLDivElement | null) => {
        if (el && !mobileImageRefs.current.includes(el)) mobileImageRefs.current.push(el);
    };
    const addToTextSectionRefs = (el: HTMLDivElement | null) => {
        if (el && !textSectionRefs.current.includes(el)) textSectionRefs.current.push(el);
    };
    
    const handleNavClick = (index: number) => {
        const targetSection = textSectionRefs.current[index];
        if (targetSection) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: targetSection, offsetY: window.innerHeight / 4 },
                ease: "power3.inOut"
            });
        }
    };
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.matchMedia({
                "(min-width: 1024px)": function () {
                    const sectionEl = (ref as React.RefObject<HTMLElement>).current;
                    const images = imageRefs.current;

                    gsap.set(images, { autoAlpha: 0 });
                    gsap.set(images[0], { autoAlpha: 1 });

                    textSectionRefs.current.forEach((textSection, index) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: textSection,
                                start: "top 50%",
                                end: "bottom 50%",
                                toggleActions: "play none none reverse",
                                onEnter: () => setActiveIndex(index),
                                onEnterBack: () => setActiveIndex(index),
                            },
                        })
                        .to(images, { autoAlpha: 0, duration: 0.2, ease: "power2.inOut"}, 0)
                        .to(images[index], { autoAlpha: 1, duration: 0.2, ease: "power2.inOut"}, 0)
                        .to(sectionEl, { backgroundColor: featureData[index].bgColor, duration: 0.2, ease: "power2.inOut" }, 0)
                        .to(textSection.querySelectorAll('.primary-text'), { color: featureData[index].primaryTextColor, duration: 0.2, ease: "power2.inOut" }, 0)
                        .to(textSection.querySelectorAll('.secondary-text'), { color: featureData[index].secondaryTextColor, duration: 0.2, ease: "power2.inOut" }, 0);
                    });
                }
            });

            mobileImageRefs.current.forEach((imgEl) => {
                gsap.fromTo(imgEl,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                        scrollTrigger: {
                            trigger: imgEl,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });

        }, ref as React.RefObject<HTMLElement>);
        return () => ctx.revert();
    }, [ref]);

    return (
        <section 
            ref={ref} 
            className="w-full transition-colors duration-500" 
            style={{ backgroundColor: featureData[activeIndex].bgColor }}
        >
            <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:gap-x-8 px-4">
                
                <div className="sticky top-0 hidden lg:flex flex-col justify-center h-screen px-4 whitespace-pre-line">
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold" style={{ color: featureData[activeIndex].primaryTextColor }}>
                            NSUS
                        </h1>
                        <nav>
                            <ul>
                                {featureData.map((feature, index) => (
                                    <li key={index} className="py-2">
                                        <button onClick={() => handleNavClick(index)} className="font-semibold text-lg transition-all duration-300" style={{ color: activeIndex === index ? featureData[activeIndex].primaryTextColor : featureData[activeIndex].secondaryTextColor, opacity: activeIndex === index ? 1 : 0.6 }}>
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
                        <div key={index} ref={addToTextSectionRefs} className="flex flex-col justify-center items-start lg:min-h-screen px-8 py-24 lg:py-0">
                            <div className="w-full max-w-lg">
                                <h2 className="primary-text text-3xl font-bold lg:text-4xl leading-tight whitespace-pre-line">{feature.heading} </h2>
                                <p className="secondary-text mt-6 text-lg lg:text-xl leading-relaxed whitespace-pre-line">{feature.description}</p>
                                {feature.listItems && feature.listItems.length > 0 && (
                                    <ul className="mt-6 space-y-3">
                                        {feature.listItems.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-center">
                                                <span className="primary-text text-xl font-semibold opacity-80">‣</span>
                                                <p className="primary-text ml-4 text-lg font-medium">{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div ref={addToMobileImageRefs} className="mt-12 w-full max-w-md mx-auto lg:hidden rounded-2xl overflow-hidden aspect-square object-cover object-right">
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
                                ref={addToImageRefs}
                                src={feature.imageSrc}
                                alt={feature.title}
                                className="absolute inset-0 h-full w-full object-cover object-right"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default FeatureSection;