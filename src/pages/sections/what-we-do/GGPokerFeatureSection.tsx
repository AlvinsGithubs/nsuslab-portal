import React from "react";
import { ggpokerData } from "@/lib/whatwedoData"; 
import { BentoTilt, BentoCard, TextCard } from "@/components/BentoGridComponents"; 
import ggpoker_logo_big_white from "@/asset/imgs/ggpoker_logo_big_white.png"
import { useLanguage } from '@/contexts/LanguageContext';

const GGPokerFeatureSection: React.FC = () => {
  const { t } = useLanguage();
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
            {t('ggpoker_title')}
          </p>
          <p className="mx-auto mt-6 max-w-6xl whitespace-pre-line text-md leading-relaxed text-white opacity-80 lg:text-lg">
            {t('ggpoker_desc')}
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