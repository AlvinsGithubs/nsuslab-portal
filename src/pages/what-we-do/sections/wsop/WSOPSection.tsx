import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BentoTilt } from "@/components/BentoGridComponents";
import { wsopData } from "@/lib/wsopData";
import WSOPContentSection from "./WSOPContentSection";

const WSOPSection: React.FC = () => {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const { hero, sections } = wsopData;

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const addRef = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateOnScroll = (element: HTMLElement | null, y: number = 100) => {
      if (!element) return;
      gsap.set(element, { opacity: 0, y: y });
      ScrollTrigger.create({
        trigger: element,
        animation: gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }),
        start: "top 85%",
        once: false,
        toggleActions: "play none none reverse",
      });
    };

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el) => {
        animateOnScroll(el);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black">
      {/* --- Hero Section --- */}
      <div ref={addRef}>
        <BentoTilt className="w-full">
          <div className="relative w-full overflow-hidden">
            <img
              src={hero.bgImage}
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
            />
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent z-20"></div>

            <div className="relative z-10 flex flex-col justify-center py-24 min-h-[300px] lg:min-h-[600px] w-full">
              <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="w-full md:w-2/3">
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-8">
                    {hero.title}
                  </h2>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-nsus-gray-300">
                      {hero.subtitle}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>
      </div>

      {/* --- Content Sections --- */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
        <WSOPContentSection
          ref={addRef}
          {...sections.intro}
          imagePosition="left"
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.events}
          imagePosition="right"
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.qualify}
          imagePosition="left"
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.history}
          imagePosition="right"
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.prizes}
          imagePosition="right"
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.academy}
          imagePosition="left"
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.champions}
          imagePosition="right"
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.tips}
          imagePosition="left"
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.partnership}
          imagePosition="right"
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.whyPlay}
          imagePosition="left"
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
        />

        <WSOPContentSection
          ref={addRef}
          {...sections.ready}
          imagePosition="right"
        />
      </div>
    </section>
  );
};

export default WSOPSection;