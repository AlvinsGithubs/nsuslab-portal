import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { cultureData } from "@/lib/whoweareData";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const CultureSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop Animation
      const desktopAnimation = gsap.matchMedia();
      desktopAnimation.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".animated-item",
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Mobile Animation (횡스크롤이라 큰 모션보다는 페이드인 정도가 깔끔함)
      desktopAnimation.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".animated-item",
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 lg:py-24 overflow-hidden text-black"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 className="animated-item text-black whitespace-pre-line text-center mb-8 lg:mb-24 text-2xl lg:text-3xl font-bold">
          {t("culture_title")}
        </h3>
        
        {/* [레이아웃 설명]
            모바일: flex-row + overflow-x-auto (가로 스크롤)
            데스크탑: grid (기존 유지)
         */}
        <div
          className="
            flex 
            md:grid md:grid-cols-3 
            gap-4 md:gap-6
            overflow-x-auto md:overflow-visible 
            snap-x snap-mandatory 
            pb-8 md:pb-0 
            -mx-4 px-4 md:mx-0 md:px-0 /* 모바일에서 좌우 여백 없이 스크롤되도록 */
            scrollbar-hide
          "
        >
          {cultureData.map((card) => (
            <a
              key={card.id}
              href={`#${card.linkTo}`}
              className="
                animated-item 
                group 
                relative
                flex flex-col 
                bg-white 
                overflow-hidden 
                rounded-2xl 
                border border-gray-200
                
                /* [모바일 사이즈 조정 핵심] */
                w-[85vw]         /* 화면의 85%만 차지 (다음 카드가 살짝 보임) */
                shrink-0         /* 찌그러짐 방지 */
                snap-center      /* 스크롤 시 중앙 정렬 */
                
                md:w-auto        /* 데스크탑은 자동 너비 */
                md:snap-align-none
              "
            >
              {/* 이미지 영역: 4:3 비율 유지 */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* 텍스트 영역: 모바일 패딩을 p-6로 줄여서 높이 최적화 */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <p className="mb-3 md:mb-4 font-bold text-lg md:text-xl">
                  {card.title}
                </p>
                <p className="text-gray-600 text-sm md:text-base flex-grow line-clamp-3 md:line-clamp-none">
                  {card.description}
                </p>

                <div className="inline-flex items-center pt-4 mt-auto">
                  <p className="text-black font-bold text-sm md:text-base group-hover:text-nsus-blue transition-colors">
                    {card.linkText}
                  </p>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 ml-1 group-hover:text-nsus-blue transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;