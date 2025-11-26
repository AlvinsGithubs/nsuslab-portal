import { forwardRef, useLayoutEffect, useRef, useState, useEffect } from "react";
import { featureData } from "@/lib/whoweareData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const FeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
  // Desktop용 Scroll Active Index
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mobile용 Click Active Index (초기값 0: 첫번째 항목 열림)
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftTitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressIndicatorRef = useRef<HTMLDivElement | null>(null);
  
  // 모바일 아코디언 컨텐츠 Refs
  const mobileContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Desktop & Initial GSAP Setup
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const section = sectionRef.current;
    const container = containerRef.current;
    const rightCol = rightColRef.current;
    const leftTitles = leftTitleRefs.current.filter(Boolean);
    const features = featureRefs.current.filter(Boolean);
    const progressFills = progressFillRefs.current.filter(Boolean);
    const progressIndicator = progressIndicatorRef.current;

    if (!section || !container || !features.length) return;

    const ctx = gsap.context(() => {
      // ---------------------------------------------------------
      // Desktop Animation
      // ---------------------------------------------------------
      mm.add("(min-width: 1024px)", () => {
        // [추가된 부분] 데스크탑 진입 시 모바일 아코디언 스타일 강제 초기화
        gsap.set(mobileContentRefs.current, { clearProps: "height,opacity" });

        gsap.set(features, { position: "absolute", inset: 0, opacity: 0, y: 0 });
        gsap.set(features[0], { opacity: 1, y: 0 });
        gsap.set(leftTitles, { opacity: 0, yPercent: 100 });
        gsap.set(leftTitles[0], { opacity: 1, yPercent: 0 });
        gsap.set(progressFills, { width: "0%" });
        gsap.set(progressIndicator, { opacity: 1, display: "block" });

        const tl = gsap.timeline();

        features.forEach((feature, i) => {
          if (i === 0) return;
          const prevFeature = features[i - 1];
          const prevTitle = leftTitles[i - 1];
          const currentTitle = leftTitles[i];

          tl.to({}, { duration: 1 })
            .to([prevFeature, prevTitle], {
              opacity: 0,
              yPercent: -100,
              duration: 1.2,
              ease: "power2.inOut",
            })
            .fromTo(
              [feature, currentTitle],
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.inOut",
                onStart: () => setActiveIndex(i),
                onReverseComplete: () => setActiveIndex(i - 1),
              },
              "<"
            );
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${features.length * 1200}`,
          pin: section,
          scrub: true,
          animation: tl,
          onLeave: () => {
            gsap.to(progressIndicator, { opacity: 0, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(progressIndicator, { opacity: 1, duration: 0.3 });
          },
        });

        features.forEach((_feature, i) => {
          const currentFill = progressFills[i];
          if (!currentFill) return;
          const anim = gsap.fromTo(
            currentFill,
            { width: "0%" },
            { width: "100%", ease: "none" }
          );
          ScrollTrigger.create({
            trigger: rightCol,
            start: `top+=${i * 1200} top`,
            end: `top+=${(i + 1) * 1200} top`,
            scrub: true,
            animation: anim,
            onLeave: () => gsap.set(currentFill, { width: "100%" }),
            onLeaveBack: () => gsap.set(currentFill, { width: "0%" }),
          });
        });
      });

      // ---------------------------------------------------------
      // Mobile Reset
      // ---------------------------------------------------------
      mm.add("(max-width: 1023px)", () => {
        gsap.set(features, { clearProps: "all" });
        gsap.set(progressIndicator, { display: "none" });
      });
    });

    return () => ctx.revert();
  }, []);

  // 2. Mobile Accordion Animation (수정됨)
  useEffect(() => {
    // [수정 핵심] 데스크탑인지 확인
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    // 데스크탑이면 아코디언 로직 실행 방지 및 스타일 초기화
    if (isDesktop) {
        gsap.set(mobileContentRefs.current, { clearProps: "height,opacity" });
        return; 
    }

    mobileContentRefs.current.forEach((content, index) => {
      if (!content) return;
      
      const isOpen = index === mobileExpandedIndex;
      
      if (isOpen) {
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });
  }, [mobileExpandedIndex]);

  const toggleAccordion = (index: number) => {
    setMobileExpandedIndex((prev) => (prev === index ? null : index));
    // 모바일 클릭 시에는 activeIndex도 업데이트 해줘야 배경색 변경 등이 자연스러움
    setActiveIndex(index);
  };

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className="w-full transition-colors duration-500 ease-in-out relative min-h-0 py-12 lg:py-0 lg:h-screen lg:min-h-screen"
      style={{
        backgroundColor: featureData[activeIndex]?.bgColor || featureData[0].bgColor,
      }}
    >
      <div
        ref={containerRef}
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-x-32 px-4 sm:px-6 lg:grid-cols-[0.5fr_0.8fr] lg:px-4"
      >
        {/* ===========================
            Mobile Title (New) 
            =========================== 
        */}
        <h1 className="w-full text-center text-4xl font-extrabold text-white my-12 lg:hidden">
          Who We Are
        </h1>


        {/* Left Column (Desktop Only Titles) */}
        <div className="hidden lg:flex lg:h-screen lg:flex-col lg:justify-start lg:py-64">
          <div
            className="relative"
            style={{ color: featureData[activeIndex]?.primaryTextColor }}
          >
            <div>
              <p className="absolute -left-10 -top-0 text-[10rem] font-extrabold opacity-20">
                {(activeIndex + 1).toString().padStart(2, "0")}
              </p>
              {featureData.map((feature, index) => (
                <p
                  key={index}
                  ref={(el) => { if (el) leftTitleRefs.current[index] = el; }}
                  className="absolute left-0 top-8 max-w-100 whitespace-pre-line text-2xl font-bold md:text-5xl"
                >
                  {feature.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Content) */}
        <div ref={rightColRef} className="relative w-full lg:col-start-2">
          {featureData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { if (el) featureRefs.current[index] = el; }}
              className={`
                flex flex-col justify-start 
                border-b border-white/20 last:border-none lg:border-none
                py-6 lg:py-64 lg:min-h-screen
              `}
            >
              {/* Mobile Header (Clickable) */}
              <div 
                onClick={() => toggleAccordion(index)}
                className="lg:hidden flex cursor-pointer items-start justify-between gap-4 w-full group"
              >
                <div className="flex flex-col gap-2">
                  <span 
                    className="text-sm font-bold uppercase opacity-60" 
                    style={{ color: feature.primaryTextColor }}
                  >
                    {feature.title}
                  </span>
                  
                  <h3
                    className="whitespace-pre-line text-2xl font-bold md:text-3xl mt-1"
                    style={{ color: feature.primaryTextColor }}
                  >
                    {feature.heading}
                  </h3>
                </div>

                <div className="pt-2">
                    <ChevronDown 
                        className={`w-6 h-6 transition-transform duration-300 ${mobileExpandedIndex === index ? "rotate-180" : "rotate-0"}`}
                        style={{ color: feature.primaryTextColor }}
                    />
                </div>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block">
                  <h3
                    className="whitespace-pre-line py-4 font-bold md:py-8 text-3xl lg:text-4xl"
                    style={{ color: feature.primaryTextColor }}
                  >
                    {feature.heading}
                  </h3>
              </div>

              {/* Content Body */}
              <div
                ref={(el) => { if (el) mobileContentRefs.current[index] = el; }}
                className="overflow-hidden h-0 opacity-0 lg:h-auto lg:opacity-100 lg:block"
              >
                <div className="pt-4 pb-2 lg:pt-0 lg:pb-0"> 
                    <h5 className="mb-4 whitespace-pre-line text-gray-200 !leading-[1.6] text-base lg:text-lg">
                    {feature.description}
                    </h5>
                    <h5 className="mb-4 whitespace-pre-line text-white font-bold !leading-[1.6] text-base lg:text-lg">
                    {feature.listItems}
                    </h5>

                    {feature.linkUrl && feature.linkText && (
                    <div className="mt-6">
                        <a
                        href={feature.linkUrl}
                        className="flex w-fit items-center gap-2 rounded-2xl bg-white px-6 py-2 text-sm lg:px-8 lg:text-base font-bold text-black transition-colors duration-300 ease-in-out hover:bg-nsus-blue hover:text-white"
                        >
                        {feature.linkText}
                        <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 hover:text-white" />
                        </a>
                    </div>
                    )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator (Desktop Only) */}
      <div
        ref={progressIndicatorRef}
        className="hidden lg:block absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
          {featureData.map((_, index) => (
            <div
              key={index}
              className="relative h-1 w-12 overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <div
                ref={(el) => { if (el) progressFillRefs.current[index] = el; }}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  backgroundColor:
                    featureData[activeIndex]?.primaryTextColor || "#ffffff",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeatureSection;