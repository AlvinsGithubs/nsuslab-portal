import React from "react";
import { platformData } from "@/lib/whatwedoData"; 
import { BentoTilt, BentoCard, TextCard } from "@/components/BentoGridComponents";
import { useLanguage } from '@/contexts/LanguageContext';

const CPFeatureSection: React.FC = () => {
  const { t } = useLanguage();
  const renderBentoItem = (item: (typeof platformData)[0]) => {
    switch (item.type) {
      case "default":
        return <BentoCard {...item} />;
      case "textOnly":
        return <TextCard title={item.title} />;
      default:
        return null;
    }
  };

  const [, ...otherItems] = platformData;

  return (
  <section className="bg-black py-12 md:py-24">
    <div className="max-w-screen mx-auto px-4 sm:px-6 md:px-8">
     <div className="flex flex-col items-center gap-4 md:gap-8 py-12 text-center">
        <div>
          <h2 className="whitespace-pre-line text-white">
            {t('cp_title')}
          </h2>
          <h6 className="mx-auto max-w-screen-lg md:whitespace-pre-line text-white opacity-80">
            {t('cp_desc')}
          </h6>
        </div>
      </div>

      <div className="grid h-auto w-full grid-cols-1 md:grid-cols-4 md:h-[30vh] md:grid-rows-1 gap-4">
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

export default CPFeatureSection;