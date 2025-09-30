import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { wsopCardData } from "@/lib/whatwedoData";
import wsop_logo from "@/asset/imgs/wsop_plus_white.png";
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const WSOPSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-24 lg:py-48 px-4 sm:px-6 md:px-8 text-black"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center">
          <div className="flex w-full justify-center">
            <img
              src={wsop_logo}
              alt="WSOP Logo"
              className="h-10 w-auto lg:h-20"
            />
          </div>
          <h6 className="font-semibold mx-auto max-w-screen-lg md:whitespace-pre-line text-nsus-gray-700 mt-4 md:mt-8">
            {t('wsop_desc')}
          </h6>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-12">
          {wsopCardData.map((card) => (
            <div
              key={card.id}
              className="animated-item flex flex-col bg-white overflow-hidden rounded-xl border border-gray-200"
            >
              <div className="w-full md:aspect-square">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="font-bold mb-4 uppercase">{card.title}</p>
                <p className="text-gray-600 flex-grow">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WSOPSection;
