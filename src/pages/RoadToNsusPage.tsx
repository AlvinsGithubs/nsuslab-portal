import React, { useContext, useEffect, useState, useRef } from "react";
import ChevronDownIcon from "../components/icons/ChevronDownIcon";
import { NavbarThemeContext } from "@/App";
import { gsap } from "gsap";
import { processSteps, faqData } from "@/lib/careerData";

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
        <h2 className="max-w-screen-xl px-4 sm:px-6 md:px-8 pt-24 py-12 mx-auto font-bold text-nsus-gray-900 pb-20 ">Road to NSUS</h2> 
        <div className="relative z-10 w-full bg-nsus-gray-200">
          <section className="max-w-screen-xl mx-auto bg-transparent hidden lg:block ">
            <div className="max-w-screen-xl mx-auto text-center ">
              <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-4 md:py-16">
                {processSteps.map((step, index) => (
                  <React.Fragment key={step.title}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-28 md:w-36 h-28 md:h-36 rounded-full flex items-center justify-center text-center p-1 md:p-2 shadow-lg bg-gradient-to-br from-white to-neutral-300`}
                      >
                        <p className="text-neutral-700 font-semibold">
                          {step.title.split("+")[0]}
                          <br />
                          {step.title.split("+")[1]}
                        </p>
                      </div>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="w-1 h-1 bg-nsus-gray-300 mx-1 hidden md:block"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <main>
        <section className="md:py-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol
              ref={processListRef}
              className="space-y-12 [counter-reset:step]"
            >
              {processSteps.map((step, index) => (
                <li
                  key={index}
                  className={`flex flex-col md:flex-row gap-4 md:gap-12 ${
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
                  <div className="md:w-3/4 md:pt-0">
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
        </section>

        <section className="bg-white py-12 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-nsus-gray-900 mb-4 md:mb-8">FAQ</h3>
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
