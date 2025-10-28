import React, { useContext, useEffect, useState, useRef } from "react";
import ChevronDownIcon from "../components/icons/ChevronDownIcon";
import { NavbarThemeContext } from "@/App";
import { gsap } from "gsap";
import { processSteps, faqData } from "@/lib/careerData";
import roadtonsus from "@/asset/imgs/RoadtoNSUS.png";

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-nsus-gray-100 rounded-xl px-4 md:px-8 py-2 md:py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start text-left md:px-4"
      >
        <h6 className="font-semibold text-nsus-gray-700">
          <h4 className="text-nsus-blue mr-4">Q.</h4>
          <h6>{q}</h6>
        </h6>
        <ChevronDownIcon
          className={`w-6 h-6 text-nsus-gray-500 flex-shrink-0 transition-transform duration-300 items-center ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-nsus-gray-700 py-2 md:px-4">
          <h4 className="font-bold text-nsus-gray-700 mr-2">A.</h4>
          <p>{a}</p>
        </div>
      )}
    </div>
  );
};

const RoadToNsusPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  const processListRef = useRef<HTMLOListElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("li");

      steps.forEach((step) => {
        const title = step.querySelector("h4");
        const description = step.querySelector("ul");

        if (title && description) {
          gsap.set([title, description], {
            autoAlpha: 0,
            y: 75,
          });

          gsap.to([title, description], {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, processListRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const faqs = gsap.utils.toArray<HTMLElement>(":scope > div");

      if (faqs.length > 0) {
        gsap.set(faqs, { autoAlpha: 0, y: 75 });

        gsap.to(faqs, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: faqListRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, faqListRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white mx-auto">
      <div className="w-full mt-12 mb-24">
        <h2 className="max-w-screen-xl px-4 sm:px-6 md:px-8 pt-24 py-12 mx-auto font-bold text-nsus-gray-900 md:pb-16 ">
          Road to NSUSLAB
        </h2>
        <div className="relative z-10 w-full bg-nsus-gray-100">
          <div className="max-w-screen-xl mx-auto hidden md:block md:py-4 md:px-24">
            <img
              src={roadtonsus}
              alt="Road to NSUSLAB Process"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <main>
        <section className="md:py-6">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol ref={processListRef} className="space-y-8 [counter-reset:step]">
              {processSteps.map((step, index) => (
                <li
                  key={index}
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index > 0 ? "border-t border-nsus-gray-200 pt-12" : ""
                  }`}
                >
                  <div className="md:w-1/4">
                    <h5
                      className="
                                                text-nsus-gray-700 md:whitespace-pre-line font-semibold 
                                                relative md:pl-8 pb-2 md:pb-0
                                                before:absolute before:left-0 before:top-0 
                                                before:text-nsus-blue before:font-bold 
                                                before:[content:'0'counter(step)] before:[counter-increment:step]
                                            "
                    >
                      {step.title}
                    </h5>
                  </div>
                  <div className="md:w-3/4 md:pt-0 pb-12">
                    <ul className="text-sm md:text-base space-y-2 text-nsus-gray-700 list-disc list-outside pl-5">
                      {step.description.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="max-w-screen-xl mx-auto py-8 px-4 md:px-16 border-t border-nsus-gray-200">
            <ul className="caption space-y-2 text-nsus-gray-700 list-disc list-outside pl-5">
              {additionalNotices.map((notice, index) => (
                <li key={index}>{notice}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-12 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-nsus-gray-900 mb-4 md:mb-8">
              자주 묻는 질문(FAQ)
            </h3>
            <div ref={faqListRef} className="space-y-4 items-center">
              {faqData.map((faq, index) => (
                <FaqItem key={index} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RoadToNsusPage;

const additionalNotices: string[] = [
  "위 합류 여정은 기본 프로세스로, 상황에 따라 일부 변경될 수 있습니다.",
  "세부사항(대상 및 자격기준 등)은 공고별로 상이할 수 있으니 지원하는 공고의 내용을 반드시 확인하시기 바랍니다.",
  "지원서에 기재된 학력 및 경력사항 등 기재사항이 허위임이 판명될 경우 합격이 취소될 수 있습니다.",
  "장애인 및 국가유공자 등 취업보호대상자는 관계 법령에 따라 우대합니다.",
];
