import React from "react";
import { clubGGData } from "@/lib/whatwedoData"; 
import { BentoTilt, BentoCard, TextCard } from "@/components/BentoGridComponents"; 
import clubgg_logo from "@/asset/imgs/clubgg_logo.png"

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

  const [firstItem, ...otherItems] = clubGGData;

  return (
  <section className="bg-black pb-20">
    <div className="max-w-screen mx-auto px-3 md:px-10">
     <div className="flex flex-col items-center gap-10 px-5 py-6 text-center">
        <div>
          <p className="whitespace-pre-line text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            ClubGG
          </p>
          <p className="mx-auto max-w-6xl whitespace-pre-line text-md leading-relaxed text-white opacity-80 lg:text-lg">
            State of the art Subscription Poker
          </p>
        </div>
      </div>

      <div className="grid h-auto w-full grid-cols-1 md:grid-cols-4 md:h-[30vh] md:grid-rows-1 lg:gap-7 gap-4">
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

export default ClubGGFeatureSection;