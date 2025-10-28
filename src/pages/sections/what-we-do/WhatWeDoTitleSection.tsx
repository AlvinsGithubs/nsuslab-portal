import React, { useLayoutEffect } from "react";
import { gsap } from "gsap";

import video from "@/asset/videos/whatweDoVideo3.mp4";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatWeDoTitleSectionProps {}

const WhatWeDoTitleSection = React.forwardRef<
  HTMLElement,
  WhatWeDoTitleSectionProps
>(({}, ref) => {
  const { t } = useLanguage();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".main-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
      );
    }, ref as React.RefObject<HTMLElement>);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="!h-[110svh] w-full flex flex-col items-center justify-center overflow-hidden relative"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
        <div className="main-title section-head text-center max-w-6xl px-4 text-white whitespace-pre-line">
          {t("whatwedo_title")}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
    </section>
  );
});

export default WhatWeDoTitleSection;
