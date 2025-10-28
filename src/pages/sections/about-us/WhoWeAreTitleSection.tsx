import React, { forwardRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import whowearevideo from "@/asset/videos/whatwedo-1.mp4";

interface WhoWeAreTitleSectionProps {}

const WhoWeAreTitleSection = forwardRef<HTMLElement, WhoWeAreTitleSectionProps>(
  ({}, ref) => {
    const { t } = useLanguage();

    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        gsap.fromTo(
          ".main-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
        );
      }, ref as React.RefObject<HTMLElement>);

      return () => ctx.revert();
    }, [ref]);

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
          <source src={whowearevideo} type="video/mp4" />
        </video>
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
          <h1 className="main-title section-head text-center max-w-screen-xl !leading-tight text-white whitespace-pre-line">
            {t("whoweare_title")}
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      </section>
    );
  }
);

export default WhoWeAreTitleSection;
