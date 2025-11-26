import React from "react";
import { platformData } from "@/lib/whatwedoData"; 
import { BentoTilt, BentoCard, TextCard } from "@/components/BentoGridComponents";

const CPFeatureSection: React.FC = () => {
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
  <section className="hidden lg:block bg-black py-12 md:py-24">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="grid h-auto w-full grid-cols-1 md:grid-cols-2 md:h-[60vh] md:grid-rows-2 gap-4">
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