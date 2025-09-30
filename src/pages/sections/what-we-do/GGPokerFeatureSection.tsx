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
  <section className="bg-black py-12 md:py-24">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
     <div className="flex flex-col items-center gap-4 md:gap-8 py-12 text-center">
        <div className="flex w-full justify-center">
          <img
            src={ggpoker_logo_big_white}
            alt="GGPoker Logo"
            className="h-9 w-auto lg:h-16"
          />
        </div>

        <div>
          <h2 className="whitespace-pre-line text-white">
            {t('ggpoker_title')}
          </h2>
          <h6 className="mx-auto mt-4 md:mt-8 max-w-screen-lg md:whitespace-pre-line text-white opacity-80">
            {t('ggpoker_desc')}
          </h6>
        </div>
      </div>

      {firstItem && (
        <BentoTilt
          key={firstItem.id}
          className="relative mb-4 h-60 w-full overflow-hidden rounded-md md:h-[50vh]"
        >
          {renderBentoItem(firstItem)}
        </BentoTilt>
      )}

      <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 md:h-[100vh] md:grid-rows-3 gap-4">
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