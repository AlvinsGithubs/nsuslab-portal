import React, { useEffect, useContext, useRef } from "react";
import Lottie from "lottie-react";
import { benefitsData } from "@/lib/benefitsData";
import { NavbarThemeContext } from "@/App";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BenefitsPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-24 mt-12" ref={main}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <h2 className="font-bold text-nsus-gray-900 mb-12 md:mb-24">
          Benefits
        </h2>

        {/* 복지 혜택 목록 컨테이너 */}
        <div>
          {benefitsData.map((category) => (
            <div
              key={category.title}
              className="benefit-item flex flex-col md:flex-row md:items-start border-t border-gray-300 py-12 lg:py-24 first:pt-0 first:border-t-0"
            >
              {/* 왼쪽 컬럼: 카테고리 제목 및 Lottie (데스크탑 기준) */}
              <div className="md:w-2/5 md:pr-8 mb-6 md:mb-0">
                <div className="sticky top-24">
                  <h4 className="text-nsus-gray-900">{category.title}</h4>
                  <Lottie
                    animationData={category.lottieAnimation}
                    className="w-48 h-48 mt-6"
                  />
                </div>
              </div>

              {/* 오른쪽 컬럼: 상세 내용 */}
              <div className="flex-1 space-y-10">
                {category.details.map((detail) => (
                  <div key={detail.subTitle}>
                    <h5 className="font-semibold text-nsus-gray-00 mb-3">
                      {detail.subTitle}
                    </h5>
                    <p className=" text-nsus-gray-700 leading-relaxed whitespace-pre-line">
                      {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsPage;