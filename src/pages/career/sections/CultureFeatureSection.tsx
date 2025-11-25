import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { cultureFeatureData } from "@/lib/careerData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CultureFeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
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

    const section = sectionRef.current;
    const container = containerRef.current;
    const leftTitles = leftTitleRefs.current.filter(Boolean);
    const features = featureRefs.current.filter(Boolean);
    const progressFills = progressFillRefs.current.filter(Boolean);
    const progressIndicator = progressIndicatorRef.current;

    if (
      !section ||
      !container ||
      features.length === 0 ||
      leftTitles.length === 0 ||
      progressFills.length === 0 ||
      !progressIndicator
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(features, { position: "absolute", inset: 0 });
      gsap.set(features.slice(1), { opacity: 0 });
      gsap.set(features[0], { opacity: 1, y: 0 });
      gsap.set(leftTitles, { opacity: 0, yPercent: 100 });
      gsap.set(leftTitles[0], { opacity: 1, yPercent: 0 });
      gsap.set(progressFills, { width: "0%" });
      gsap.set(progressIndicator, { opacity: 1 });

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
          trigger: rightColRef.current,
          start: `top+=${i * 1200} top`,
          end: `top+=${(i + 1) * 1200} top`,
          scrub: true,
          animation: anim,

          onLeave: () => gsap.set(currentFill, { width: "100%" }),
          onLeaveBack: () => gsap.set(currentFill, { width: "0%" }),
        });
      });
    });

    return () => ctx.revert();
  }, []);

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
      className="w-full transition-colors duration-500 ease-in-out relative h-screen bg-nsus-gray-100 z-10"
    >
      <div
        ref={containerRef}
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-x-32 px-4 sm:px-6 lg:grid-cols-[0.5fr_0.8fr] lg:px-4"
      >
        <div className="hidden lg:flex lg:h-screen lg:flex-col lg:justify-start py-20 lg:py-64">
          <div className="relative">
            <div>
              <p className="absolute -left-10 -top-0 text-[10rem] font-extrabold opacity-20">
                {(activeIndex + 1).toString().padStart(2, "0")}
              </p>
              {cultureFeatureData.map((feature, index) => (
                <p
                  key={index}
                  ref={(el) => {
                    if (el) leftTitleRefs.current[index] = el;
                  }}
                  className="absolute left-0 top-8 max-w-100 whitespace-pre-line text-2xl font-bold md:text-5xl"
                >
                  {feature.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div ref={rightColRef} className="relative w-full lg:col-start-2">
          {cultureFeatureData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) featureRefs.current[index] = el;
              }}
              className="flex min-h-screen flex-col items-start justify-start py-40 lg:h-full lg:py-64"
            >
              <div className="mb-8 md:hidden flex items-center gap-4 pr-20">
                <p className="whitespace-pre-line text-6xl font-extrabold opacity-20">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <h3 className="text-neutral-900 whitespace-pre-line">
                  {feature.title}
                </h3>
              </div>
              <h3 className="text-neutral-900 whitespace-pre-line py-4 font-bold md:py-8">
                {feature.heading}
              </h3>
              <h5 className="mb-4 whitespace-pre-line text-neutral-600 !leading-[1.6]">
                {feature.description}
              </h5>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div
        ref={progressIndicatorRef}
        className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
      >
        <h6 className="hidden md:block text-nsus-gray-700 mb-6">
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
