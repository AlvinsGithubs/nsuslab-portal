import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { featureData } from "@/lib/whoweareData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const FeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftTitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressIndicatorRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(); // 미디어 쿼리 분리 핵심
    const section = sectionRef.current;
    const container = containerRef.current;
    const rightCol = rightColRef.current;
    const leftTitles = leftTitleRefs.current.filter(Boolean);
    const features = featureRefs.current.filter(Boolean);
    const progressFills = progressFillRefs.current.filter(Boolean);
    const progressIndicator = progressIndicatorRef.current;

    if (!section || !container || !features.length) return;

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        gsap.set(features, { position: "absolute", inset: 0, opacity: 0, y: 0 });
        gsap.set(features[0], { opacity: 1, y: 0 });
        gsap.set(leftTitles, { opacity: 0, yPercent: 100 });
        gsap.set(leftTitles[0], { opacity: 1, yPercent: 0 });
        gsap.set(progressFills, { width: "0%" });
        gsap.set(progressIndicator, { opacity: 1, display: "block" }); // 데스크탑에선 보임

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
            trigger: rightCol, // rightColRef 사용
            start: `top+=${i * 1200} top`,
            end: `top+=${(i + 1) * 1200} top`,
            scrub: true,
            animation: anim,
            onLeave: () => gsap.set(currentFill, { width: "100%" }),
            onLeaveBack: () => gsap.set(currentFill, { width: "0%" }),
          });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(features, { clearProps: "all" }); 
        gsap.set(progressIndicator, { display: "none" }); // 모바일에서 인디케이터 숨김

        features.forEach((feature, i) => {
          ScrollTrigger.create({
            trigger: feature,
            start: "top 60%", 
            end: "bottom 60%",
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      // 모바일: min-h-screen (내용따라 늘어남), 데스크탑: h-screen (고정)
      className="w-full transition-colors duration-500 ease-in-out relative min-h-screen lg:h-screen"
      style={{
        backgroundColor: featureData[activeIndex]?.bgColor || featureData[0].bgColor,
      }}
    >
      <div
        ref={containerRef}
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-x-32 px-4 sm:px-6 lg:grid-cols-[0.5fr_0.8fr] lg:px-4"
      >
        {/* Left Column (Desktop Titles) - 모바일에서는 숨김 */}
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
              className="flex min-h-screen flex-col items-start justify-start py-24 lg:py-64"
            >
              {/* Mobile Title (데스크탑 hidden) */}
              <div className="mb-8 flex items-center gap-4 pr-20 lg:hidden">
                <p
                  className="whitespace-pre-line text-6xl font-extrabold opacity-20"
                  style={{ color: feature.primaryTextColor }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <h3
                  className="whitespace-pre-line text-2xl font-bold"
                  style={{ color: feature.primaryTextColor }}
                >
                  {feature.title}
                </h3>
              </div>

              <h3
                className="whitespace-pre-line py-4 font-bold md:py-8 text-3xl lg:text-4xl"
                style={{ color: feature.primaryTextColor }}
              >
                {feature.heading}
              </h3>
              <h5 className="mb-4 whitespace-pre-line text-gray-200 !leading-[1.6] text-lg">
                {feature.description}
              </h5>
              <h5 className="mb-4 whitespace-pre-line text-white font-bold !leading-[1.6] text-lg">
                {feature.listItems}
              </h5>

              {feature.linkUrl && feature.linkText && (
                <div className="mt-6">
                  <a
                    href={feature.linkUrl}
                    className="flex items-center gap-2 rounded-2xl bg-white px-8 py-2 text-base font-bold text-black transition-colors duration-300 ease-in-out hover:bg-nsus-blue hover:text-white"
                  >
                    {feature.linkText}
                    <ArrowUpRight className="w-5 h-5 hover:text-white" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
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