import React, { forwardRef, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import whowearevideo from "@/asset/videos/whatwedo-1.mp4";

interface WhoWeAreTitleSectionProps {}

const WhoWeAreTitleSection = forwardRef<HTMLElement, WhoWeAreTitleSectionProps>(
  ({}, ref) => {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);

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

    useLayoutEffect(() => {
      const videoElement = videoRef.current;
      const scope = ref as React.RefObject<HTMLElement>;

      if (!videoElement || !scope || !scope.current) return;

      const ctx = gsap.context(() => {
        const overlay = ".video-overlay";
        gsap.set(overlay, { opacity: 0.5 });

        let isFadingOut = false;
        
        const blackScreenDuration = 1.0; // 검은 화면 유지 시간 (초)
        const fadeInStartTime = blackScreenDuration;
        const fadeInTriggerWindow = fadeInStartTime + 1.0;
        const fadeOutDuration = 2.5; // 페이드 아웃 시간 (초)

        const handleTimeUpdate = () => {
          const duration = videoElement.duration;
          const currentTime = videoElement.currentTime;

          if (isNaN(duration)) return;

          if (currentTime >= duration - fadeOutDuration && !isFadingOut) {
            isFadingOut = true;
            gsap.to(overlay, { opacity: 1, duration: fadeOutDuration, ease: "none" });
          }

          if (
            currentTime >= fadeInStartTime &&
            currentTime < fadeInTriggerWindow &&
            isFadingOut
          ) {
            isFadingOut = false;
            gsap.to(overlay, {
              opacity: 0.5,
              duration: 2.0,
              ease: "power2.out",
            });
          }
        };

        videoElement.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
          videoElement.removeEventListener("timeupdate", handleTimeUpdate);
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
        <div className="video-overlay absolute top-0 left-0 w-full h-full bg-black z-0"></div>
      </section>
    );
  }
);

export default WhoWeAreTitleSection;