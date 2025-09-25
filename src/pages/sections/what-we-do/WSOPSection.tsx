import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import wsop1 from "@/asset/imgs/wsopImg/wsop1.jpg";
import wsop2 from "@/asset/imgs/wsopImg/wsop2.jpg";
import plus1 from "@/asset/imgs/plusImg/plus1.avif";
import wsop_logo from "@/asset/imgs/wsop_plus_white.png";

gsap.registerPlugin(ScrollTrigger);

type ImageSource = string;

interface CardData {
  id: number;
  image: ImageSource;
  title: string;
  description: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    image: wsop1,
    title: "This outstanding object",
    description:
      "NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming Industry 전반에서 지속적으로 영향력을 확대해 나가고 있습니다.",
  },
  {
    id: 2,
    image: wsop2,
    title: "A greater object",
    description:
      "NSUS Group은 Poker의 살아 있는 전설 Daniel Negreanu 등, 세계 최고의 포커 플레이어들과 Ambassador 계약을 맺고 그들의 활동을 전폭 지원하고 있습니다.",
  },
  {
    id: 3,
    image: plus1,
    title: "WSOP+",
    description:
      "WSOP에 대해 알아야 할 모든 것이 손끝에서 펼쳐집니다. 지금 WSOP+를 만나보세요.",
  },
];

const WSOPSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animated-item",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="w-full bg-white py-20 px-4 md:px-12 text-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:px-8">
          <div className="flex w-full justify-center">
            <img
              src={wsop_logo}
              alt="WSOP Logo"
              className="h-10 w-auto lg:h-20"
            />
          </div>
          <p className="whitespace-pre-line text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black py-4">
            World Series of Poker
          </p>
          <p className="mx-auto max-w-6xl whitespace-pre-line text-md leading-relaxed text-black opacity-80 lg:text-lg">
            NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming
            Industry 전반에서 지속적으로 영향력을 확대하고 있습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="animated-item flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-200"
            >
              <div className="w-full aspect-square">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WSOPSection;
