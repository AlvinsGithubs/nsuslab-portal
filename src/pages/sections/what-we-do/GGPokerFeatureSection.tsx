import React from "react";
import { ggpokerData } from "@/lib/whatwedoData"; 
import { BentoTilt, BentoCard, TextCard } from "@/components/BentoGridComponents"; 
import ggpoker_logo_big_white from "@/asset/imgs/ggpoker_logo_big_white.png"

const GGPokerFeatureSection: React.FC = () => {
  const renderBentoItem = (item: (typeof ggpokerData)[0]) => {
    switch (item.type) {
      case "default":
        return <BentoCard {...item} />;
      case "textOnly":
        return <TextCard title={item.title} />;
      default:
        return null;
    }
  };

  const [firstItem, ...otherItems] = ggpokerData;

  return (
  <section className="bg-black py-20">
    <div className="max-w-6xl mx-auto px-3 md:px-10">
     <div className="flex flex-col items-center gap-10 px-5 py-12 text-center">
        <div className="flex w-full justify-center">
          <img
            src={ggpoker_logo_big_white}
            alt="GGPoker Logo"
            className="h-10 w-auto lg:h-16"
          />
        </div>

        <div>
          <p className="whitespace-pre-line text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Guiness World Record Holding <br/> Online Poker Room
          </p>
          <p className="mx-auto mt-6 max-w-6xl whitespace-pre-line text-md leading-relaxed text-white opacity-80 lg:text-lg">
            2017년 출범한 GGPoker는 포커에 대한 깊은 애정을 가진 숙련된
            플레이어들로 구성된 팀이 처음부터 심혈을 기울여 설계했습니다.
            우리의 비전은 그 어떤 플랫폼보다 GGPoker에서 더 큰 즐거움을
            경험하며 플레이할 수 있도록 하는 것입니다. GGPoker는 포커의 진정한
            재미를 되찾아 드리고자 합니다.
          </p>
        </div>
      </div>

      {firstItem && (
        <BentoTilt
          key={firstItem.id}
          className="relative mb-7 h-60 w-full overflow-hidden rounded-md md:h-[50vh]"
        >
          {renderBentoItem(firstItem)}
        </BentoTilt>
      )}

      <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 md:h-[100vh] md:grid-rows-3 lg:gap-7 gap-4">
        {otherItems.map((item) => (
          <BentoTilt
            key={item.id}
            className={item.className}
          >
            {renderBentoItem(item)}
          </BentoTilt>
        ))}
      </div>
    </div>
  </section>
);
};

export default GGPokerFeatureSection;