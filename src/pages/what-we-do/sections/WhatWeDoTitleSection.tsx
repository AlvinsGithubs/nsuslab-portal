import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import video from "@/asset/videos/whatweDoVideo3.mp4";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatWeDoTitleSectionProps {}

const WhatWeDoTitleSection = React.forwardRef<
  HTMLElement,
  WhatWeDoTitleSectionProps
>(({}, ref) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null); 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".main-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
      );
    }, ref as React.RefObject<HTMLElement>);
    return () => ctx.revert();
  }, [ref]); 

  useLayoutEffect(() => {
    const videoElement = videoRef.current;
    const scope = ref as React.RefObject<HTMLElement>;

    if (!videoElement || !scope || !scope.current) return;

    const ctx = gsap.context(() => {
      const overlay = ".video-overlay";
      
      gsap.set(overlay, { opacity: 0.5 });

      let isFadingOut = false; 

      const handleTimeUpdate = () => {
        const duration = videoElement.duration;
        const currentTime = videoElement.currentTime;

        if (isNaN(duration)) return;

        if (currentTime >= duration - 1 && !isFadingOut) {
          isFadingOut = true;
          gsap.to(overlay, { opacity: 1, duration: 1.0, ease: "none" });
        }
      };

      const handleVideoEnd = () => {
        videoElement.currentTime = 0;
        videoElement.play(); 

        gsap.to(overlay, {
          opacity: 0.5,
          duration: 2.0, 
          ease: "power2.out",
          onComplete: () => {
            isFadingOut = false; 
          },
        });
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }, scope);

    return () => ctx.revert();
  }, [ref]); 

  return (
    <section
      ref={ref}
      className="!h-[110svh] w-full flex flex-col items-center justify-center overflow-hidden relative"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
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
      <div className="video-overlay absolute top-0 left-0 w-full h-full bg-black z-0"></div>
    </section>
  );
});

export default WhatWeDoTitleSection;