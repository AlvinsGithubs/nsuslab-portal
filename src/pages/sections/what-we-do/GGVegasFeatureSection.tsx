import React from "react";
import { ggvegasData } from "@/lib/whatwedoData";
import {
  BentoTilt,
  BentoCard,
  TextCard,
} from "@/components/BentoGridComponents";

const GGVegasFeatureSection: React.FC = () => {
  const renderBentoItem = (item: (typeof ggvegasData)[0]) => {
    switch (item.type) {
      case "default":
        return <BentoCard {...item} />;
      case "textOnly":
        return <TextCard title={item.title} />;
      default:
        return null;
    }
  };

  const [, ...otherItems] = ggvegasData;

  return (
    <section className="bg-black py-20">
      <div className="max-w-6xl mx-auto px-3 md:px-10">
        <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 md:h-[240vh] md:grid-rows-6 lg:gap-7 gap-4">
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

export default GGVegasFeatureSection;
