import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { fetchAllFinancialInfo } from "@/lib/contentful";
import type { FinancialInfo } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavbarThemeContext } from "@/App";
import {
  financialStatsData,
  financialSectionText,
  achievementData,
} from "@/lib/whoweareData";

const FinancialInfoSection: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("dark");
    }
  }, [navbarContext]);

  const [_financialInfo, setFinancialInfo] = useState<FinancialInfo | null>(
    null
  );

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

  // 막대 그래프 데이터 및 SVG 설정 - 자연스러운 불규칙 성장
  const barData = [
    74, 78, 78, 80, 92, 108, 110, 109, 102, 111, 122, 123, 116, 135, 128, 147,
    148, 158, 165, 172, 167, 183, 178, 198, 191, 220, 240, 262, 264, 270, 280,
    297, 310, 330, 320, 322, 325, 328, 332, 340, 325, 335, 328, 354, 345, 372,
    388, 400, 410, 430,
  ];
  const totalBars = barData.length;
  const viewBoxWidth = 1600;
  const viewBoxHeight = 900;
  const horizontalPadding = 20;
  const verticalPadding = 80;
  const graphWidth = viewBoxWidth - horizontalPadding * 2;
  const graphHeight = viewBoxHeight - verticalPadding * 2;
  const maxBarHeight = Math.max(...barData);
  const barGap = 4;
  const barWidth = graphWidth / totalBars - barGap;

  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 border-b border-neutral-800 py-12 lg:py-24">
        <div className="data-header mb-16 lg:mb-32 text-center">
          <h1>{financialSectionText.mainTitle}</h1>
        </div>

        <div className="data-view">
          <div className="item-header mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="item-title">
                <h4>{financialSectionText.studioTitle}</h4>
              </div>
              <div className="item-desc text-gray-200">
                <h6>{financialSectionText.studioDescription}</h6>
              </div>
            </div>

            <div className="item-visual relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
              <div className="absolute inset-0 z-0">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  viewBox="0 0 1600 900"
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop
                        offset="50%"
                        stopColor="#60a5fa"
                        stopOpacity="0.5"
                      />
                      <stop
                        offset="100%"
                        stopColor="#93c5fd"
                        stopOpacity="0.15"
                      />
                    </linearGradient>

                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop
                        offset="50%"
                        stopColor="#60a5fa"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="#93c5fd"
                        stopOpacity="0.4"
                      />
                    </linearGradient>

                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <radialGradient id="spotGlow" cx="50%" cy="30%">
                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity="0.15"
                      />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Background ambient glow */}
                  <ellipse
                    cx="800"
                    cy="450"
                    rx="700"
                    ry="400"
                    fill="url(#spotGlow)"
                  />

                  {/* Grid lines for depth */}
                  {[200, 350, 500, 650, 800].map((y) => (
                    <motion.line
                      key={y}
                      x1={horizontalPadding}
                      y1={y}
                      x2={viewBoxWidth - horizontalPadding}
                      y2={y}
                      stroke="rgba(59, 130, 246, 0.08)"
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  ))}

                  {/* Bars with enhanced gradient and glow */}
                  {barData.map((height, index) => {
                    const scaledHeight =
                      (height / maxBarHeight) * graphHeight * 0.75; // 높이 조정
                    const normalizedOpacity =
                      0.4 + (height / maxBarHeight) * 0.6;
                    return (
                      <motion.rect
                        key={index}
                        x={horizontalPadding + index * (barWidth + barGap)}
                        y={viewBoxHeight - verticalPadding - scaledHeight}
                        width={barWidth}
                        height={scaledHeight}
                        fill="url(#barGradient)"
                        rx="2"
                        style={{
                          opacity: normalizedOpacity,
                          transformOrigin: "bottom",
                          filter: index % 5 === 0 ? "url(#glow)" : "none",
                        }}
                        variants={barBarInitialVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                          duration: 1.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2 + index * 0.015,
                        }}
                      />
                    );
                  })}

                  {/* Smooth curve line overlay */}
                  <motion.path
                    d="M 20 720 Q 200 700, 400 650 T 800 450 T 1200 300 T 1600 200"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 1.2, delay: 0.8 },
                    }}
                  />

                  {/* Animated dots along the curve */}
                  {[
                    { x: 20, y: 650 },
                    { x: 533, y: 390 },
                    { x: 1067, y: 80 },
                    { x: 1580, y: 20 },
                  ].map((point, idx) => (
                    <motion.circle
                      key={idx}
                      cx={point.x}
                      cy={point.y}
                      r="7"
                      fill="#60a5fa"
                      filter="url(#glow)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 1.5 + idx * 0.3,
                        ease: "backOut",
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 z-5">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-neutral-400 rounded-full"
                    style={{
                      left: `${20 + i * 6}%`,
                      top: `${60 + (i % 3) * 10}%`,
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      y: [-30, -80],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex items-start p-8 lg:p-24 h-full">
                <motion.h2
                  className="text-white text-xl md:text-3xl font-bold tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {financialSectionText.visualTitle}
                </motion.h2>
              </div>
            </div>
          </div>

          <div className="item-point pb-8 md:pb-24 border-b border-neutral-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="item-point-title lg:col-span-1">
                <h4>{financialSectionText.statsTitle}</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4 lg:gap-8 lg:col-span-2">
                {financialStatsData.map((stat) => (
                  <StatBox key={stat.title} {...stat} />
                ))}
              </div>
            </div>
          </div>

          <div className="item-point pt-12 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-8 md:pr-64">
                {" "}
                <div className="item-title">
                  <h4>{financialSectionText.keyAchivementTitle}</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {achievementData.map((achievement) => (
                  <AchievementBox key={achievement.title} {...achievement} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInfoSection;

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
    },
  },
};

// 스탯 박스 서브 컴포넌트
interface StatBoxProps {
  title: string;
  value: number;
  unit: string;
  description: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  unit,
  description,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      gsap.set(el, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: el,
        animation: gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }),
        start: "top 85%",
        once: true,
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="bg-neutral-950 p-6 lg:p-10 rounded-2xl flex flex-col h-full opacity-0"
    >
      <p className="box-title text-gray-200 mb-8 font-semibold">{title}</p>
      <div className="box-value text-4xl md:text-5xl font-bold mb-6 flex items-baseline">
        <AnimatedCounter to={value} />
        <span className="text-2xl md:text-3xl ml-1">{unit}</span>
      </div>
      <div className="box-desc text-gray-400 text-xs md:text-sm mt-auto">
        {description}
      </div>
    </div>
  );
};

interface AchievementBoxProps {
  title: string;
  subTitle: string;
  description: string;
}

const AchievementBox: React.FC<AchievementBoxProps> = ({
  title,
  description,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      gsap.set(el, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: el,
        animation: gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }),
        start: "top 85%",
        once: true,
      });
    }
  }, []);

  return (
    <div ref={ref} className="flex flex-col opacity-0">
      <h4 className=" text-white md:whitespace-pre-line">{title}</h4>
      <p className="text-gray-400 md:whitespace-pre-line">{description}</p>
    </div>
  );
};
