import { forwardRef, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featureData } from "@/lib/whoweareData";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const finalPaddingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionElement = ref && "current" in ref ? ref.current : null;
    if (!sectionElement) return;

    const ctx = gsap.context(() => {
      const features = featureRefs.current.filter(Boolean) as HTMLDivElement[];

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          features.forEach((feature, index) => {
            const leftContent = feature.querySelector(".left-content");
            const rightContent = feature.querySelector(".right-content");
            const topLine = feature.querySelector(".top-line");

            gsap.fromTo(
              [leftContent, rightContent],
              { opacity: 0, y: 50 },
              {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
                scrollTrigger: {
                  trigger: feature, start: "top 80%", end: "top 50%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            gsap.fromTo(
              topLine, { scaleX: 0 },
              {
                scaleX: 1, duration: 0.6, ease: "power2.out",
                scrollTrigger: {
                  trigger: feature, start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            if (index < features.length - 1) {
              gsap.to(feature, {
                scale: 0.95,
                opacity: 0.6,
                scrollTrigger: {
                  trigger: features[index + 1], start: "top 80%", end: "top top",
                  scrub: 1,
                },
              });
              const textToFade = feature.querySelectorAll(".fade-out-text");
              gsap.to(textToFade, {
                opacity: 0,
                scrollTrigger: {
                  trigger: features[index + 1], start: "top 80%", end: "top 20%",
                  scrub: 1,
                },
              });
            }
          });

          const lastFeature = features[features.length - 1];
          const finalPadding = finalPaddingRef.current;

          if (lastFeature && finalPadding) {
            gsap.to(lastFeature, {
              scale: 0.95,
              opacity: 0.6,
              scrollTrigger: {
                trigger: finalPadding, start: "top bottom", end: "top 80%",
                scrub: 1,
              },
            });
          }
        },

        "(max-width: 1023px)": () => {
          features.forEach((feature) => {
            gsap.fromTo(
              feature,
              { opacity: 0, y: 50 },
              {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: {
                  trigger: feature,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
      });
    }, sectionElement);

    return () => ctx.revert();
  }, [ref]);

  return (
    <section ref={ref} className="w-full">
      <div ref={containerRef} className="main-container max-w-screen-xl mx-auto">
        <div className="lg:h-[10vh]" />
        <div ref={wrapperRef} className="relative">
          {featureData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { if (el) featureRefs.current[index] = el; }}
              className="flex flex-col justify-center lg:block lg:sticky lg:min-h-screen py-10 lg:py-0"
              style={{
                top: `${index * 6}rem`,
                zIndex: index + 1,
                backgroundColor: feature.bgColor,
              }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start align-content-start py-6 lg:py-9 px-4 lg:px-0 text-center lg:text-left"
                style={{
                  color: feature.primaryTextColor,
                  minHeight: "auto",
                }}
              >
                <div className="top-line absolute top-0 left-0 right-0 h-px bg-gray-700 origin-left" />
                <div className="left-content flex justify-center lg:justify-start gap-6 lg:gap-8">
                  <h4 className="font-heading leading-[1] whitespace-pre-line">
                    {feature.title}
                  </h4>
                </div>
                <div className="right-content flex flex-col justify-start gap-4">
                  <h3 className="lg:whitespace-pre-line">{feature.heading}</h3>
                  <p className="text-xl lg:text-2xl leading-relaxed lg:whitespace-pre-line text-gray-400 fade-out-text">
                    {feature.description}
                  </p>
                  {feature.listItems && (
                    <p className="text-xl lg:text-2xl leading-relaxed font-bold lg:whitespace-pre-line fade-out-text">
                      {feature.listItems}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            ref={finalPaddingRef}
            className="hidden lg:block"
            style={{ height: "120vh" }}
          />
        </div>
      </div>
    </section>
  );
});

export default FeatureSection;