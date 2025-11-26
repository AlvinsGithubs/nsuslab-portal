import React, { useEffect, useContext, useRef, useState, useLayoutEffect } from "react";
import Lottie from "lottie-react";
import { benefitsData } from "@/lib/benefitsData";
import { NavbarThemeContext } from "@/App";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BenefitsPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  const main = useRef<HTMLDivElement>(null);

  // [State] 현재 열려 있는 상세 아이템의 ID (형식: "categoryIndex-detailIndex")
  // 초기값 "0-0": 첫 번째 카테고리의 첫 번째 항목이 열려있음
  const [openDetailId, setOpenDetailId] = useState<string | null>("0-0");

  // [Ref] 애니메이션을 위한 상세 내용(Description) 요소들 저장
  const detailContentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  // 1. 전체 섹션 스크롤 등장 애니메이션 (기존 유지)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, main);
    return () => ctx.revert();
  }, []);

  // 2. 모바일 아코디언 애니메이션 로직 (Deep Level)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    
    // 데스크탑이면 애니메이션 로직 무시 및 스타일 초기화
    if (isDesktop) {
      detailContentRefs.current.forEach((el) => {
        gsap.set(el, { clearProps: "height,opacity,display" });
      });
      return;
    }

    // 모바일: 상태에 따라 높이 애니메이션
    detailContentRefs.current.forEach((element, id) => {
      if (!element) return;
      
      const isOpen = id === openDetailId;

      if (isOpen) {
        gsap.to(element, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          display: "block"
        });
      } else {
        gsap.to(element, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          display: "none", // 접근성 및 레이아웃을 위해 닫히면 숨김
          onComplete: () => {
             if(element) element.style.display = "none";
          }
        });
      }
    });
  }, [openDetailId]);

  const toggleDetail = (id: string) => {
    setOpenDetailId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-24 mt-12" ref={main}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <h2 className="font-bold text-nsus-gray-900 mb-24 text-3xl md:text-4xl">
          Benefits
        </h2>

        <div>
          {benefitsData.map((category, catIndex) => (
            <div
              key={category.title}
              className="benefit-item flex flex-col md:flex-row md:items-start md:border-t border-gray-300 py-24 first:pt-0 first:border-t-0"
            >
              {/* ===========================
                  Left Column (Title & Lottie)
                  - 항상 노출 (모바일 상단 / 데스크탑 좌측 Sticky)
               =========================== */}
              <div className="md:w-2/5 md:pr-8 mb-8 md:mb-0">
                <div className="md:sticky md:top-24 text-center md:text-left">
                  <h4 className="text-nsus-gray-900 text-2xl md:text-2xl font-bold mb-4 md:mb-0">
                    {category.title}
                  </h4>
                  <div className="flex justify-center md:justify-start">
                    <Lottie
                      animationData={category.lottieAnimation}
                      className="w-40 h-40 md:w-48 md:h-48 mt-0 md:mt-6"
                    />
                  </div>
                </div>
              </div>

              {/* ===========================
                  Right Column (Details List)
                  - 데스크탑: 리스트 전체 노출
                  - 모바일: 개별 아이템 아코디언
               =========================== */}
              <div className="flex-1 w-full space-y-4 md:space-y-10">
                {category.details.map((detail, detIndex) => {
                  const uniqueId = `${catIndex}-${detIndex}`;
                  const isOpen = openDetailId === uniqueId;

                  return (
                    <div key={detail.subTitle} className="border-b border-gray-100 md:border-none pb-4 md:pb-0 last:border-0">
                      
                      {/* SubTitle (Accordion Trigger on Mobile) */}
                      <div 
                        onClick={() => toggleDetail(uniqueId)}
                        className="flex justify-between items-start cursor-pointer md:cursor-auto group select-none md:select-text"
                      >
                        <h5 className={`font-semibold text-lg transition-colors duration-300 md:text-nsus-gray-900 ${isOpen ? "text-nsus-blue" : "text-nsus-gray-900"}`}>
                          {detail.subTitle}
                        </h5>
                        
                        {/* Mobile Chevron */}
                        <div className="md:hidden pt-1 pl-4">
                            <ChevronDown 
                                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-nsus-blue" : "rotate-0"}`}
                            />
                        </div>
                      </div>

                      {/* Description (Collapsible Content) */}
                      <div
                        ref={(el) => {
                            if (el) detailContentRefs.current.set(uniqueId, el);
                            else detailContentRefs.current.delete(uniqueId);
                        }}
                        className="overflow-hidden h-0 opacity-0 md:h-auto md:opacity-100 md:block md:overflow-visible"
                      >
                        <p className="text-nsus-gray-700 leading-relaxed whitespace-pre-line mt-3 md:mt-3 text-sm md:text-base">
                          {detail.description}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsPage;