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
        <div className="flex flex-col items-center gap-4 md:gap-8 py-12 text-center max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex w-full justify-center">
            <img
              src={ggvegas_logo}
              alt="GGVegas Logo"
              className="h-10 w-auto lg:h-16"
            />
          </div>

          <div>
            <h2 className="whitespace-pre-line text-white">
              {t('ggvegas_title')}
            </h2>
            <h6 className="mx-auto mt-4 md:mt-8 max-w-screen-lg md:whitespace-pre-line text-white opacity-80">
              {t('ggvegas_desc')}
            </h6>
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