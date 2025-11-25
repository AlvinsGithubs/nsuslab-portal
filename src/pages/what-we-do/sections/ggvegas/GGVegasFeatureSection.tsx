import React, { useRef, useLayoutEffect, useState } from "react";
import { ggvegasData, BentoGridItem } from "@/lib/whatwedoData";
import { BentoTilt, TextCard } from "@/components/BentoGridComponents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// --- GGPokerItem 컴포넌트 (아코디언 UI) ---
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
            {/* 'whitespace-pre-line'을 사용하여 \n (줄바꿈)을 p태그에 적용 */}
            <p className="text-gray-400 md:whitespace-pre-line">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 아코디언 데이터 (번역 완료) ---
const accordionData1 = [
  {
    title: "About GGVegas",
    description: `세계 최대의 포커룸 제작사에서 GGVegas를 선보입니다. 게임에 대한 열정이 넘치는 열정적인 카지노 플레이어들이 처음부터 설계한 GGVegas는 스릴과 혁신이 만나는 곳입니다.

우리의 비전은 GGVegas 플레이어들이 다른 어느 곳보다 이곳에서 더 많은 즐거움을 경험하도록 하는 것입니다. 우리는 마음속으로부터 겜블러이며, 카지노 게임을 그 어느 때보다 더 흥미진진하고 몰입감 넘치며 매력적으로 만들고 있습니다.`,
  },
  {
    title: "Where Fun Meets Innovation",
    description: `GGVegas는 새롭고 짜릿하며 무엇보다도 재미있는 경험을 제공하는 데 중점을 둡니다. 우리는 무엇이 수백만 명의 사람들을 카지노 게임에 매료시키는지 이해하고 있으며, 잊을 수 없는 경험을 만들기 위해 이러한 요소들을 향상시키는 데 전념하고 있습니다.

다른 곳에서는 찾아볼 수 없는 최첨단 형식과 획기적인 소프트웨어 기능을 갖춘 GGVegas는 논스톱 액션을 여러분의 손끝으로 바로 전달합니다. 몇 분의 여유가 있든 몇 시간의 여유가 있든, 저희는 여러분을 위해 최고의 스릴을 최적화했습니다. 궁극의 게이밍을 경험할 준비가 되셨나요? 지금 바로 빠져보세요!`,
  },
];

const accordionData2 = [
  {
    title: "Next-Generation Gaming Software",
    description: `정밀함과 열정으로 제작된 GGVegas의 소프트웨어는 모바일, 태블릿, 데스크톱 등 모든 기기에서 원활하게 플레이할 수 있도록 맞춤 제작되었습니다. GGVegas 앱은 비교할 수 없는 재미와 공정성을 제공한다는 한 가지 목표를 가지고 처음부터 구축되었습니다. 혁신적인 기능으로 가득 찬 당사의 플랫폼은 플레이할 때마다 부드럽고 스릴 넘치는 경험을 보장합니다.`,
  },
  {
    title: "Safety & Security",
    description: `GGVegas는 다양한 결제 수단을 통해 안전하고 쉬운 입금을 지원하여 플레이어가 실제 현금 카지노 게임에 빠르게 접근할 수 있도록 보장합니다. 귀하의 모든 계정 정보는 GGVegas에서 안전하게 보호되며, 당사의 소프트웨어 플랫폼은 정보 보안에 대한 ISO 27001 인증을 획득했습니다.`,
  },
  {
    title: "Tested & Certified",
    description: `GGVegas의 소프트웨어 및 플랫폼의 모든 측면은 BMM Testlabs의 독립적이고 공정한 검토 하에 테스트 및 인증을 받았습니다. 게이밍 산업을 위한 제품의 인증 및 감시는 ISO/IEC 17065 표준을 준수하여 이루어집니다.`,
  },
  {
    title: "Responsible Gaming",
    description: `GGVegas는 플레이어들에게 가장 안전한 환경에서 좋아하는 게임을 즐길 수 있도록 제공하는 것을 자랑스럽게 생각합니다. 자세한 정보는 '건전한 게임 플레이(Responsible Gaming)' 페이지를 참조하십시오.`,
  },
  {
    title: "GGTeam",
    description: `우리는 단순한 개발자나 운영자가 아닙니다. 우리도 여러분과 같은 플레이어입니다. 숙련된 소프트웨어 개발자 및 카지노 운영자로 구성된 우리 팀은 GGVegas를 가장 스릴 넘치고 사용자 친화적인 플랫폼으로 만들었습니다. 그리고 우리를 대표하는 팀원들은 업계 최고입니다. 전설적인 Daniel Negreanu부터 포커 세계의 떠오르는 스타에 이르기까지, GGTeam은 탁월함을 상징합니다.`,
  },
];

// --- GGVegasFeatureSection 컴포넌트 ---
const GGVegasFeatureSection: React.FC = () => {
  const data = ggvegasData as BentoGridItem[];
  
  // GSAP Refs
  const accordionSectionRef1 = useRef<HTMLDivElement>(null);
  const featureHeaderRef = useRef<HTMLHeadingElement>(null);
  const featureListItemsRef = useRef<HTMLDivElement[]>([]);
  const accordionSectionRef2 = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLHeadingElement>(null);

  // Accordion States
  const [openAccordionId1, setOpenAccordionId1] = useState<string | null>(
    accordionData1[0]?.title || null
  );
  const [openAccordionId2, setOpenAccordionId2] = useState<string | null>(
    accordionData2[0]?.title || null
  );

  const handleAccordion1Click = (id: string) => {
    setOpenAccordionId1((prevId) => (prevId === id ? null : id));
  };
  const handleAccordion2Click = (id: string) => {
    setOpenAccordionId2((prevId) => (prevId === id ? null : id));
  };

  useLayoutEffect(() => {
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
      animateOnScroll(accordionSectionRef1.current);
      animateOnScroll(featureHeaderRef.current);
      featureListItemsRef.current.forEach((el) => {
        animateOnScroll(el);
      });
      animateOnScroll(accordionSectionRef2.current);
      animateOnScroll(sloganRef.current);
    });

    return () => ctx.revert();
  }, []);

  // GGPokerSection에서 renderMedia 헬퍼 가져오기
  const renderMedia = (item: BentoGridItem) => {
    // 유저가 마지막으로 제공한 코드의 높이(h-64)를 사용합니다.
    const className = "w-full h-64 rounded-lg object-cover";

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

  // GGPokerSection에서 renderDefaultItem 헬퍼 가져오기
  const renderDefaultItem = (item: BentoGridItem) => {
    return (
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-32 w-full">
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

  const otherItems = data.slice(1);

  return (
    <section className="bg-black py-12 md:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* --- 아코디언 섹션 1 --- */}
        <div
          className="item-point pt-12 md:pt-24 mt-12 md:mt-24 border-t border-neutral-800"
          ref={accordionSectionRef1}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <div className="item-title">
                <h4 className="text-3xl font-bold text-white">
                  About GGVegas
                </h4>
              </div>
            </div>
            <div className="md:col-span-1 grid grid-cols-1 gap-0">
              {accordionData1.map((item) => (
                <GGPokerItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  isOpen={openAccordionId1 === item.title}
                  onClick={() => handleAccordion1Click(item.title)}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* --- 기존 Features 리스트 섹션 --- */}
        <div className="flex flex-col gap-8 md:gap-12 mt-12 md:py-24">
          <h4 className="text-3xl font-bold text-white" ref={featureHeaderRef}>
            {"Features"}
          </h4>

          {otherItems.map((item, index) => {
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) featureListItemsRef.current[index] = el;
                }}
              >
                <BentoTilt className="w-full">
                  {item.type === "default" && renderDefaultItem(item)}
                  {item.type === "textOnly" && <TextCard title={item.title} />}
                </BentoTilt>
              </div>
            );
          })}
        </div>
        
        {/* --- 아코디언 섹션 2 --- */}
        <div
          className="item-point pt-12 md:pt-24 mt-12 md:mt-24 border-t border-neutral-800"
          ref={accordionSectionRef2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <div className="item-title">
                <h4 className="text-3xl font-bold text-white">
                  Casino Platform
                </h4>
              </div>
            </div>
            <div className="md:col-span-1 grid grid-cols-1 gap-0">
              {accordionData2.map((item) => (
                <GGPokerItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  isOpen={openAccordionId2 === item.title}
                  onClick={() => handleAccordion2Click(item.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GGVegasFeatureSection;