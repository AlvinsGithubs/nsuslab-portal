import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { type FC, useLayoutEffect, useRef } from "react"; 

import ggvegas_casino from "@/asset/videos/ggvegas_casino.mp4";
import ggvegas_logo from "@/asset/imgs/ggvegas_logo.png";
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const GGVegasTitleSection: FC = () => {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null); 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    }, container);

    return () => ctx.revert();
  }, []); 

  return (
    <div ref={container}>
      <div id="about" className="min-h-screen w-screen">
        <div className="max-w-6xl mx-auto md:px-10 flex flex-col items-center gap-10 px-5 py-20 text-center">
          <div className="flex w-full justify-center">
            <img
              src={ggvegas_logo}
              alt="GGVegas Logo"
              className="h-10 w-auto lg:h-16"
            />
          </div>

          <div>
            <p className="whitespace-pre-line text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {t('ggvegas_title')}
            </p>
            <p className="mx-auto mt-6 max-w-6xl whitespace-pre-line text-md leading-relaxed text-white opacity-80 lg:text-lg pb-7">
              {t('ggvegas_desc')}
            </p>
          </div>
        </div>

        <div className="h-dvh w-screen" id="clip">
          <div className="mask-clip-path about-image">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
              <source src={ggvegas_casino} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GGVegasTitleSection;