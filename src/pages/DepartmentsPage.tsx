import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { NavbarThemeContext } from '@/App';
import Footer from '@/components/Footer';
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
        title: "GGPoker",
        heading: "GGPoker\nWorld No.1 Poker Software\nGuiness World Reccord Holder",
        description: "2017년 출범한 GGPoker는 포커에 대한 깊은 애정을 가진 숙련된 플레이어들로 구성된 팀이 처음부터 심혈을 기울여 설계했습니다.\n우리의 비전은 그 어떤 플랫폼보다 GGPoker에서 더 큰 즐거움을 경험하며 플레이할 수 있도록 하는 것입니다. \nGGPoker는 포커의 진정한 재미를 되찾아 드리고자 합니다.",
        listItems: ["Guiness World Record Holding Online Poker Room", "World Series of Poker (WSOP) Sponsor", "Play With World Famous Poker Greats", "Various Social Activities"],
        sliderImages: ggpokerImages,
        logoSrc: ggpoker_logo,
        bgColor: '#841e09',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "GGVegas Slots",
        heading: "GGVegas Slots\nNext Generation of Multiplayer RNG Games",
        description: "GGVegas는 새롭고, 짜릿하며, 즐거운 경험을 선사하는 데 중점을 둡니다.\n저희는 수많은 사람들을 사로잡는 카지노 게임의 핵심 요소를 깊이 이해하고 있으며, 잊을 수 없는 경험을 선사하기 위해 최선을 다하고 있습니다.",
        listItems: ["Luxury and Masterpiece Qualitys", "High-quality Features and Math", "Multiplay Supportable"],
        sliderImages: slotImages,
        logoSrc: ggvegas_logo,
        bgColor: '#000000',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "GGVegas Games",
        heading: "GGVegas Games\nA Modern Interpretation of Classic Games",
        description: "GGVegas는 새롭고, 짜릿하며, 즐거운 경험을 선사하는 데 중점을 둡니다.\n저희는 수많은 사람들을 사로잡는 카지노 게임의 핵심 요소를 깊이 이해하고 있으며, 잊을 수 없는 경험을 선사하기 위해 최선을 다하고 있습니다.",
        listItems: ["Multi-Table Feature", "Mode Variety", "Graphic Excellence"],
        sliderImages: tableGameImages,
        logoSrc: ggvegas_logo,
        bgColor: '#000000',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
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
        // ✅ section 태그의 클래스를 수정합니다.
        <section ref={ref} className="!h-[110svh] w-full flex flex-col items-center justify-center overflow-hidden relative">
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={whatwedoVideo} type="video/mp4" />
            </video>
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                {/* ✅ main-title div의 클래스를 수정합니다. */}
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
            <GGSection ref={ggSectionRef} />
            {/* <Footer /> */}
        </div>
    );
}

export default DepartmentsPage;


// import React, { useState, useEffect } from 'react'; // useState, useEffect import
// import { fetchAllGgVegasGames } from '@/lib/contentful'; // 방금 만든 함수 import
// import type { GgVegasGame } from '@/types'; // 방금 만든 타입 import

// const ggPokerFeatures = [
//     {
//         number: '01',
//         title: 'Special Features',
//         items: [
//             { name: 'Splash', description: 'Revenge is a Dish Best Served With a Splash' },
//             { name: 'EV Cashout', description: '' },
//             { name: 'NFT Avatars', description: '' },
//             { name: 'Final Table Betting', description: '' },
//             { name: 'Social Features', description: '' },
//             { name: 'Staking Platform', description: '' },
//             { name: 'Smart HUD', description: '' },
//             { name: 'PokerCraft', description: '' },
//         ]
//     },
//     {
//         number: '02',
//         title: 'GGPoker Classic Games',
//         items: [
//             { name: 'AoF Sit & Go', description: 'The Fastest Way to Get in The Money' },
//             { name: 'All-in or Fold', description: '' },
//             { name: 'Mystery Battle Royale', description: '' },
//             { name: 'Spin & Gold', description: '' },
//             { name: 'Flip & Go', description: '' },
//         ]
//     },
//     {
//         number: '03',
//         title: 'GGPoker Tournaments',
//         items: [
//             { name: 'Bounty Hunters Series', description: 'It\'s just business, nothing personal' },
//             { name: 'Road to Vegas', description: '' },
//             { name: 'GGMillions$', description: '' },
//             { name: 'GGMasters', description: '' },
//             { name: 'The Weekender', description: '' },
//         ]
//     }
// ];



// const WsopCard: React.FC<{title: string, description: string, imageUrl: string}> = ({ title, description, imageUrl}) => (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//         <h3 className="font-bold text-lg">{title}</h3>
//         <p className="mt-2 text-sm text-nsus-gray-500">{description}</p>
//         <div className="mt-4 bg-gray-200 h-40 rounded-md" style={{ background: `url(${imageUrl})`, backgroundSize: 'cover' }}></div>
//     </div>
// );


// const WhatWeDoPage: React.FC = () => {
//       // GGVegas 게임 데이터를 담을 state를 추가합니다.
//     const [ggVegasGames, setGgVegasGames] = useState<GgVegasGame[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
//     useEffect(() => {
//         const getGames = async () => {
//             try {
//                 const games = await fetchAllGgVegasGames();
//                 setGgVegasGames(games);
//             } catch (error) {
//                 console.error("Error fetching GGVegas games:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         getGames();
//     }, []);

//     return (
//         <div className="scroll-smooth">
//             {/* GGPoker Section */}
//             <section id="ggpoker" className="bg-white py-24 scroll-mt-20">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid lg:grid-cols-2 gap-16 items-center">
//                         <div className="text-left">
//                             <p className="text-4xl font-bold tracking-tighter text-nsus-gray-900">GG<span className="text-red-600">POKER</span></p>
//                             <h1 className="text-6xl font-extrabold text-nsus-gray-900 mt-4 leading-tight">The World's<br/>Biggest<br/>Poker Room</h1>
//                             <p className="mt-6 text-nsus-gray-700 max-w-md">
//                                 2017년 출범한 GGPoker는 포커에 대한 깊은 애정을 가진 숙련된 플레이어들로 구성된 팀이 처음부터 심혈을 기울여 설계했습니다.<br/><br/>
//                                 우리의 비전은 그 어떤 플랫폼보다 GGPoker에서 더 큰 즐거움을 경험하며 플레이할 수 있도록 하는 것입니다.<br/><br/>
//                                 GGPoker는 포커의 진정한 재미를 되찾아 드리고자 합니다.
//                             </p>
//                         </div>
//                         <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
//                     </div>
//                     <div className="mt-24">
//                         <h2 className="text-5xl font-extrabold text-center mb-16 text-nsus-gray-900">Key Features</h2>
//                         {ggPokerFeatures.map(featureGroup => (
//                             <div key={featureGroup.title} className="mb-20">
//                                 <div className="grid lg:grid-cols-2 gap-16 items-start">
//                                     <div>
//                                         <p className="text-lg text-nsus-gray-900">{featureGroup.number}</p>
//                                         <h3 className="text-4xl font-bold mt-2 text-nsus-gray-900">{featureGroup.title}</h3>
//                                         <ul className="mt-8 text-nsus-gray-900">
//                                             {featureGroup.items.map(item => (
//                                                 <li key={item.name} className="py-3 border-b border-gray-200">
//                                                     <p className="font-bold text-lg">{item.name}</p>
//                                                     {item.description && <p className="text-sm text-nsus-gray-900">{item.description}</p>}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                     <div className="w-full h-80 bg-gray-200 rounded-lg mt-12 lg:mt-0"></div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* GGVegas Section */}
//             <section id="ggvegas" className="bg-nsus-gray-900 text-white py-24 scroll-mt-20">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid lg:grid-cols-2 gap-16 items-center">
//                         <div className="text-left">
//                             <p className="text-4xl font-bold tracking-tighter">GG<span className="text-yellow-400">VEGAS</span></p>
//                             <h1 className="text-6xl font-extrabold mt-4 leading-tight">Where Fun<br/>Meets<br/>Innovation</h1>
//                             <p className="mt-6 text-gray-300 max-w-md">
//                                 GGVegas는 새롭고, 짜릿하며, 즐거운 경험을 선사하는 데 중점을 둡니다.<br/><br/>
//                                 저희는 수많은 사람들을 사로잡는 카지노 게임의 핵심 요소를 같이 이해하고 있으며, 이것을 수많은 경험을 선사하기 위해 최선을 다하고 있습니다.
//                             </p>
//                         </div>
//                         <div className="w-full h-96 bg-gray-700 rounded-lg"></div>
//                     </div>
//                     <div className="mt-24">
//                         <h2 className="text-5xl font-extrabold text-center mb-16">Key Features</h2>
//                         {ggVegasGames.map(game => (
//                             <div key={game.title} className="grid lg:grid-cols-2 gap-8 items-center border-t border-gray-700 py-12">
//                                 <div>
//                                     <p className="text-lg text-gray-400">{game.displayNumber}</p>
//                                     <h3 className="text-4xl font-bold mt-2">{game.title}</h3>
//                                     <div className="mt-8 border-t border-b border-gray-700 py-2 inline-block">
//                                         <p className="text-sm">Release Years</p>
//                                         <p className="font-bold">{game.releaseYear}</p>
//                                     </div>
//                                 </div>
//                                 <img src={game.gameImage} alt={game.title} className="w-full h-64 object-cover rounded-lg"/>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ClubGG Section */}
//             <section id="clubgg" className="bg-white py-24 scroll-mt-20">
//                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid lg:grid-cols-2 gap-16 items-center">
//                         <div className="text-left">
//                             <p className="text-4xl font-bold tracking-tighter text-nsus-gray-900">Club<span className="text-red-500">GG</span></p>
//                             <h1 className="text-6xl font-extrabold text-nsus-gray-900 mt-4 leading-tight">New Generation<br/>Subscription<br/>Poker Game</h1>
//                             <p className="mt-6 text-nsus-gray-700 max-w-md">
//                                 ClubGG는 새로운 차원의 구독형 온라인 포커 플랫폼으로 전 세계에서 가장 뛰어난 브랜드들과 함께합니다.<br/><br/>
//                                 나만의 포커 클럽을 만들고 친구를 초대하세요.
//                             </p>
//                         </div>
//                         <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
//                     </div>
//                 </div>
//             </section>
            
//             {/* WSOP Section */}
//             <section id="wsop" className="bg-nsus-gray-900 py-24 scroll-mt-20">
//                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="text-center">
//                          <div className="flex justify-center items-center gap-4">
//                             <h2 className="text-2xl font-semibold text-nsus-white">WORLD SERIES OF POKER</h2>
//                             <div className="border-2 border-black rounded-full p-2">
//                                 <div className="bg-black text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-sm">POKER</div>
//                             </div>
//                         </div>
//                         <h1 className="text-5xl font-extrabold text-nsus-gray-200 mt-4">World Series Of Poker</h1>
//                         <p className="text-lg mt-2 text-nsus-gray-700">세계 최대 규모의 포커 토너먼트 대회 운영사</p>
//                         <p className="mt-8 text-nsus-gray-600 max-w-3xl mx-auto">
//                             NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서<br/>
//                             iGaming Industry 전반에서 지속적으로 영향력을 확대하고 있습니다
//                         </p>
//                     </div>
//                     <div className="mt-16 grid lg:grid-cols-3 gap-8 text-nsus-gray-900">
//                         <WsopCard title="This outstanding object" description="NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming Industry 전반에서 지속적으로 영향력을 확대해 나가고 있습니다." imageUrl="https://picsum.photos/seed/wsop1/400/300" />
//                         <WsopCard title="A greater object" description="NSUS Group은 Poker의 살아 있는 전설 Daniel Negreanu 등, 세계 최고의 포커 플레이어들과 Ambassador 계약을 맺고 그들의 활동을 전폭 지원하고 있습니다." imageUrl="https://picsum.photos/seed/wsop2/400/300" />
//                         <WsopCard title="WSOP+" description="Experience the WSOP+ now for everything you need to know about WSOP at your fingertips." imageUrl="https://picsum.photos/seed/wsop3/400/300" />
//                     </div>
//                     <div className="mt-24">
//                         <h2 className="text-4xl font-bold">WSOP Highlight</h2>
//                         <p className="mt-2 text-nsus-gray-500">This is what makes these images special.</p>
//                         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                             <div className="bg-gray-300 rounded-lg aspect-square col-span-2 row-span-2"></div>
//                             <div className="bg-gray-300 rounded-lg aspect-square"></div>
//                             <div className="bg-gray-300 rounded-lg aspect-square"></div>
//                             <div className="bg-gray-300 rounded-lg aspect-square"></div>
//                             <div className="bg-gray-300 rounded-lg aspect-square"></div>
//                             <div className="bg-gray-300 rounded-lg aspect-square"></div>
//                             <div className="bg-gray-300 rounded-lg aspect-square col-span-2"></div>
//                         </div>
//                     </div>
//                  </div>
//             </section>
            
//             {/* Logos Section */}
//             <section className="bg-white py-24">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//                     <p className="text-nsus-gray-500">Drop some names with confidence</p>
//                     <div className="mt-8 flex justify-center items-center gap-x-12 gap-y-8 flex-wrap">
//                         <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
//                         <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
//                         <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
//                         <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
//                         <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default WhatWeDoPage;
