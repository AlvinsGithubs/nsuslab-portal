import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fetchAllFinancialInfo } from "@/lib/contentful";
import type { FinancialInfo } from "@/types";
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// AnimatedCounter 컴포넌트는 변경 없이 그대로 사용합니다.
const AnimatedCounter: React.FC<{ to: number }> = ({ to }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = gsap.to(ref.current, {
                duration: 2,
                innerText: to,
                roundProps: "innerText",
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: () => {
                    if (ref.current) {
                        ref.current.innerText = Number(gsap.getProperty(ref.current, "innerText")).toLocaleString();
                    }
                },
            });
            return () => controls.kill();
        }
    }, [isInView, to]);

    return <span ref={ref}>0</span>;
};


const FinancialInfoPage: React.FC = () => {
    const [financialInfo, setFinancialInfo] = useState<FinancialInfo | null>(null);
    const contentSectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const getFinancialInfo = async () => {
        try {
          const data = await fetchAllFinancialInfo();
          if (data.length > 0) {
            setFinancialInfo(data[0]);
          }
        } catch (error) {
          console.error("Error fetching financial info:", error);
        }
      };
      getFinancialInfo();
    }, []);
    
    const scrollToContent = () => {
        if (contentSectionRef.current) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: contentSectionRef.current, autoKill: true },
                ease: "power2.inOut",
            });
        }
    };

    const fadeInVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="bg-[#0b0f1a] text-white">
            {/* 상단 섹션 */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <motion.path 
                            d="M -100 1200 Q 200 1000, 400 950 T 800 750 T 1200 600 T 1600 500 T 2000 300 T 2400 250"
                            stroke="#1a2e64" 
                            strokeWidth="3" 
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ pathLength: { duration: 4, ease: "circOut" }, opacity: { duration: 1, delay: 0.5 } }}
                        />
                    </svg>
                </div>
                
                <motion.div 
                  className="relative z-10 max-w-4xl w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.2 }}
                >
                    <motion.h1 
                      className="text-4xl md:text-5xl font-bold leading-tight mb-12 text-center"
                      variants={fadeInVariants}
                    >
                        변화를 열망하는 사람들이 모여, <br /> 역사에 남을만한 변화를 만듭니다.
                    </motion.h1>
                    
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                      variants={fadeInVariants}
                    >
                       <div className="p-4">
                            <p className="text-lg text-gray-400 mb-2">월간 활성 사용자</p>
                            <p className="text-4xl md:text-5xl font-bold">
                                <AnimatedCounter to={2480} />만 +
                            </p>
                            <p className="text-sm text-gray-500 mt-2">2024.12.31 기준</p>
                        </div>
                        <div className="p-4">
                            <p className="text-lg text-gray-400 mb-2">누적 가입자 수</p>
                            <p className="text-4xl md:text-5xl font-bold">
                                <AnimatedCounter to={3000} />만 +
                            </p>
                            <p className="text-sm text-gray-500 mt-2">2025.06.30 기준</p>
                        </div>
                        <div className="p-4">
                            <p className="text-lg text-gray-400 mb-2">서비스 수</p>
                            <p className="text-4xl md:text-5xl font-bold">
                                <AnimatedCounter to={100} />개 +
                            </p>
                            <p className="text-sm text-gray-500 mt-2">2025.08.26 기준</p>
                        </div>
                    </motion.div>
                </motion.div>

                <div onClick={scrollToContent} className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10">
                    <div className="w-10 h-10 animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </section>
            
            {/* ✅ 구조 변경: 텍스트와 이미지를 별도의 section으로 분리했습니다. */}
            <section ref={contentSectionRef} className="bg-white text-nsus-gray-900 py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ staggerChildren: 0.2 }}
                    >
                        <motion.h2 
                          className="text-3xl md:text-4xl font-bold mb-8" 
                          variants={fadeInVariants}
                        >
                          Work at NSUSLAB
                        </motion.h2>

                        <motion.div className="space-y-5 text-lg text-nsus-gray-700 leading-relaxed" variants={fadeInVariants}>
                            <p>NSUS Group은 현재 북미, 유럽, 아시아 등 다양한 지역에 700명 이상의 임직원들이 일하고 있는 다국적 기업으로, iGaming 업계의 유니콘 입니다.</p>
                            <p>NSUSLAB(엔서스랩)은 이러한 NSUS Group의 개발 스튜디오로서 그룹의 핵심적인 역할을 하고 있습니다.</p>
                            <p>폭발적 성장에 따른 안정적인 수익과 건실한 재무상태를 바탕으로 지속적인 인재 영입과 개발 환경 개선에 많은 투자를 하고 있으며, 성과와 나눔의 복지 확장에도 힘쓰고 있습니다.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {financialInfo && (
                // ✅ 1. section을 motion.section으로 변경하고 애니메이션 속성을 추가합니다.
                <motion.section 
                    className="bg-[#1A2C47] py-20 md:py-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // 화면에 30% 보였을 때 애니메이션 시작
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
                    }}
                >
                    <div className="max-w-4xl mx-auto px-6">
                        {/* ✅ 2. 콘텐츠 div에 새로운 애니메이션(크기 조절)을 추가합니다. */}
                        <motion.div
                            variants={{
                                hidden: { scale: 0.95, y: 20 },
                                visible: { scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            <h3 className="text-2xl font-bold text-white text-center mb-8">
                                {financialInfo.title}
                            </h3>
                            <img 
                                src={financialInfo.imageUrl} 
                                alt={financialInfo.title} 
                                className="w-full h-auto rounded-lg shadow-xl" 
                            />
                        </motion.div>
                    </div>
                </motion.section>
            )}
            
            <section className="bg-white text-nsus-gray-900 py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-6">
                     <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInVariants}
                    >
                        <div className="space-y-5 text-lg text-nsus-gray-700 leading-relaxed">
                            <p>외부 투자에 의지하고 성공에 대한 막연한 희망으로 프로젝트를 진행하는 대부분의 게임 개발사와는 달리, 저희 NSUSLAB은 성공한 제품과 사업에 의한 안정적 매출을 기반으로 보다 큰 성공을 이루기 위해 달리고 있습니다.</p>
                            <p>또한 투자자의 외압이 없는 독자적이며 신속한 의사결정 구조를 가지고 있습니다. 급변하는 시장에서 이와 같은 효율과 자율성은 큰 경쟁력이며, 투자자가 아닌 함께 고생한 구성원들에게 노력의 결실이 보다 많이 돌아갈 수 있는 환경입니다.</p>
                            <p>우리는 단지 꿈만 꾸는 것이 아닌, 좋은 현실을 더 좋게 만들고자 합니다. 안정적인 개발 환경에서 세계 시장을 제패하기 위해 도전적 성장과 경험을 함께 할 좋은 인재들을 적극 영입하고 있습니다.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FinancialInfoPage;


// import React, { useState, useEffect } from 'react';
// import { fetchAllFinancialInfo } from "@/lib/contentful";
// import type { FinancialInfo } from "@/types";



// // const chartData = [
// //   { label: '2018.4Q', value: 10 },
// //   { label: '2019.1Q', value: 12 },
// //   { label: '2019.2Q', value: 15 },
// //   { label: '2019.3Q', value: 18 },
// //   { label: '2020.1Q', value: 16 },
// //   { label: '2020.2Q', value: 25 },
// //   { label: '2020.3Q', value: 35 },
// //   { label: '2020.4Q', value: 45 },
// //   { label: '2021.1Q', value: 55 },
// //   { label: '2021.2Q', value: 48 },
// //   { label: '2021.3Q', value: 60 },
// //   { label: '2021.4Q', value: 65 },
// //   { label: '2022.1Q', value: 70 },
// //   { label: '2022.2Q', value: 75 },
// //   { label: '2022.3Q', value: 80 },
// //   { label: '2022.4Q', value: 85 },
// //   { label: '2023.1Q', value: 90 },
// //   { label: '2023.2Q', value: 100 },
// //   { label: '2023.3Q', value: 110 },
// //   { label: '2023.4Q', value: 125 },
// //   { label: '2024.1Q', value: 130 },
// //   { label: '2024.2Q', value: 140 },
// //   { label: '2024.3Q', value: 150 },
// //   { label: '2024.4Q', value: 165 },
// //   { label: '2025.1Q', value: 170 },
// // ];

// // const BarChart: React.FC = () => {
// //     const maxValue = Math.max(...chartData.map(d => d.value));
// //     return (
// //         <div className="bg-gradient-to-b from-[#1E3A8A] to-[#111827] p-6 sm:p-8 rounded-lg shadow-xl overflow-hidden">
// //             <h3 className="text-2xl font-bold text-white text-center mb-10">분기별 매출 추이</h3>
// //             <div className="overflow-x-auto pb-12 -mb-12">
// //                 <div className="flex items-end h-80 min-w-[800px] space-x-2">
// //                     {chartData.map((data, index) => (
// //                         <div key={index} className="flex-1 h-full flex flex-col justify-end items-center relative">
// //                             <div 
// //                                 className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-sm"
// //                                 style={{ height: `${(data.value / maxValue) * 100}%` }}
// //                                 title={`${data.label}`}
// //                             ></div>
// //                             <span className="absolute text-white text-xs whitespace-nowrap" style={{
// //                                 transform: 'rotate(-65deg)',
// //                                 bottom: '-5px',
// //                                 transformOrigin: 'center',
// //                             }}>{data.label}</span>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // };


// const FinancialInfoPage: React.FC = () => {
//     const [financialInfo, setFinancialInfo] = useState<FinancialInfo | null>(null);

//     useEffect(() => {
//       const getFinancialInfo = async () => {
//         const data = await fetchAllFinancialInfo();
//         if (data.length > 0) {
//           setFinancialInfo(data[0]);
//         }
//       };
//       getFinancialInfo();
//     }, []);
//     return (
//         <div className="bg-white py-24">
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h1 className="text-4xl font-bold text-nsus-gray-900 mb-8">Work at NSUSLAB</h1>
                
//                 <div className="space-y-4 text-nsus-gray-700 leading-relaxed">
//                     <p>
//                         NSUS Group은 현재 북미, 유럽, 아시아 등 다양한 지역에 700명 이상의 임직원들이 일하고 있는 다국적 기업으로, iGaming 업계의 유니콘 입니다.
//                     </p>
//                     <p>
//                         NSUSLAB(엔서스랩)은 이러한 NSUS Group의 개발 스튜디오로서 그룹의 핵심적인 역할을 하고 있습니다.
//                     </p>
//                     <p>
//                         폭발적 성장에 따른 안정적인 수익과 건실한 재무상태를 바탕으로 지속적인 인재 영입과 개발 환경 개선에 많은 투자를 하고 있으며, 성과와 나눔의 복지 확장에도 힘쓰고 있습니다.
//                     </p>
//                 </div>
                
//                   <div className="my-16">
//                     {financialInfo && (
//                       <div>
//                         <h3 className="text-2xl font-bold text-nsus-gray-900 text-center mb-8">
//                           {financialInfo.title}
//                         </h3>
//                         <img 
//                           src={financialInfo.imageUrl} 
//                           alt={financialInfo.title} 
//                           className="w-full h-auto rounded-lg shadow-xl" 
//                         />
//                       </div>
//                     )}
//                   </div>
                
//                 <div className="space-y-4 text-nsus-gray-700 leading-relaxed">
//                     <p>
//                         외부 투자에 의지하고 성공에 대한 막연한 희망으로 프로젝트를 진행하는 대부분의 게임 개발사와는 달리, 저희 NSUSLAB은 성공한 제품과 사업에 의한 안정적 매출을 기반으로 보다 큰 성공을 이루기 위해 달리고 있습니다.
//                     </p>
//                     <p>
//                         또한 투자자의 외압이 없는 독자적이며 신속한 의사결정 구조를 가지고 있습니다. 급변하는 시장에서 이와 같은 효율과 자율성은 큰 경쟁력이며, 투자자가 아닌 함께 고생한 구성원들에게 노력의 결실이 보다 많이 돌아갈 수 있는 환경입니다.
//                     </p>
//                     <p>
//                         우리는 단지 꿈만 꾸는 것이 아닌, 좋은 현실을 더 좋게 만들고자 합니다. 안정적인 개발 환경에서 세계 시장을 제패하기 위해 도전적 성장과 경험을 함께 할 좋은 인재들을 적극 영입하고 있습니다.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FinancialInfoPage;