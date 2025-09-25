import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { NavbarThemeContext } from '@/App';
import { HEADER_FIXED_HEIGHT } from '@/constants';

// --- Asset Imports ---
// ✅ 중요: 이 부분의 경로와 파일 이름은 실제 프로젝트의 파일 구조에 맞게 수정해야 합니다.

// Title Section Video
import whatwedoVideo from '@/asset/videos/whatwedo-1.mp4';

// Asset Imports - 에셋 폴더를 src/asset/imgs/what-we-do/ 와 같이 정리했다고 가정합니다.
// 실제 파일 경로에 맞게 이 부분을 수정해야 할 수 있습니다.
import ggpoker_logo from '@/asset/imgs/ggpoker_logo.webp';
import ggvegas_logo from '@/asset/imgs/ggvegas_logo.png';
import nsus_logo from '@/asset/imgs/nsus_logo.png';
import clubgg_logo from '@/asset/imgs/clubgg_logo.png';


// ggpoker slider images
import ggpoker_slid_1 from '@/asset/imgs/ggpoker_1.webp'; 
import ggpoker_slid_2 from '@/asset/imgs/ggpoker_2.webp'; 
import ggpoker_slid_3 from '@/asset/imgs/ggpoker_3.webp'; 
import ggpoker_slid_4 from '@/asset/imgs/ggpoker_4.webp'; 
import ggpoker_slid_5 from '@/asset/imgs/ggpoker_5.webp'; 
import ggpoker_slid_6 from '@/asset/imgs/ggpoker_6.webp'; 
import ggpoker_slid_7 from '@/asset/imgs/ggpoker_7.webp'; 

// slotImages slider images
import GGV_Slots_slid_1 from '@/asset/imgs/slotImg/slot1.png'; 
import GGV_Slots_slid_2 from '@/asset/imgs/slotImg/slot2.png'; 
import GGV_Slots_slid_3 from '@/asset/imgs/slotImg/slot3.png'; 
import GGV_Slots_slid_4 from '@/asset/imgs/slotImg/slot4.png'; 
import GGV_Slots_slid_5 from '@/asset/imgs/slotImg/slot5.png'; 
import GGV_Slots_slid_6 from '@/asset/imgs/slotImg/slot6.jpg'; 
import GGV_Slots_slid_8 from '@/asset/imgs/slotImg/slot8.png'; 
import GGV_Slots_slid_9 from '@/asset/imgs/slotImg/slot9.png'; 
import GGV_Slots_slid_10 from '@/asset/imgs/slotImg/slot10.png'; 

// GGV GamesImages slider images
import GGV_Games_slid_1 from '@/asset/imgs/tablegames/ggvt1.png'; 
import GGV_Games_slid_2 from '@/asset/imgs/tablegames/ggvt2.png'; 
import GGV_Games_slid_3 from '@/asset/imgs/tablegames/ggvt3.png'; 
import GGV_Games_slid_4 from '@/asset/imgs/tablegames/ggvt4.jpg'; 
import GGV_Games_slid_5 from '@/asset/imgs/tablegames/ggvt5.jpg'; 
import GGV_Games_slid_6 from '@/asset/imgs/tablegames/ggvt6.jpg'; 
import GGV_Games_slid_7 from '@/asset/imgs/tablegames/ggvt7.jpg'; 
import GGV_Games_slid_8 from '@/asset/imgs/tablegames/ggvt8.jpg'; 
import GGV_Games_slid_9 from '@/asset/imgs/tablegames/ggvt9.jpg'; 
import GGV_Games_slid_10 from '@/asset/imgs/tablegames/ggvt10.jpg'; 

// ClubGGImages slider images
import ClubGG_slid_1 from '@/asset/imgs/clubggImg/clubgg1.png'; 
import ClubGG_slid_2 from '@/asset/imgs/clubggImg/clubgg2.jpg'; 
import ClubGG_slid_3 from '@/asset/imgs/clubggImg/clubgg3.png'; 
import ClubGG_slid_4 from '@/asset/imgs/clubggImg/clubgg4.png'; 
import ClubGG_slid_5 from '@/asset/imgs/clubggImg/clubgg5.png'; 

// Casino Platform Images slider images
import CP_slid_1 from '@/asset/imgs/cpImg/cp1.png'; 
import CP_slid_2 from '@/asset/imgs/cpImg/cp2.png'; 
import CP_slid_3 from '@/asset/imgs/cpImg/cp3.png'; 
import CP_slid_4 from '@/asset/imgs/cpImg/cp4.png'; 
import CP_slid_5 from '@/asset/imgs/cpImg/cp5.png'; 
import CP_slid_6 from '@/asset/imgs/cpImg/cp6.png'; 
import CP_slid_7 from '@/asset/imgs/cpImg/cp7.png'; 
import CP_slid_8 from '@/asset/imgs/cpImg/cp8.png'; 
import CP_slid_9 from '@/asset/imgs/cpImg/cp9.png'; 
import CP_slid_10 from '@/asset/imgs/cpImg/cp10.png'; 

// Plus Images slider images
import Plus_slid_1 from '@/asset/imgs/plusImg/plus1.avif'; 
import Plus_slid_2 from '@/asset/imgs/plusImg/plus2.avif'; 
import Plus_slid_3 from '@/asset/imgs/plusImg/plus3.avif'; 
import Plus_slid_4 from '@/asset/imgs/plusImg/plus4.jpg'; 
import Plus_slid_5 from '@/asset/imgs/plusImg/plus5.jpg'; 
import Plus_slid_6 from '@/asset/imgs/plusImg/plus6.jpg'; 
import Plus_slid_7 from '@/asset/imgs/plusImg/plus7.jpg'; 
import Plus_slid_8 from '@/asset/imgs/plusImg/plus8.jpg'; 
import Plus_slid_9 from '@/asset/imgs/plusImg/plus9.jpg'; 

import GGVegasTitleSection from './sections/what-we-do/GGVegasTitleSection';
import GameFeatureSection from './sections/what-we-do/GGPokerFeatureSection';
import GGVegasFeatureSection from './sections/what-we-do/GGVegasFeatureSection';
import ClubGGFeatureSection from './sections/what-we-do/ClubGGFeatureSection';
import CPFeatureSection from './sections/what-we-do/CPFeatureSection';
import PlusFeatureSection from './sections/what-we-do/PlusFeatureSection';
import WSOPSection from './sections/what-we-do/WSOPSection';
import WSOPTitleSection from './sections/what-we-do/WSOPTitleSection';


// 각 섹션별 이미지들을 import 합니다. 실제 이미지 파일이 이 경로에 있어야 합니다.
// 예시: import ggpoker_img1 from '@/asset/imgs/what-we-do/ggpoker/img1.jpg';
// 지금은 임시로 빈 배열을 사용합니다.
const ggpokerImages: string[] = [ggpoker_slid_1, ggpoker_slid_2, ggpoker_slid_3, ggpoker_slid_4, ggpoker_slid_5, ggpoker_slid_6, ggpoker_slid_7]; 
const slotImages: string[] = [GGV_Slots_slid_1, GGV_Slots_slid_2, GGV_Slots_slid_3, GGV_Slots_slid_4, GGV_Slots_slid_5, GGV_Slots_slid_6, GGV_Slots_slid_8, GGV_Slots_slid_9, GGV_Slots_slid_10];
const tableGameImages: string[] = [GGV_Games_slid_1, GGV_Games_slid_2, GGV_Games_slid_3, GGV_Games_slid_4, GGV_Games_slid_5, GGV_Games_slid_6, GGV_Games_slid_7, GGV_Games_slid_8, GGV_Games_slid_9, GGV_Games_slid_10];
const clubggImages: string[] = [ClubGG_slid_1, ClubGG_slid_2, ClubGG_slid_3, ClubGG_slid_4, ClubGG_slid_5];
const cpImages: string[] = [CP_slid_1, CP_slid_2, CP_slid_3, CP_slid_4, CP_slid_5, CP_slid_6, CP_slid_7, CP_slid_8, CP_slid_9, CP_slid_10];
const plusImages: string[] = [Plus_slid_1, Plus_slid_2, Plus_slid_3, Plus_slid_4, Plus_slid_5, Plus_slid_6, Plus_slid_7, Plus_slid_8, Plus_slid_9];


// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- 타입 정의 ---
interface Feature {
  title: string;
  heading: string;
  description: string;
  listItems: string[];
  sliderImages: string[];
  logoSrc: string;
  bgColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}

// --- 페이지 콘텐츠 데이터 ---
const featureData: Feature[] = [
    {
        title: "ClubGG",
        heading: "ClubGG\nState of the art Subscription Poker",
        description: "ClubGG는 새로운 차원의 구독형 온라인 포커 플랫폼으로 전 세계에서 가장 뛰어난 브랜드들과 함께합니다.\n나만의 포커 클럽을 만들고 친구를 초대하세요.",
        listItems: ["Platinum Membership", "Live Events", "Create Your Own Club", "Club Features - Customizable game settings & variation"],
        sliderImages: clubggImages,
        logoSrc: clubgg_logo,
        bgColor: '#841e09',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "Casino Platform",
        heading: "Casino Platform\nCutting Edge Platform Development",
        description: "",
        listItems: ["Platform Solutions", "Trust and Safety", "Third-Party Integration", "Engagement Resources"],
        sliderImages: cpImages,
        logoSrc: nsus_logo,
        bgColor: '#1d305f',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "Plus Team",
        heading: "Plus Team\nAll about Live Tournaments",
        description: "",
        listItems: ["PokerStake: World's #1 MTT Staking Platform", "WSOP Plus App - Live Tournament Schedule App", "Tournament Management Tool"],
        sliderImages: plusImages,
        logoSrc: nsus_logo,
        bgColor: '#4f46e5',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffedd5',
    },
];

// --- 내부 컴포넌트들 ---

// 1. 최상단 타이틀 섹션
interface WhatWeDoTitleSectionProps {
  onChevronClick: () => void;
}
const WhatWeDoTitleSection = React.forwardRef<HTMLElement, WhatWeDoTitleSectionProps>(({ onChevronClick }, ref) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".main-title",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
            );
        }, ref as React.RefObject<HTMLElement>);
        return () => ctx.revert();
    }, [ref]);

        return (
        <section ref={ref} className="!h-[110svh] w-full flex flex-col items-center justify-center overflow-hidden relative">
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={whatwedoVideo} type="video/mp4" />
            </video>
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                <div className="main-title text-5xl md:text-6xl lg:text-7xl font-bold text-center max-w-6xl px-4 leading-normal md:leading-relaxed text-white">
                    Global No. 1 <br /> iGaming Company
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

// 2. 이미지 슬라이더
interface ImageSliderProps {
  images: string[];
  title: string;
}
const ImageSlider: React.FC<ImageSliderProps> = ({ images, title }) => {
    // ... (ImageSlider 컴포넌트 코드는 이전 답변과 동일)
    const [dragConstraint, setDragConstraint] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateConstraint = () => {
            if (containerRef.current && trackRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const trackWidth = trackRef.current.scrollWidth;
                const rightPadding = window.innerWidth < 1024 ? 32 : 0;
                const newDragConstraint = trackWidth > containerWidth ? -(trackWidth - containerWidth) - rightPadding : 0;
                setDragConstraint(newDragConstraint);
            }
        };

        calculateConstraint();
        const debouncedCalculate = gsap.delayedCall(250, calculateConstraint).pause();
        const onResize = () => debouncedCalculate.restart(true);

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [images]);

    return (
        <div ref={containerRef} className="mt-12 w-full overflow-hidden">
            <motion.div
                ref={trackRef}
                className="cursor-grab active:cursor-grabbing flex gap-2 px-4 lg:pl-0"
                drag="x"
                dragConstraints={{ right: 0, left: dragConstraint }}
            >
                {images.map((imgSrc, imgIndex) => (
                    <motion.div key={imgIndex} className="flex-none">
                        <div className="h-72 aspect-[4/3] overflow-hidden rounded-xl">
                            <img src={imgSrc} alt={`${title} image ${imgIndex + 1}`} className="pointer-events-none h-full w-full object-cover" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

// 3. 메인 콘텐츠 섹션
const GGSection = React.forwardRef<HTMLElement, {}>((props, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    const handleNavClick = (index: number) => {
        const target = sectionRefs.current[index];
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: window.innerHeight / 3 },
                ease: "power3.inOut"
            });
        }
    };
    
    useLayoutEffect(() => {
        const mainEl = (ref as React.RefObject<HTMLElement>).current;
        const ctx = gsap.context(() => {
            sectionRefs.current.forEach((section, index) => {
                if (!section) return;
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 50%",
                    end: "bottom 50%",
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveIndex(index);
                        }
                    },
                });
            });
        }, mainEl);
        return () => ctx.revert();
    }, [ref]);

    useEffect(() => {
        const mainEl = (ref as React.RefObject<HTMLElement>).current;
        if (mainEl) {
            gsap.to(mainEl, { 
                backgroundColor: featureData[activeIndex].bgColor, 
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
    }, [activeIndex, ref]);

    return (
        <section ref={ref} className="w-full" style={{ backgroundColor: featureData[0].bgColor }}>
            <div className="relative mx-auto grid w-full grid-cols-1 lg:grid-cols-[1fr_minmax(auto,320px)_minmax(auto,960px)_1.7fr] lg:gap-x-8">
                {/* Left Sticky Navigation */}
                <div className="sticky top-0 hidden lg:flex flex-col justify-center items-start h-screen whitespace-pre-line col-start-2">
                    <div className="space-y-8">
                        <img src={featureData[activeIndex].logoSrc} className="w-32 h-12 object-contain transition-opacity duration-500" alt={`${featureData[activeIndex].title} logo`} />
                        <nav>
                            <ul>
                                {featureData.map((feature, index) => (
                                    <li key={index} className="py-2">
                                        <button 
                                            onClick={() => handleNavClick(index)} 
                                            className="font-semibold text-lg transition-all duration-300"
                                            style={{ 
                                                color: activeIndex === index ? featureData[activeIndex].primaryTextColor : featureData[activeIndex].secondaryTextColor, 
                                                opacity: activeIndex === index ? 1 : 0.6 
                                            }}
                                        >
                                            {feature.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                {/* Right Scrolling Content */}
                <div className="relative col-start-1 lg:col-start-3 col-span-full lg:col-span-1 overflow-hidden">
                    {featureData.map((feature, index) => (
                        <div 
                            key={index} 
                            ref={el => { if(el) sectionRefs.current[index] = el; }}
                            className="flex flex-col justify-center lg:min-h-screen px-8 lg:pl-0 lg:pr-0 py-24 lg:py-0"
                        >
                            <div className="w-full max-w-5xl">
                                <h2 className="text-3xl font-bold lg:text-4xl leading-tight whitespace-pre-line" style={{ color: feature.primaryTextColor }}>
                                    {feature.heading}
                                </h2>
                                <p className="mt-6 text-lg lg:text-xl leading-relaxed whitespace-pre-line" style={{ color: feature.secondaryTextColor, opacity: 0.8 }}>
                                    {feature.description}
                                </p>
                                {feature.listItems?.length > 0 && (
                                    <ul className="mt-6 space-y-3">
                                        {feature.listItems.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-center">
                                                <span className="text-xl font-semibold opacity-80" style={{ color: feature.primaryTextColor }}>•</span>
                                                <p className="ml-4 text-lg font-medium" style={{ color: feature.primaryTextColor }}>{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="w-screen -mx-8 lg:w-full lg:mx-0">
                                <ImageSlider images={feature.sliderImages} title={feature.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});


// --- 메인 페이지 컴포넌트 ---
const DepartmentsPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        navbarContext?.setNavbarTheme("dark");
    }, [navbarContext]);

    const titleSectionRef = useRef<HTMLElement | null>(null);
    const ggSectionRef = useRef<HTMLElement | null>(null);

    const scrollToSecondSection = () => {
        const target = ggSectionRef.current;
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target },
                ease: "power2.inOut",
            });
        }
    };

    useLayoutEffect(() => {
        const navHeight = HEADER_FIXED_HEIGHT;
        if (titleSectionRef.current) {
            titleSectionRef.current.style.marginTop = `-${navHeight}px`;
            titleSectionRef.current.style.paddingTop = `${navHeight}px`;
        }

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='bg-black text-[#f3f4f6]'>
            <WhatWeDoTitleSection ref={titleSectionRef} onChevronClick={scrollToSecondSection} />
            <GameFeatureSection />
            <GGVegasTitleSection />
            <GGVegasFeatureSection />
            <ClubGGFeatureSection />
            <CPFeatureSection />
            <PlusFeatureSection />
            <WSOPSection />
        </div>
    );
}

export default DepartmentsPage;