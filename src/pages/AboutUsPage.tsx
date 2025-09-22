import React, { useRef, useLayoutEffect, useContext, useEffect } from 'react';
import { NavbarThemeContext } from '@/App';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

import GlobalSection from '@/pages/sections/GlobalSection';
import WhoWeAreTitleSection from '@/pages/sections/WhoWeAreTitleSection';
import CultureSection from '@/pages/sections/CultureSection';
import KeyAchievementSection from '@/pages/sections/KeyAchievementSection';
import FeatureSection from '@/pages/sections/FeatureSection';
import { HEADER_FIXED_HEIGHT } from "@/constants";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const AboutUsPage: React.FC = () => {
    // Context를 사용하는 부분을 null 체크와 함께 더 안전하게 변경했습니다.
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        if (navbarContext) {
            navbarContext.setNavbarTheme("dark");
        }
    }, [navbarContext]);

    const mainSectionRef = useRef<HTMLElement | null>(null);
    const componentRootRef = useRef<HTMLDivElement | null>(null);
    const featureSectionRef = useRef<HTMLElement | null>(null);
    const globalSectionRef = useRef<HTMLElement | null>(null);

    const isScrolling = useRef(false);
    const scrollToSecondSection = () => {
        if (isScrolling.current || !featureSectionRef.current) return;
        isScrolling.current = true;
        const targetY = featureSectionRef.current.getBoundingClientRect().top + window.scrollY;
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetY },
            ease: "power2.inOut",
            onComplete: () => { isScrolling.current = false; }
        });
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const navHeight = HEADER_FIXED_HEIGHT;

            if (mainSectionRef.current) {
                mainSectionRef.current.style.marginTop = `-${navHeight}px`;
                mainSectionRef.current.style.paddingTop = `${navHeight}px`;
            }
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={componentRootRef} className='bg-black text-[#f3f4f6]'>
            <WhoWeAreTitleSection ref={mainSectionRef} onChevronClick={scrollToSecondSection} />
            <FeatureSection ref={featureSectionRef} />
            <KeyAchievementSection />
            <GlobalSection ref={globalSectionRef} />
            <CultureSection />
        </div>
    );
}

export default AboutUsPage;

// import React from 'react';
// import ChevronDownIcon from '../components/icons/ChevronDownIcon';

// // A reusable Section component
// const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
//   <section className={`py-20 md:py-32 ${className}`}>
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       {children}
//     </div>
//   </section>
// );

// const AboutUsPage: React.FC = () => {
//   return (
//     <div>
//       {/* 1. Hero Section - Updated with Video Background */}
//       <section className="relative h-screen text-white flex flex-col justify-center items-center overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       >
//         <source src="/videos/whoweare-4.mp4?v=1" type="video/mp4" />
//       </video>

//       {/* Black Overlay */}
//       <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none"></div>

//       {/* Content */}
//       <div className="relative z-20 text-center">
//         <h1 className="text-5xl md:text-7xl font-bold leading-tight">
//           To entertain and <br />
//           connect the world <br />
//           through iGaming
//         </h1>
//       </div>

//       <div className="absolute bottom-10 animate-bounce z-20">
//         <ChevronDownIcon className="w-10 h-10" />
//       </div>
//     </section>



//       {/* 2. Our Mission Section */}
//       <Section className="bg-white">
//         <div className="text-center max-w-4xl mx-auto">
//           <p className="font-bold text-nsus-gray-900 mb-4">Our Mission</p>
//           <h2 className="text-5xl md:text-7xl font-bold text-nsus-gray-900 leading-tight">
//             <span className="bg-nsus-blue text-white px-2 -mx-2">To entertain</span><br />
//             <span className="bg-nsus-blue text-white px-2 -mx-2">and connect</span><br />
//             <span className="bg-nsus-blue text-white px-2 -mx-2">the world</span><br />
//             through<br />
//             iGaming
//           </h2>
//           <p className="mt-8 text-lg text-nsus-gray-500">
//             우리는 iGaming을 통해 세상을 연결하고자 합니다.
//             이를 통해 유저의 즐거움을 극대화하는 것이
//             NSUS가 지향하는 궁극적인 목표이자 존재의 이유입니다.
//           </p>
//         </div>
//         <div className="text-center mt-16">
//             <ChevronDownIcon className="w-10 h-10 mx-auto text-nsus-gray-300" />
//         </div>
//       </Section>

//       {/* 3. Our Vision Section */}
//       <div className="relative bg-nsus-gray-100 overflow-hidden">
//         <div 
//           className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10"
//           style={{ backgroundImage: "url('https://picsum.photos/seed/navigator-light-abstract/1920/1080')" }}
//         ></div>
//         <Section className="bg-transparent">
//           <div className="relative z-10">
//             <div className="text-center max-w-4xl mx-auto">
//               <p className="font-bold text-nsus-gray-900 mb-4">Our Vision</p>
//               <h2 className="text-5xl md:text-7xl font-bold text-nsus-gray-900 leading-tight">
//                 Global No.1<br />
//                 iGaming Company
//               </h2>
//               <p className="mt-8 text-lg text-nsus-gray-500">
//                 우리는 새로운 차원의 엔터테인먼트를 제공하여
//                 Global iGaming Community의 리더가 되고자 합니다.
//               </p>
//             </div>
//           </div>
//         </Section>
//       </div>


//       {/* 4. Key Achievements Section */}
//       <Section className="bg-white">
//         <h2 className="text-center text-4xl font-bold text-nsus-gray-900 mb-16">
//           Key Achievements
//         </h2>
//         <div className="space-y-24">
//           {/* Achievement 1 */}
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-3xl font-bold text-nsus-gray-900">Global No.1 Traffic</h3>
//               <p className="mt-4 text-nsus-gray-500">
//                 NSUS Group의 GGPoker는 모든 지표에서 압도적인 시장 점유율을 차지하고 있으며, 그 격차를 지속적으로 확대하고 있습니다.
//               </p>
//               <button className="mt-6 px-6 py-2 bg-nsus-gray-900 text-white font-bold rounded-lg hover:bg-black transition-transform hover:scale-105">
//                 Learn More
//               </button>
//             </div>
//             <img src="https://picsum.photos/seed/data-chart/800/600" alt="Data analysis and traffic" className="w-full h-80 object-cover rounded-lg shadow-xl"/>
//           </div>
          
//           {/* Achievement 2 */}
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <img src="https://picsum.photos/seed/poker-game/800/600" alt="Poker game" className="w-full h-80 object-cover rounded-lg shadow-xl md:order-last"/>
//             <div>
//               <h3 className="text-3xl font-bold text-nsus-gray-900">World Series of Poker</h3>
//               <p className="mt-4 text-nsus-gray-500">
//                 NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming Industry 전반에서 지속적으로 영향력을 확대하고 있습니다.
//               </p>
//               <button className="mt-6 px-6 py-2 bg-nsus-gray-900 text-white font-bold rounded-lg hover:bg-black transition-transform hover:scale-105">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Achievement 3 */}
//           <div className="text-center max-w-2xl mx-auto">
//             <h3 className="text-3xl font-bold text-nsus-gray-900">Expanding the market</h3>
//             <p className="mt-4 text-nsus-gray-500">
//               NSUS Group은 2017년 영국을 시작으로 미국 펜실베니아, 캐나다, 네덜란드, 독일, 벨기에, 루마니아, 체코, 몰타, 맨섬, 필리핀 등 여러 국가의 License를 취득하며 사업을 확장해 나가고 있습니다.
//             </p>
//           </div>
//         </div>
//       </Section>
//     </div>
//   );
// };

// export default AboutUsPage;



// import React from 'react';
// import ChevronDownIcon from '../components/icons/ChevronDownIcon';

// // A reusable Section component
// const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
//   <section className={`py-20 md:py-32 ${className}`}>
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       {children}
//     </div>
//   </section>
// );

// const AboutUsPage: React.FC = () => {
//   return (
//     <div>
//       {/* 1. Hero Section */}
//       <section 
//         className="h-screen bg-cover bg-center text-white flex flex-col justify-center items-center relative"
//         style={{ backgroundImage: "url('https://picsum.photos/seed/navigator-dark-abstract/1920/1080')" }}
//       >
//         <div className="absolute inset-0 bg-black/70 z-0"></div>
//         <div className="relative z-10 text-center">
//             <h1 className="text-5xl md:text-7xl font-bold leading-tight">
//               To entertain and <br />
//               connect the world <br />
//               through iGaming
//             </h1>
//         </div>
//         <div className="absolute bottom-10 animate-bounce z-10">
//           <ChevronDownIcon className="w-10 h-10" />
//         </div>
//       </section>

//       {/* 2. Our Mission Section */}
//       <Section className="bg-white">
//         <div className="text-center max-w-4xl mx-auto">
//           <p className="font-bold text-nsus-gray-900 mb-4">Our Mission</p>
//           <h2 className="text-5xl md:text-7xl font-bold text-nsus-gray-900 leading-tight">
//             <span className="bg-nsus-blue text-white px-2 -mx-2">To entertain</span><br />
//             <span className="bg-nsus-blue text-white px-2 -mx-2">and connect</span><br />
//             <span className="bg-nsus-blue text-white px-2 -mx-2">the world</span><br />
//             through<br />
//             iGaming
//           </h2>
//           <p className="mt-8 text-lg text-nsus-gray-500">
//             우리는 iGaming을 통해 세상을 연결하고자 합니다.
//             이를 통해 유저의 즐거움을 극대화하는 것이
//             NSUS가 지향하는 궁극적인 목표이자 존재의 이유입니다.
//           </p>
//         </div>
//         <div className="text-center mt-16">
//             <ChevronDownIcon className="w-10 h-10 mx-auto text-nsus-gray-300" />
//         </div>
//       </Section>

//       {/* 3. Our Vision Section */}
//       <div className="relative bg-nsus-gray-100 overflow-hidden">
//         <div 
//           className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10"
//           style={{ backgroundImage: "url('https://picsum.photos/seed/navigator-light-abstract/1920/1080')" }}
//         ></div>
//         <Section className="bg-transparent">
//           <div className="relative z-10">
//             <div className="text-center max-w-4xl mx-auto">
//               <p className="font-bold text-nsus-gray-900 mb-4">Our Vision</p>
//               <h2 className="text-5xl md:text-7xl font-bold text-nsus-gray-900 leading-tight">
//                 Global No.1<br />
//                 iGaming Company
//               </h2>
//               <p className="mt-8 text-lg text-nsus-gray-500">
//                 우리는 새로운 차원의 엔터테인먼트를 제공하여
//                 Global iGaming Community의 리더가 되고자 합니다.
//               </p>
//             </div>
//           </div>
//         </Section>
//       </div>


//       {/* 4. Key Achievements Section */}
//       <Section className="bg-white">
//         <h2 className="text-center text-4xl font-bold text-nsus-gray-900 mb-16">
//           Key Achievements
//         </h2>
//         <div className="space-y-24">
//           {/* Achievement 1 */}
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-3xl font-bold text-nsus-gray-900">Global No.1 Traffic</h3>
//               <p className="mt-4 text-nsus-gray-500">
//                 NSUS Group의 GGPoker는 모든 지표에서 압도적인 시장 점유율을 차지하고 있으며, 그 격차를 지속적으로 확대하고 있습니다.
//               </p>
//               <button className="mt-6 px-6 py-2 bg-nsus-gray-900 text-white font-bold rounded-lg hover:bg-black transition-transform hover:scale-105">
//                 Learn More
//               </button>
//             </div>
//             <img src="https://picsum.photos/seed/data-chart/800/600" alt="Data analysis and traffic" className="w-full h-80 object-cover rounded-lg shadow-xl"/>
//           </div>
          
//           {/* Achievement 2 */}
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <img src="https://picsum.photos/seed/poker-game/800/600" alt="Poker game" className="w-full h-80 object-cover rounded-lg shadow-xl md:order-last"/>
//             <div>
//               <h3 className="text-3xl font-bold text-nsus-gray-900">World Series of Poker</h3>
//               <p className="mt-4 text-nsus-gray-500">
//                 NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming Industry 전반에서 지속적으로 영향력을 확대하고 있습니다.
//               </p>
//               <button className="mt-6 px-6 py-2 bg-nsus-gray-900 text-white font-bold rounded-lg hover:bg-black transition-transform hover:scale-105">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Achievement 3 */}
//           <div className="text-center max-w-2xl mx-auto">
//             <h3 className="text-3xl font-bold text-nsus-gray-900">Expanding the market</h3>
//             <p className="mt-4 text-nsus-gray-500">
//               NSUS Group은 2017년 영국을 시작으로 미국 펜실베니아, 캐나다, 네덜란드, 독일, 벨기에, 루마니아, 체코, 몰타, 맨섬, 필리핀 등 여러 국가의 License를 취득하며 사업을 확장해 나가고 있습니다.
//             </p>
//           </div>
//         </div>
//       </Section>
//     </div>
//   );
// };

// export default AboutUsPage;