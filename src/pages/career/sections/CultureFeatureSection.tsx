import { forwardRef, useLayoutEffect, useRef, useState, useEffect } from "react";
import { cultureFeatureData } from "@/lib/careerData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

const CultureFeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
  // Desktop Scroll Index
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mobile Accordion Index (초기값 0: 첫번째 항목 열림)
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftTitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressIndicatorRef = useRef<HTMLDivElement | null>(null);
  
  // 모바일 컨텐츠 Refs
  const mobileContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Desktop & Initial GSAP Setup
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const section = sectionRef.current;
    const container = containerRef.current;
    const rightCol = rightColRef.current; // rightColRef 사용 확인
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
        gsap.set(features, { position: "absolute", inset: 0 });
        gsap.set(features.slice(1), { opacity: 0 });
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
            gsap.to(progressIndicator, {
              opacity: 0,
              duration: 0.3,
              ease: "power1.out",
            });
          },
          onEnterBack: () => {
            gsap.to(progressIndicator, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.in",
            });
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

  // 2. Mobile Accordion Animation
  useEffect(() => {
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
    // 데스크탑 인디케이터 싱크를 위해 activeIndex도 업데이트
    setActiveIndex(index);
  };

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      }}
      // Mobile: min-h-0, py-12 / Desktop: h-screen
      className="w-full transition-colors duration-500 ease-in-out relative min-h-0 py-12 lg:py-0 lg:h-screen bg-nsus-gray-100 z-10"
    >
      <div
        ref={containerRef}
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-x-32 px-4 sm:px-6 lg:grid-cols-[0.5fr_0.8fr] lg:px-4"
      >
        {/* ===========================
            Mobile Title (New) 
            =========================== 
        */}
        <h1 className="w-full text-center text-3xl font-extrabold text-neutral-900 mb-10 lg:hidden">
          Ways of Working
        </h1>

        {/* Left Column (Desktop Only Titles) */}
        <div className="hidden lg:flex lg:h-screen lg:flex-col lg:justify-start py-20 lg:py-64">
          <div className="relative">
            <div>
              <p className="absolute -left-10 -top-0 text-[10rem] font-extrabold opacity-20 text-neutral-900">
                {(activeIndex + 1).toString().padStart(2, "0")}
              </p>
              {cultureFeatureData.map((feature, index) => (
                <p
                  key={index}
                  ref={(el) => {
                    if (el) leftTitleRefs.current[index] = el;
                  }}
                  className="absolute left-0 top-8 max-w-100 whitespace-pre-line text-2xl font-bold md:text-5xl text-neutral-900"
                >
                  {feature.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Content) */}
        <div ref={rightColRef} className="relative w-full lg:col-start-2">
          {cultureFeatureData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) featureRefs.current[index] = el;
              }}
              // Mobile: border-b added (Light Theme Colors)
              className={`
                flex flex-col justify-start
                border-b border-black/10 last:border-none lg:border-none
                py-6 lg:py-64 lg:h-full lg:min-h-screen
              `}
            >
              {/* ===========================
                Mobile Header (Clickable) 
                ===========================
              */}
              <div 
                onClick={() => toggleAccordion(index)}
                className="lg:hidden flex cursor-pointer items-start justify-between gap-4 w-full group"
              >
                <div className="flex flex-col gap-2">
                  {/* Category Title (Small) */}
                  <span className="text-sm font-bold uppercase opacity-60 text-neutral-900">
                    {feature.title}
                  </span>
                  
                  {/* Heading (Big) */}
                  <h3 className="text-neutral-900 text-2xl font-bold md:text-3xl mt-1 whitespace-pre-line">
                    {feature.heading}
                  </h3>
                </div>

                {/* Arrow Icon (Dark Color for Light Theme) */}
                <div className="pt-2">
                    <ChevronDown 
                        className={`w-6 h-6 text-neutral-900 transition-transform duration-300 ${mobileExpandedIndex === index ? "rotate-180" : "rotate-0"}`}
                    />
                </div>
              </div>

              {/* ===========================
                Desktop Header
                ===========================
              */}
              <div className="hidden lg:block">
                  {/* Desktop Only Heading */}
                  <h3 className="text-neutral-900 whitespace-pre-line py-4 font-bold md:py-8 text-3xl lg:text-4xl">
                    {feature.heading}
                  </h3>
              </div>
              
              {/* ===========================
                Collapsible Content
                ===========================
              */}
              <div 
                ref={(el) => { if (el) mobileContentRefs.current[index] = el; }}
                className="overflow-hidden h-0 opacity-0 lg:h-auto lg:opacity-100 lg:block"
              >
                <div className="pt-4 pb-2 lg:pt-0 lg:pb-0">
                    <h5 className="whitespace-pre-line text-neutral-600 !leading-[1.6] text-base lg:text-lg">
                        {feature.description}
                    </h5>
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
        <h6 className="hidden md:block text-nsus-gray-700 mb-6 font-bold text-center">
          NSUS Ways Of Working
        </h6>

        <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur-md shadow-lg">
          {cultureFeatureData.map((_, index) => (
            <div
              key={index}
              className="relative h-1 w-12 overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
            >
              <div
                ref={(el) => {
                  if (el) progressFillRefs.current[index] = el;
                }}
                className="absolute left-0 top-0 h-full rounded-full bg-black"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CultureFeatureSection;