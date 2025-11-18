import React, { useRef, useLayoutEffect, useState } from "react";
import { ggpokerData, BentoGridItem } from "@/lib/whatwedoData";
import { achievementData } from "@/lib/whoweareData";
import { ggpokerSecurityData } from "@/lib/ggpokerData";
import { BentoTilt, TextCard } from "@/components/BentoGridComponents";
import ggpoker_logo_big_white from "@/asset/imgs/ggpoker_logo_big_white.png";
import whoweare_ggpoker from "@/asset/imgs/about-us-Img/whoweare_ggpoker.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface GGPokerItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const GGPokerItem: React.FC<GGPokerItemProps> = ({
  title,
  description,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-neutral-800 py-5">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left text-white transition-colors hover:text-gray-300"
        aria-expanded={isOpen}
      >
        <h4 className="text-lg md:text-xl font-medium text-nsus-gray-200">
          {title}
        </h4>
        <span className="text-2xl ml-4">{isOpen ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "1rem" },
              collapsed: { opacity: 0, height: 0, marginTop: "0rem" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pr-8 overflow-hidden"
          >
            <p className="text-gray-400 md:whitespace-pre-line">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GGPokerSection: React.FC = () => {
  const data = ggpokerData as BentoGridItem[];
  const { t } = useLanguage();
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const accordionSectionRef1 = useRef<HTMLDivElement>(null);
  const accordionSectionRef2 = useRef<HTMLDivElement>(null);
  const featureHeaderRef = useRef<HTMLHeadingElement>(null);
  const featureListItemsRef = useRef<HTMLDivElement[]>([]);

  const [openAccordionId, setOpenAccordionId] = useState<string | null>(
    achievementData[0]?.title || null
  );

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
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
      animateOnScroll(headerSectionRef.current);
      animateOnScroll(accordionSectionRef1.current);
      animateOnScroll(accordionSectionRef2.current);
      animateOnScroll(featureHeaderRef.current);

      featureListItemsRef.current.forEach((el) => {
        animateOnScroll(el);
      });
    });

    return () => ctx.revert();
  }, []);

  const renderMedia = (item: BentoGridItem) => {
    const className = "w-full h-auto rounded-lg object-cover";

    if (item.mediaType === "video" && item.mediaSrc) {
      return (
        <video
          src={item.mediaSrc}
          loop
          muted
          autoPlay
          playsInline
          className={className}
        />
      );
    }

    if (item.mediaType === "image" && item.mediaSrc) {
      return (
        <img
          src={item.mediaSrc}
          alt={String(item.title)}
          className={className}
        />
      );
    }

    return null;
  };

  const renderDefaultItem = (item: BentoGridItem) => {
    return (
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-48 w-full">
        <div className="w-full md:w-2/5 md:order-1">{renderMedia(item)}</div>
        <div className="w-full md:w-2/5 md:order-2">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-base md:text-lg text-white opacity-80">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-black">
      <div ref={headerSectionRef}>
        <BentoTilt className="w-full">
          <div className="relative w-full max-w-screen-xl mx-auto overflow-hidden">
            <img
              src={whoweare_ggpoker}
              alt="GGPoker background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
            />
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent z-20"></div>
            <div className="relative z-10 flex flex-col justify-center py-24 min-h-[300px] lg:min-h-[600px] w-full">
              <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="max-w-screen-xl">
                  <img
                    src={ggpoker_logo_big_white}
                    alt="GGPoker Logo"
                    className="h-10 w-auto lg:h-16 mb-4 md:mb-8 object-contain"
                  />
                  <div>
                    <h3 className="whitespace-pre-line text-nsus-gray-300">
                      {t("ggpoker_title")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="item-point pt-12 md:pt-24 mt-12 md:mt-24 border-t border-neutral-800"
          ref={accordionSectionRef1}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <div className="item-title">
                <h4 className="text-3xl font-bold text-white">
                  {"About GGPoker"}
                </h4>
              </div>
            </div>

            <div className="md:col-span-1 grid grid-cols-1 gap-0">
              <h6 className="text-white opacity-80 mb-8 leading-relaxed">
                2017년 출범한 GGPoker는 포커에 대한 깊은 애정을 가진
                플레이어들로 구성된 팀이 심혈을 기울여 설계했습니다. 우리의
                비전은 그 어떤 플랫폼보다 GGPoker에서 더 큰 즐거움을 경험하며
                플레이할 수 있도록 하는 것입니다.
              </h6>

              {achievementData.map((achievement) => (
                <GGPokerItem
                  key={achievement.title}
                  title={achievement.title}
                  description={achievement.description}
                  isOpen={openAccordionId === achievement.title}
                  onClick={() => handleAccordionClick(achievement.title)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 mt-12 md:py-24">
          <h4 className="text-3xl font-bold text-white" ref={featureHeaderRef}>
            {"Features"}
          </h4>
          {data.map((item, index) => {
            switch (item.type) {
              case "default":
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) featureListItemsRef.current[index] = el;
                    }}
                  >
                    <BentoTilt className="w-full">
                      {renderDefaultItem(item)}
                    </BentoTilt>
                  </div>
                );
              case "textOnly":
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) featureListItemsRef.current[index] = el;
                    }}
                  >
                    <BentoTilt className="w-full">
                      <TextCard title={item.title} />
                    </BentoTilt>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        <div
          className="item-point py-12 md:pt-24 mt-12 md:mt-24 border-t border-neutral-800"
          ref={accordionSectionRef2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <div className="item-title">
                <h4 className="text-3xl font-bold text-white">
                  {"GGPoker's Security"}
                </h4>
              </div>
            </div>

            <div className="md:col-span-1 grid grid-cols-1 gap-0">
              <h6 className="text-white opacity-80 mb-8 leading-relaxed">
                온라인 포커에 참여하고자 하신다면, GGPoker는 안전하고 매력적인
                플랫폼을 제공합니다. GGPoker는 플레이어의 안전과 보안을
                최우선으로 생각하며, 최첨단 기술을 활용하여 개인 및 금융
                데이터를 보호합니다. 이 사이트는 가장 엄격한 라이선스 및 규제
                조건 하에 운영되므로, 플레이어는 자신이 안전하고 공정하며 신뢰할
                수 있는 온라인 포커 환경에 참여하고 있음을 확신할 수 있습니다.
              </h6>

              {ggpokerSecurityData.map((achievement) => (
                <GGPokerItem
                  key={achievement.title}
                  title={achievement.title}
                  description={achievement.description}
                  isOpen={openAccordionId === achievement.title}
                  onClick={() => handleAccordionClick(achievement.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GGPokerSection;
