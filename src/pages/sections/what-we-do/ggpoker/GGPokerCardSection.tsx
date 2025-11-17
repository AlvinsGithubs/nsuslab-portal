import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ggpokerOriginaltData } from "@/lib/ggpokerData";
import { useTilt } from "@/hooks/useTilt";

interface GGPokerCardProps {
  title: string;
  description: string;
  subTitle: string;
  image: string;
}

const GGPokerCard: React.FC<GGPokerCardProps> = ({
  title,
  subTitle,
  image,
}) => {
  const tiltProps = useTilt();

  return (
    <div
      {...tiltProps}
      className="min-h-[200px] border-hsla achievement-card group relative rounded-xl shadow-lg overflow-hidden cursor-pointer lg:h-72"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:blur-md"
      />
      <div
        className="absolute inset-0 bg-black opacity-30 duration-500 ease-in-out group-hover:opacity-50"
        aria-hidden="true"
      ></div>
      <div className="relative flex flex-col h-full p-6 lg:p-8">
        <h4 className="mt-auto font-bold text-nsus-gray-100">{title}</h4>
        <h6 className="text-nsus-gray-500">{subTitle}</h6>
      </div>
    </div>
  );
};

const GGPokerCardSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".section-title"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".achievement-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-12 lg:py-24"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4 flex flex-row items-baseline">
          <h4 className="text-nsus-gray-300 mb-4 text-3xl font-bold">{"Original Games and Tournaments"}</h4>
        </div>
        <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {ggpokerOriginaltData.map((data, index) => (
            <GGPokerCard
              key={index}
              title={data.title}
              subTitle={data.subTitle}
              description={data.description}
              image={data.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GGPokerCardSection;
