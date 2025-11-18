import { useRef, useLayoutEffect, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLanguage } from "@/contexts/LanguageContext";
import { BentoTilt } from "@/components/BentoGridComponents";
import ggvegas_logo from "@/asset/imgs/ggvegas_logo.png";
import ggvegas_main from "@/asset/imgs/ggvegas_main.avif"
import { HEADER_FIXED_HEIGHT } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const GGVegasTitleSection = forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const internalRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(internalRef.current);
      } else {
        ref.current = internalRef.current;
      }
    }
  }, [ref]);

  useLayoutEffect(() => {
    const navHeight = HEADER_FIXED_HEIGHT;
    if (internalRef.current) {
      internalRef.current.style.marginTop = `-${navHeight}px`;
      internalRef.current.style.paddingTop = `${navHeight}px`;
    }

    const animateOnScroll = (element: HTMLElement | null, y: number = 100) => {
      if (!element) return;
      gsap.set(element, { opacity: 0, y: y });
      ScrollTrigger.create({
        trigger: element,
        animation: gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }),
        start: "top 85%",
        once: false,
        toggleActions: "play none none reverse",
      });
    };

    const ctx = gsap.context(() => {
      animateOnScroll(headerSectionRef.current);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={internalRef} className="bg-black">
      <div ref={headerSectionRef}>
        <BentoTilt className="w-full">
          <div className="relative w-full overflow-hidden">
            <img
              src={ggvegas_main} 
              alt="GGVegas background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
            />
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent z-20"></div>
            <div className="relative z-10 flex flex-col justify-center py-24 min-h-[300px] lg:min-h-[600px] w-full">
              <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="w-full md:w-2/3">
                  <img
                    src={ggvegas_logo}
                    alt="GGVegas Logo"
                    className="h-10 w-auto lg:h-16 mb-4 md:mb-8 object-contain"
                  />
                  <div>
                    <h3 className="whitespace-pre-line text-nsus-gray-300">
                      {t("ggvegas_title")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>
      </div>
    </section>
  );
});

export default GGVegasTitleSection;
