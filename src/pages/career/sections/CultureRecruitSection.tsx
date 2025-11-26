import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cultureRecruitData } from "@/lib/careerData";
import { useTilt } from "@/hooks/useTilt";

interface CultureRecruitCardProps {
  title: string;
  description: string;
  subTitle: string;
  image: string;
}

const CultureRecruitCard: React.FC<CultureRecruitCardProps> = ({
  title,
  subTitle,
  image,
}) => {
  const tiltProps = useTilt();

  return (
    <div
      {...tiltProps}
      className="min-h-[200px] border-hsla achievement-card group relative rounded-xl shadow-lg overflow-hidden cursor-pointer lg:h-96"
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
      <div className="relative flex flex-col h-full p-4 lg:p-8">
        <h5 className="mt-auto font-bold text-white">{title}</h5>
        <h5 className="font-bold text-white">{subTitle}</h5>
      </div>
    </div>
  );
};

const KeyAchievementSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement>(null);

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
    <>
      <section
        ref={sectionRef}
        className="w-full bg-nsus-gray-100 px-4 md:px-8 py-12 lg:py-24"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="lg:mb-12 text-center"></div>
          <h3 className="text-neutral-900 mb-4 lg:mb-12">
            {"이런 동료를 기다립니다"}
          </h3>
          <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {cultureRecruitData.map((data, index) => (
              <CultureRecruitCard
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

      {/* Final CTA Section */}
      <section ref={ctaRef} className="w-full py-12 px-4 bg-nsus-gray-200">
        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-4 md:px-12">
          <div className="text-center md:text-left">
            <h4 className="font-semibold whitespace-pre-line leading-relaxed text-gray-400">
              {
                "만약 당신이 그런 사람이라면,\n세상을 연결하고 즐거움을 주는 위대한 여정에"
              }
            </h4>
            <h4 className="font-bold whitespace-pre-line text-black leading-tight">
              {"당신이라는 출중한 플레이어가 꼭 필요합니다."}
            </h4>
          </div>

          <div className="mt-4 md:mt-0 flex-shrink-0">
            <a
              href="#/careers"
              className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-medium text-white bg-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">채용 공고 바로가기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-nsus-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyAchievementSection;
