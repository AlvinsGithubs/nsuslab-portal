import React from "react";
import { clubGGData } from "@/lib/whatwedoData";
import {
  BentoTilt,
  BentoCard,
  TextCard,
} from "@/components/BentoGridComponents";

const ClubGGFeatureSection: React.FC = () => {
  const renderBentoItem = (item: (typeof clubGGData)[0]) => {
    switch (item.type) {
      case "default":
        return <BentoCard {...item} />;
      case "textOnly":
        return <TextCard title={item.title} />;
      default:
        return null;
    }
  };

  const [, ...otherItems] = clubGGData;

  return (
    <section className="bg-black py-12 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-4 md:gap-8 py-12 text-center">
          <div>
            <h2 className="whitespace-pre-line text-white"></h2>
          </div>
        </div>

        <div className="mb-4 flex flex-row items-baseline">
          <h4 className="text-nsus-gray-300 mb-4 text-3xl font-bold">
            {"CLUBGG - Create by the Biggest Poker Network"}
          </h4>
        </div>

        <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 md:h-[60vh] md:grid-rows-2 gap-4">
          {otherItems.map((item) => (
            <BentoTilt key={item.id} className={item.className}>
              {renderBentoItem(item)}
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubGGFeatureSection;
