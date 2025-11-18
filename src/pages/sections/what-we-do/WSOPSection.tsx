import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import { BentoTilt } from "@/components/BentoGridComponents";

const key_visual_Wsop_d =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/key_visual_Wsop_d.webp";
const wsop_intro_what_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_what_img1.webp";
const wsop_intro_events_schedule_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_events_schedule_img1.webp";
const wsop_intro_events_schedule_img2 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_events_schedule_img2.webp";
const wsop_intro_how_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_how_img1.webp";
const wsop_intro_history_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_history_img1.webp";
const wsop_intro_history_img2 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_history_img2.webp";
const wsop_intro_prizes_bracelets_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_prizes_bracelets_img1.webp";
const wsop_intro_prizes_bracelets_img2 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_prizes_bracelets_img2.webp";
const wsop_intro_poker_academy_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_poker_academy_img1.webp";
const wsop_intro_champions_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_champions_img1.webp";
const wsop_intro_tips_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_tips_img1.webp";
const wsop_intro_tips_img2 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_tips_img2.webp";
const wsop_intro_tips_img3 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_tips_img3.webp";
const wsop_intro_partnership_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_partnership_img1.webp";
const wsop_intro_why_play_img1 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_why_play_img1.webp";
const wsop_intro_ready_img2 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_ready_img2.webp";
const wsop_intro_ready_img3 =
  "https://ssl.gg-global-cdn.com/bd/front/img/web/wsop_wsop_intro_ready_img3.webp";

const wsopEventsData = [
  {
    title: "The Main Event",
    description:
      "WSOP 메인 이벤트는 전 세계 포커 토너먼트 시리즈 중 최고의 보석으로 여겨집니다. No-Limit Hold'em(노 리밋 홀덤) 형식으로 진행되며, 막대한 상금 풀과 인생을 바꿀 수 있는 상금으로 유명합니다. 메인 이벤트 우승자는 수백만 달러의 상금뿐만 아니라 '포커 세계 챔피언'이라는 권위 있는 타이틀을 획득하게 됩니다.",
  },
  {
    title: "Side Events",
    description:
      "메인 이벤트 외에도 WSOP는 오마하, 세븐 카드 스터드, 믹스 게임 등 다양한 포커 변형을 특징으로 하는 다채로운 사이드 이벤트를 포함합니다. 이 이벤트들은 여러 종목에 걸쳐 자신의 기술을 시험해보고자 하는 플레이어들에게 완벽합니다. Pot-Limit Omaha Hi-Lo, H.O.R.S.E., Dealer's Choice와 같은 인기 있는 형식들이 있으며 지난 몇 년간 Dealer's Choice, 바두기, 미스터리 바운티 토너먼트 등 더 많은 변형이 추가되었습니다.",
  },
  {
    title: "WSOP Online",
    description:
      "GGPoker는 WSOP를 온라인으로 가져와 혁신을 일으켰습니다. WSOP 온라인 시리즈는 플레이어들에게 집에서 편안하게 브레이슬릿과 막대한 상금 풀을 놓고 경쟁할 기회를 제공합니다. GGPoker에서는 예선 및 새틀라이트가 정기적으로 운영되어, 그 어느 때보다 쉽게 WSOP에 참여할 수 있게 되었습니다. 이 시리즈에는 터보 넉아웃, 프리즈아웃과 같이 다양한 선호도와 시간 제약이 있는 플레이어들을 위한 독특한 온라인 전용 이벤트도 포함됩니다.",
  },
  {
    title: "WSOP Circuit Events",
    description:
      "WSOP 서킷은 전 세계적으로 개최되는 지역 토너먼트로, 플레이어들에게 서킷 링을 놓고 경쟁하고 WSOP 글로벌 챔피언십에 참가할 자격을 얻을 기회를 제공합니다. 각 서킷 스톱은 적절한 바이인과 권위 있는 WSOP 링을 획득할 기회와 함께 다양한 이벤트를 포함합니다. 서킷 이벤트는 또한 라이브 토너먼트 경험을 쌓고 더 높은 스테이크의 WSOP 이벤트로 나아가려는 신규 플레이어들에게 디딤돌 역할을 합니다.",
  },
];

const wsopHowToQualifyData = [
  {
    title: "Online Satellites",
    description:
      "GGPoker는 모든 예산에 맞는 바이인의 WSOP 새틀라이트 토너먼트를 운영합니다. 이 새틀라이트를 통해 메인 이벤트를 포함한 다양한 WSOP 이벤트의 참가권을 획득할 수 있습니다.",
  },
  {
    title: "Direct Buy-Ins",
    description:
      "뱅크롤이 충분한 플레이어들은 항상 직접 바이인하는 옵션을 선택할 수 있습니다. GGPoker의 온라인 플랫폼은 WSOP 이벤트에 원활하게 바이인할 수 있는 프로세스를 제공합니다.",
  },
  {
    title: "Promotions and Freerolls",
    description:
      "WSOP 패키지 및 기타 흥미로운 상금이 포함된 GGPoker의 독점 프로모션과 프리롤을 주목해 주세요.",
  },
];

const wsopPrizesData = [
  {
    title: "Prize Pools",
    description:
      "WSOP 이벤트는 정기적으로 수백만 달러 상당의 상금 풀을 특징으로 합니다. 메인 이벤트만 해도 (팬데믹이었던 2020년 제외) 2004년 이후 매년 총상금 풀이 5천만 달러를 초과하며 참가자들에게 인생을 바꿀 기회를 제공합니다. 2024년 메인 이벤트 상금 풀은 9,400만 달러에 달해 WSOP의 지속적인 성장과 인기를 입증했습니다.",
  },
  {
    title: "Historical Evolution of Prizes",
    description:
      "WSOP 초기에는 상금 풀이 훨씬 적었으며, 챔피언들은 오늘날의 상금에 비하면 일부에 불과한 금액을 받았습니다. WSOP는 계속해서 세계에서 가장 큰 포커 상금을 주최하는 곳으로 알려져 있습니다.",
  },
  {
    title: "Prestige of the Bracelet",
    description:
      "WSOP 브레이슬릿을 획득하는 것은 금전적 보상 그 이상을 의미합니다. 이는 플레이어의 기술, 헌신, 그리고 포커 역사에서의 위치를 상징합니다. 가장 많은 WSOP 브레이슬릿 기록을 보유한 필 헬뮤트(Phil Hellmut)와 같은 전설적인 플레이어들은 이 시리즈에서 꾸준히 뛰어난 성적을 거두며 그들의 유산을 확고히 했습니다.",
  },
];

const wsopTipsData = [
  {
    title: "Know the Rules",
    description:
      "참가하려는 이벤트의 토너먼트 구조와 포커 규칙을 숙지하세요. 마주칠 수 있는 독특한 형식이나 변형에 특히 주의를 기울이세요.",
  },
  {
    title: "Understand Table Dynamics",
    description:
      "상대방을 관찰하고 그에 따라 전략을 조정하세요. 공격적인 블러핑이나 타이트한 플레이와 같은 플레이어 성향을 인식하면 우위를 점하는 데 도움이 될 수 있습니다.",
  },
  {
    title: "Manage Your Bankroll",
    description:
      "예산을 설정하고 그것을 지키세요. WSOP는 다양한 바이인의 이벤트를 제공하므로 모두를 위한 무언가가 있다는 것을 기억하세요. 절대로 재정적으로 무리하지 마세요.",
  },
  {
    title: "Practice Online",
    description:
      "라이브 WSOP 이벤트에 참가하기 전에 GGPoker의 온라인 플랫폼을 사용해 기술을 연마하고 토너먼트 경험을 쌓으세요. 초보자부터 실력 향상을 원하는 이들까지, 포커 학습에 도움이 되는 수많은 온라인 자료와 튜토리얼을 활용하세요.",
  },
  {
    title: "Stay Focused",
    description:
      "테이블에서 오랜 시간을 보내는 것은 정신적, 육체적으로 지칠 수 있습니다. 최고의 성과를 유지하기 위해 휴식을 취하고 수분을 충분히 섭취하세요. 세션 사이에 규칙적인 휴식을 취해 정신을 맑게 유지하세요.",
  },
  {
    title: "Avoid Common Mistakes",
    description:
      "지나치게 공격적으로 플레이하거나 손실을 만회하려다 순간에 휩쓸리지 마세요. 규율을 지키고 자신의 전략을 고수하세요.",
  },
  {
    title: "Listen to First-Timer Stories",
    description:
      "많은 과거 참가자들이 온라인이나 인터뷰를 통해 자신들의 경험을 공유합니다. 그들의 여정에서 배우는 것은 귀중한 통찰과 영감을 제공할 수 있습니다.",
  },
  {
    title: "Enjoy the Experience",
    description:
      "WSOP는 카드 게임만큼이나 동료애와 이야기가 중요합니다. 분위기를 받아들이고, 흥분을 만끽하며, 평생 지속될 추억을 만드세요.",
  },
];

const wsopPartnershipData = [
  {
    title: "Online Bracelet Events",
    description: "집을 떠나지 않고도 WSOP 브레이슬릿을 놓고 경쟁하세요.",
  },
  {
    title: "WSOP Satellites",
    description:
      "적은 비용으로 메인 이벤트를 포함한 권위 있는 이벤트에 참가할 자격을 얻으세요.",
  },
  {
    title: "Innovative Features",
    description:
      "GGPoker의 최첨단 소프트웨어는 SnapCam, 통합 스테이킹, 스마트 HUD와 같은 기능을 포함하여 여러분의 경험을 향상시킵니다.",
  },
];

const wsopWhyPlayData = [
  {
    title: "Accessibility",
    description:
      "사용자 친화적인 플랫폼과 광범위한 바이인 옵션을 갖춘 GGPoker는 모든 레벨의 플레이어가 WSOP에 쉽게 참여할 수 있도록 합니다.",
  },
  {
    title: "Global Reach",
    description:
      "GGPoker의 국제적인 입지는 전 세계의 플레이어들과 경쟁할 수 있음을 의미합니다.",
  },
  {
    title: "Record-Breaking Events",
    description:
      "GGPoker는 기록적인 WSOP 이벤트를 포함하여 역사상 가장 큰 온라인 포커 토너먼트 중 일부를 주최했습니다.",
  },
];

// --- 템플릿의 GGPokerItem 컴포넌트 재사용 ---
interface WSOPAccordionItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const WSOPAccordionItem: React.FC<WSOPAccordionItemProps> = ({
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

// --- 메인 섹션 컴포넌트 ---
const WSOPSection: React.FC = () => {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  // --- GSAP 애니메이션 로직 (템플릿과 동일) ---
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // GSAP 애니메이션을 위한 ref 배열 추가 헬퍼
  const addRef = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <section className="bg-black">
      <div ref={addRef}>
        <BentoTilt className="w-full">
          {/* 2. 이미지 컨테이너: rounded-lg 제거 */}
          <div className="relative w-full overflow-hidden">
            <img
              src={key_visual_Wsop_d}
              alt="WSOP 배경"
              /* 3. 이미지: rounded-lg 제거 */
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
            />
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent z-20"></div>

            <div className="relative z-10 flex flex-col justify-center py-24 min-h-[300px] lg:min-h-[600px] w-full">
              <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="w-full md:w-2/3">
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-8">
                    WSOP
                  </h2>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-nsus-gray-300">
                      The World Series of Poker
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
        {/* --- 2. What is the WSOP? (image-left) --- */}
        <ContentSection
          ref={addRef}
          title="What is the World Series of Poker (WSOP)?"
          text={
            <>
              <p className="mb-4">
                <strong>World Series of Poker (WSOP)</strong>는 라이브 및 온라인
                포커 토너먼트의 정점입니다. 1970년 창설 이래 WSOP는 매년 수만
                명의 플레이어를 끌어들이는 세계적인 현상으로 성장했습니다.
                전설적인 <strong>메인 이벤트</strong>부터 소규모 전문 토너먼트에
                이르기까지 WSOP는 모든 유형의 포커 플레이어에게 무언가를
                제공합니다.
              </p>
              <p className="mb-4">
                포커를 배우고자 하는 분들을 위해, 초보자와 기술 향상을 원하는
                이들을 위한 포괄적인 튜토리얼과 자료가 마련되어 있습니다.
              </p>
              <p>
                이 시리즈는 궁극의 포커 트로피로 여겨지는 탐나는{" "}
                <strong>WSOP 브레이슬릿</strong>을 수여합니다. WSOP 브레이슬릿을
                획득하는 것은 상금 그 이상입니다. 이는 탁월함의 상징이며 모든
                플레이어의 포커 경력에서 핵심적인 이정표입니다.
              </p>
            </>
          }
          media={
            <img
              src={wsop_intro_what_img1}
              alt="WSOP 액션"
              className="w-full h-auto rounded-lg object-cover"
            />
          }
          imagePosition="left"
        />

        {/* --- 3. WSOP Events and Schedule (image-right, using accordion) --- */}
        <ContentSection
          ref={addRef}
          title="WSOP Events and Schedule"
          text="WSOP는 모든 기술 수준과 뱅크롤의 플레이어들을 만족시키기 위해 설계된 다양한 이벤트 라인업을 특징으로 합니다. 다음은 WSOP 일정의 몇 가지 하이라이트입니다."
          accordionData={wsopEventsData}
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
          media={
            <div className="flex flex-col gap-4">
              <img
                src={wsop_intro_events_schedule_img1}
                alt="WSOP 이벤트"
                className="w-full h-auto rounded-lg object-cover"
              />
              <img
                src={wsop_intro_events_schedule_img2}
                alt="WSOP 일정"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          }
          imagePosition="right"
        />

        {/* --- 4. How to Qualify (image-left, using accordion) --- */}
        <ContentSection
          ref={addRef}
          title="How to Qualify for the WSOP"
          text="GGPoker 덕분에 WSOP 참가 자격을 얻는 것이 그 어느 때보다 쉬워졌습니다. 다음은 참가권을 확보하는 가장 인기 있는 방법입니다."
          accordionData={wsopHowToQualifyData}
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
          media={
            <img
              src={wsop_intro_how_img1}
              alt="WSOP 참가 자격"
              className="w-full h-auto rounded-lg object-cover"
            />
          }
          imagePosition="left"
        />

        {/* --- 5. History (image-right, no accordion) --- */}
        <ContentSection
          ref={addRef}
          title="The History of the WSOP"
          text={
            <>
              <p className="mb-4">
                WSOP는 1970년 베니 비니언(Benny Binion)에 의해 창설되었으며,
                원래 라스베이거스의 호스슈 카지노(Horseshoe Casino)에서
                개최되었습니다. 첫 번째 이벤트는 초청 캐시 게임이었고, 조니
                모스(Johnny Moss)가 동료들에 의해 최초의 챔피언으로 뽑혔습니다.
                이는 경쟁 포커의 초석이 될 시리즈의 시작을 알렸습니다.
              </p>
              <p className="mb-4">
                1970년대와 1980년대 내내 WSOP는 상금 풀과 플레이어 참여가
                증가함에 따라 더 넓은 청중을 끌어들이기 시작했습니다. 도일
                브런슨(Doyle Brunson), 스튜 언가(Stu Ungar), 필 헬뮤트(Phil
                Hellmut)와 같은 상징적인 챔피언들이 이 시기에 등장하여 각각 여러
                개의 브레이슬릿을 획득하며 그들의 유산을 확고히 했습니다.
              </p>
              <p className="mb-4">
                2003년, WSOP는 크리스 머니메이커(Chris Moneymaker)가 메인
                이벤트에서 믿기 힘든 우승을 차지한 덕분에 폭발적인 인기를
                얻었습니다. 39달러 온라인 새틀라이트를 통해 참가 자격을 얻은
                그의 승리는 전 세계적인 포커 붐을 일으켰고, 누구나 포커의
                위대함을 성취할 수 있는 토너먼트로서의 WSOP의 명성을 공고히
                했습니다.
              </p>
              <p className="mb-4">
                시리즈는 100만 달러 바이인을 특징으로 하며 자선기금으로 수백만
                달러를 모금한 <strong>Big One for One Drop</strong>과 같은
                새로운 이벤트를 도입하며 계속 진화했습니다. 2007년 WSOP는{" "}
                <strong>World Series of Poker Europe (WSOPE)</strong>의 론칭과
                함께 국제적으로 확장하여 WSOP의 흥분을 세계 무대로 가져왔습니다.
              </p>
              <p>
                최근에는 WSOP와 GGPoker 간의 파트너십을 통해 2020년 사상 최초의
                WSOP 온라인 시리즈가 탄생했습니다. 이 획기적인 계획은 역사상
                가장 큰 온라인 포커 상금 풀을 포함하여 참가 기록을 세웠습니다.
                WSOP는 역동적이고 끊임없이 진화하는 시리즈로 남아 있으며, 전
                세계 경쟁 포커의 기준을 계속 설정하고 있습니다.
              </p>
            </>
          }
          media={
            <div className="grid grid-cols-1 gap-4">
              <img
                src={wsop_intro_history_img1}
                alt="WSOP 역사 1"
                className="w-full h-auto rounded-lg object-cover"
              />
              <img
                src={wsop_intro_history_img2}
                alt="WSOP 역사 2"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          }
          imagePosition="right"
        />

        {/* --- 6. Prizes & Bracelets (image-right, using accordion) --- */}
        <ContentSection
          ref={addRef}
          title="WSOP Prizes and Bracelets"
          text="WSOP 이벤트에서 우승하는 것은 현금 이상의 의미가 있습니다. 각 토너먼트는 포커 성취의 궁극적인 상징이 된, 모두가 탐내는 WSOP 브레이슬릿을 수여합니다. 이 브레이슬릿은 복잡한 디자인을 특징으로 하며 금과 같은 귀금속으로 세심하게 제작됩니다. 수년에 걸쳐 브레이슬릿 디자인은 진화했으며, 최근 버전에는 루비, 다이아몬드 및 기타 보석이 포함되어 포커 세계에서의 그 위상을 반영합니다."
          accordionData={wsopPrizesData}
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
          media={
            <div className="flex flex-col gap-4">
              <img
                src={wsop_intro_prizes_bracelets_img1}
                alt="WSOP 상금"
                className="w-full h-auto rounded-lg object-cover"
              />
              <img
                src={wsop_intro_prizes_bracelets_img2}
                alt="WSOP 브레이슬릿"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          }
          imagePosition="right"
        />

        {/* --- 7. Poker Academy (image-left) --- */}
        <ContentSection
          ref={addRef}
          title="Poker Academy"
          text={
            <>
              <p className="mb-4">
                <strong>GGPoker 스쿨</strong>은 모든 수준의 포커 애호가들을 위한
                지식의 보고입니다. 막 시작했거나 고급 전략을 다듬고 싶다면,
                아카데미는 포커 기술을 향상시키는 데 도움이 되는 풍부한 자료를
                제공합니다.
              </p>
              <p>
                아카데미가 차별화되는 점은 최고의 포커 플레이어와 코치들의
                전문적인 조언입니다. 기본을 마스터하고 싶거나 경쟁 우위를
                확보하고자 한다면, GGPoker 스쿨은 포커에 관한 모든 것을 위한
                최고의 자료입니다.
              </p>
            </>
          }
          media={
            <img
              src={wsop_intro_poker_academy_img1}
              alt="포커 아카데미"
              className="w-full h-auto rounded-lg object-cover"
            />
          }
          imagePosition="left"
        />

        {/* --- 8. WSOP Champions (image-right) --- */}
        <ContentSection
          ref={addRef}
          title="WSOP Champions"
          text={
            <>
              <p className="mb-4">
                <strong>World Series of Poker</strong>는 포커 역사에 지울 수
                없는 족적을 남긴 챔피언들을 배출해 온 풍부한 유산을 가지고
                있습니다. 전설적인 도일 브런슨과 스튜 언가부터 다니엘 네그라누,
                필 헬뮤트와 같은 현대의 아이콘에 이르기까지{" "}
                <strong>WSOP 메인 이벤트</strong> 우승은 포커 성취의 정점으로
                간주됩니다.
              </p>
              <p>
                메인 이벤트의 <strong>상금 풀</strong>은 종종 천문학적인 액수에
                도달하여, 포커 기술과 인내심의 궁극적인 시험대가 됩니다. 과거
                챔피언들의 이야기, 그들의 전략, 그리고 승리는 새로운 세대의
                플레이어들에게 계속 영감을 주며, WSOP의 위상을 최고의 포커
                챔피언십으로 공고히 하고 있습니다.
              </p>
            </>
          }
          media={
            <img
              src={wsop_intro_champions_img1}
              alt="WSOP 챔피언"
              className="w-full h-auto rounded-lg object-cover"
            />
          }
          imagePosition="right"
        />

        {/* --- 9. Tips for First-Timers (image-left, using accordion) --- */}
        <ContentSection
          ref={addRef}
          title="Tips for WSOP First-Timers"
          text="WSOP에 처음 참가하는 것은 잊을 수 없는 경험이 될 수 있습니다. 다음은 준비에 도움이 되는 몇 가지 팁입니다."
          accordionData={wsopTipsData}
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
          media={
            <div className="grid grid-cols-1 gap-4">
              <img
                src={wsop_intro_tips_img1}
                alt="WSOP 팁 1"
                className="w-full h-auto rounded-lg object-cover"
              />
              <img
                src={wsop_intro_tips_img2}
                alt="WSOP 팁 2"
                className="w-full h-auto rounded-lg object-cover"
              />
              <img
                src={wsop_intro_tips_img3}
                alt="WSOP 팁 3"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          }
          imagePosition="left"
        />

        {/* --- 10. WSOP and GGPoker (image-right, using accordion) --- */}
        <ContentSection
          ref={addRef}
          title="WSOP and GGPoker: A Winning Partnership"
          text="GGPoker는 WSOP 경험의 핵심적인 부분이 되었습니다. WSOP의 공식 파트너로서 GGPoker는 다음을 통해 플레이어들에게 시리즈에 대한 독보적인 접근성을 제공합니다."
          accordionData={wsopPartnershipData}
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
          media={
            <img
              src={wsop_intro_partnership_img1}
              alt="GGPoker 파트너십"
              className="w-full h-auto rounded-lg object-cover"
            />
          }
          imagePosition="right"
        />

        {/* --- 11. Why Play WSOP with GGPoker (image-left, using accordion) --- */}
        <ContentSection
          ref={addRef}
          title="Why Play the WSOP with GGPoker?"
          text="GGPoker가 WSOP 여정을 시작하기에 가장 좋은 장소인 몇 가지 이유가 있습니다."
          accordionData={wsopWhyPlayData}
          openAccordionId={openAccordionId}
          handleAccordionClick={handleAccordionClick}
          media={
            <img
              src={wsop_intro_why_play_img1}
              alt="GGPoker에서 플레이"
              className="w-full h-auto rounded-lg object-cover"
            />
          }
          imagePosition="left"
        />

        {/* --- 12. Ready to Join? (image-right, no accordion) --- */}
        <ContentSection
          ref={addRef}
          title="Ready to Join the Action?"
          text={
            <>
              <p className="mb-4">
                World Series of Poker는 단순한 토너먼트 시리즈가 아닙니다. 이는
                우리 모두가 사랑하는 게임의 축제입니다. 수십 년에 걸쳐 WSOP는 전
                세계 포커 커뮤니티를 형성하고 다양한 배경의 플레이어들 간의
                연결을 촉진하며 포커를 합법적인 경쟁 스포츠로 확립했습니다.
              </p>
              <p className="mb-4">
                이 시리즈는 또한 포커 전략과 문화에 지대한 영향을 미쳤습니다.
                새로운 토너먼트 형식 도입과 온라인 포커 수용과 같은 WSOP의
                혁신은 게임을 글로벌 관객에게 접근 가능하게 유지하면서
                진화시키는 데 도움을 주었습니다.
              </p>
              <p className="mb-4">
                브레이슬릿을 쫓든, 뱅크롤을 쌓든, 아니면 단순히 높은 스테이크의
                경쟁의 스릴을 경험하고 싶든, WSOP는 모두를 위한 무언가를 갖추고
                있습니다.
              </p>
              <p>
                GGPoker는 WSOP로 가는 관문입니다. 지금 바로{" "}
                <strong>WSOP 새틀라이트</strong>를 탐색하고, 온라인 게임에서
                기술을 연마하며, 포커 영광의 순간을 준비하며 여정을 시작하세요.
                지금 가입하여 WSOP 역사의 일부가 되는 첫걸음을 내딛으세요.
              </p>
            </>
          }
          media={
            <div className="grid grid-cols-1 gap-4">
              <img
                src={wsop_intro_ready_img2}
                alt="참가 준비 2"
                className="w-full h-auto rounded-lg object-cover"
              />
              <img
                src={wsop_intro_ready_img3}
                alt="참가 준비 3"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          }
          imagePosition="right"
        />
      </div>
    </section>
  );
};

interface ContentSectionProps {
  title: string;
  text: React.ReactNode;
  media: React.ReactNode;
  imagePosition: "left" | "right";
  accordionData?: { title: string; description: string }[];
  openAccordionId?: string | null;
  handleAccordionClick?: (id: string) => void;
}

const ContentSection = React.forwardRef<HTMLDivElement, ContentSectionProps>(
  (
    {
      title,
      text,
      media,
      imagePosition,
      accordionData,
      openAccordionId,
      handleAccordionClick,
    },
    ref
  ) => {
    const textContent = (
      <div
        className={`w-full ${
          imagePosition === "left" ? "md:order-2" : "md:order-1"
        }`}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          {title}
        </h3>
        <div className="text-base text-white opacity-90">{text}</div>

        {accordionData && handleAccordionClick && (
          <div className="grid grid-cols-1 gap-0 mt-8">
            {accordionData.map((item) => (
              <WSOPAccordionItem
                key={item.title}
                title={item.title}
                description={item.description}
                isOpen={openAccordionId === item.title}
                onClick={() => handleAccordionClick(item.title)}
              />
            ))}
          </div>
        )}
      </div>
    );

    const mediaContent = (
      <div
        className={`w-full ${
          imagePosition === "left" ? "md:order-1" : "md:order-2"
        }`}
      >
        {media}
      </div>
    );

    return (
      <div
        className="item-point pt-12 md:pt-24 mt-12 md:mt-24 border-t border-neutral-800"
        ref={ref}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-28 w-full">
          {textContent}
          {mediaContent}
        </div>
      </div>
    );
  }
);

export default WSOPSection;
