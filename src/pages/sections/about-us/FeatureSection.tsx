import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { featureData } from "@/lib/whoweareData"; // 데이터 경로는 실제 프로젝트에 맞게 확인해주세요.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftTitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const leftTitles = leftTitleRefs.current.filter(Boolean);
    const features = featureRefs.current.filter(Boolean);

    if (!container || features.length === 0 || leftTitles.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          gsap.set(features, { position: "absolute", inset: 0 });
          gsap.set(features.slice(1), { opacity: 0 });
          gsap.set(features[0], { opacity: 1, y: 0 });
          gsap.set(leftTitles, { opacity: 0, yPercent: 100 });
          gsap.set(leftTitles[0], { opacity: 1, yPercent: 0 });

          const tl = gsap.timeline();

          features.forEach((feature, i) => {
            if (i === 0) return;

            const prevFeature = features[i - 1];
            const prevTitle = leftTitles[i - 1];
            const currentTitle = leftTitles[i];

            tl.to({}, { duration: 1.5 })
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
                },
                "<"
              );
          });

          ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: `+=${features.length * 1500}`,
            pin: container,
            scrub: true,
            animation: tl,
          });

          features.forEach((_feature, i) => {
            ScrollTrigger.create({
              trigger: rightColRef.current,
              start: `top+=${i * 1500} top`,
              end: `top+=${(i + 1) * 1500} top`,
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
              markers: false,
            });
          });
        },

        "(max-width: 1023px)": () => {
          features.forEach((feature, i) => {
            ScrollTrigger.create({
              trigger: feature,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            });
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full transition-colors duration-500 ease-in-out"
      style={{
        backgroundColor:
          featureData[activeIndex]?.bgColor || featureData[0].bgColor,
      }}
    >
      <div
        ref={containerRef}
        className="relative mx-auto grid max-w-screen-lg grid-cols-1 gap-x-4 px-4 sm:px-6 lg:grid-cols-[0.5fr_0.8fr] lg:px-4"
      >
        <div className="hidden lg:flex lg:h-screen lg:flex-col lg:justify-start py-20 lg:py-48">
          <div
            className="relative"
            style={{ color: featureData[activeIndex]?.primaryTextColor }}
          >
            <div>
              <div className="mb-4 h-4 w-4 bg-blue-500" />
              {featureData.map((feature, index) => (
                <p
                  key={index}
                  ref={(el) => {
                    if (el) leftTitleRefs.current[index] = el;
                  }}
                  className="absolute left-0 top-8 max-w-60 whitespace-pre-line text-2xl font-bold md:text-4xl"
                >
                  {feature.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div ref={rightColRef} className="relative w-full lg:col-start-2">
          {featureData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) featureRefs.current[index] = el;
              }}
              className="flex min-h-screen flex-col items-start justify-start py-20 lg:h-full lg:py-48"
            >
              <div className="mb-8 lg:hidden">
                <div className="mb-4 h-4 w-4 bg-blue-500" />
                <p
                  className="whitespace-pre-line text-2xl font-bold md:text-4xl"
                  style={{ color: feature.primaryTextColor }}
                >
                  {feature.title}
                </p>
              </div>
              <h2
                className="whitespace-pre-line py-4 text-3xl font-bold md:py-8 md:text-5xl"
                style={{ color: feature.primaryTextColor }}
              >
                {feature.heading}
              </h2>
              <p
                className="mb-4 whitespace-pre-line text-xl text-gray-200 md:text-2xl !leading-[1.6]"
              >
                {feature.description}
              </p>
              <p
                className="mb-4 whitespace-pre-line text-xl text-white font-bold md:text-2xl !leading-[1.6]"
              >
                {feature.listItems}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeatureSection;