import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { fetchAllFinancialInfo } from "@/lib/contentful";
import type { FinancialInfo } from "@/types";
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { NavbarThemeContext } from '@/App';

gsap.registerPlugin(ScrollToPlugin);

const AnimatedCounter: React.FC<{ to: number }> = ({ to }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        const element = ref.current;

        if (isInView && element) {
            const counter = { value: 0 };

            const controls = gsap.to(counter, {
                duration: 2,
                value: to,
                ease: "power2.out",
                onUpdate: () => {
                    element.innerText = Math.round(counter.value).toLocaleString();
                },
            });

            return () => {
                controls.kill();
            };
        }
    }, [isInView, to]);

    return <span ref={ref}>0</span>;
};

const barBarInitialVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { 
        scaleY: 1, 
        transition: {
            duration: 1.5,
            ease: "circOut",
        } 
    }
};

const FinancialInfoSection: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        if (navbarContext) {
            navbarContext.setNavbarTheme("dark");
        }
    }, [navbarContext]);

    const [_financialInfo, setFinancialInfo] = useState<FinancialInfo | null>(null);
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

    const fadeInVariants: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // 막대 그래프의 높이 데이터 - 불규칙하지만 전체적으로 증가하는 패턴
    const barData = [
        40, 41, 42, 56, 75, 65, 85, 150, 180, 185, 195, 200,
        205, 210, 180, 190, 220, 230, 210, 240, 260, 280, 290, 310,
        295, 330, 340, 350, 355, 350, 340, 400, 430, 410, 425, 420,
        480, 500, 510, 495, 505, 520, 580, 630, 680, 690, 700, 720
    ];
    const totalBars = barData.length;
    const viewBoxWidth = 1600;
    const horizontalPadding = 200; 
    const graphWidth = viewBoxWidth - (horizontalPadding * 2);
    const barGap = 5; 
    const barWidth = (graphWidth / totalBars) - barGap;

    return (
        <div className="bg-black text-white">
            <section className="relative flex flex-col items-center justify-center min-h-screen py-24 overflow-hidden px-4 sm:px-6 lg:px-8 ">
                <div className="absolute inset-0 z-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1600 1200">
                        <defs>
                            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>

                        {/* 1. 선 그래프 */}
                        <motion.path 
                            d="M 0 1000 Q 200 800, 400 750 T 800 550 T 1200 400 T 1600 300"
                            stroke="#1a2e64" 
                            strokeWidth="3" 
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ pathLength: { duration: 4, ease: "circOut" }, opacity: { duration: 1, delay: 0.5 } }}
                        />

                        {/* 2. 막대 그래프 */}
                        {barData.map((height, index) => {
                            const opacityValue = 0.2 + (index / totalBars) * 0.7; 
                            return (
                                <motion.rect
                                    key={index}
                                    x={horizontalPadding + (index * (barWidth + barGap))}
                                    y={1200 - height}
                                    width={barWidth}
                                    height={height}
                                    fill="url(#barGradient)"
                                    style={{ opacity: opacityValue, transformOrigin: 'bottom' }}
                                    variants={barBarInitialVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ 
                                        duration: 1.5,
                                        ease: "circOut",
                                        delay: 0.5 + index * 0.02
                                    }}
                                />
                            );
                        })}
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
                      className="h2 mb-12 text-center"
                      variants={fadeInVariants}
                    >
                        변화를 열망하는 사람들이 모여, <br /> 역사에 남을만한 변화를 만듭니다.
                    </motion.h1>
                    
                    <motion.div 
                      className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 text-left whitespace-nowrap"
                      variants={fadeInVariants}
                    >
                         <div className="p-2 lg:p-4">
                            <div className="flex items-baseline gap-2 lg:block">
                                <h5 className="text-sm lg:text-base text-gray-400 lg:mb-2">월간 활성 사용자</h5>
                                <h2 className="font-bold">
                                    <AnimatedCounter to={2480} />만 +
                                </h2>
                            </div>
                            <caption className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2 hidden lg:block">2024.12.31 기준</caption>
                        </div>
                        <div className="p-2 lg:p-4">
                            <div className="flex items-baseline gap-2 lg:block">
                                <h5 className="text-sm lg:text-base text-gray-400 lg:mb-2">누적 가입자 수</h5>
                                <h2>
                                    <AnimatedCounter to={3000} />만 +
                                </h2>
                            </div>
                            <caption className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2 hidden lg:block">2025.06.30 기준</caption>
                        </div>
                        <div className="p-2 lg:p-4">
                            <div className="flex items-baseline gap-2 lg:block">
                                <h5 className="text-sm lg:text-base text-gray-400 lg:mb-2">서비스 수</h5>
                                <h2>
                                    <AnimatedCounter to={100} />개 +
                                </h2>
                            </div>
                            <caption className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2 hidden lg:block">2025.08.26 기준</caption>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default FinancialInfoSection;