import React, {
  useEffect,
  useState,
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import { fetchAllGlobalLicenses } from "@/lib/contentful";
import { useLanguage } from "@/contexts/LanguageContext";
import type { GlobalLicense } from "@/types";

interface PartnershipCardProps {
  imgSrc: string;
  text: string;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({ imgSrc, text }) => {
  return (
    <div className="group relative w-full aspect-[8/11] rounded-xl overflow-hidden shadow-md">
      <img src={imgSrc} alt={text} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end p-4 md:p-8">
        <h4 className="text-white max-w-[80%]">{text}</h4>
      </div>
    </div>
  );
};

const GlobalSection = forwardRef<HTMLElement, {}>((_props, ref) => {
  const { t } = useLanguage();
  const [licenses, setLicenses] = useState<GlobalLicense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getLicenses = async () => {
      try {
        const data = await fetchAllGlobalLicenses();
        setLicenses(data);
      } catch (error) {
        console.error("Error fetching global licenses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getLicenses();
  }, []);

  useLayoutEffect(() => {
    if (!ref || !(ref as React.RefObject<HTMLElement>).current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animated-item",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: (ref as React.RefObject<HTMLElement>).current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref as React.RefObject<HTMLElement>);
    return () => ctx.revert();
  }, [ref]);

  useEffect(() => {
    const calculateSizes = () => {
      if (carouselContainerRef.current && licenses.length > 0) {
        const containerWidth = carouselContainerRef.current.offsetWidth;
        const isDesktop = window.innerWidth >= 768;
        const gap = isDesktop ? 12 : 6;

        const newCardWidth = isDesktop
          ? containerWidth / 6
          : containerWidth * 0.5;
        setCardWidth(newCardWidth);

        const totalWidth =
          licenses.length * 2 * newCardWidth + licenses.length * 2 * gap;
        setCarouselWidth(totalWidth);
      }
    };

    if (!isLoading) {
      calculateSizes();
    }
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, [isLoading, licenses]);

  return (
    <section ref={ref} className="hidden lg:block w-full bg-black overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="item-title">
          <h4>{t("global_title")}</h4>
        </div>
        <div className="item-desc text-gray-200">
          <h6>{t("global_desc")}</h6>
        </div>
      </div>

      <div
        ref={carouselContainerRef}
        className="animated-item mx-auto px-8 md:px-16 mb-12"
      >
        <motion.div
          className="flex items-center gap-5 md:gap-8"
          style={{
            width: carouselWidth,
            animationName: "marquee",
            animationDuration: `${licenses.length * 5}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isHovered ? "paused" : "running",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isLoading ? (
            <div className="w-full text-center py-10">
              <p>Loading licenses...</p>
            </div>
          ) : (
            [...licenses, ...licenses].map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                style={{ width: cardWidth, flexShrink: 0 }}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <PartnershipCard imgSrc={card.imageUrl} text={card.text} />
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
});

export default GlobalSection;
