import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { type FC, useRef } from "react"; 
import ggvegas_logo from "@/asset/imgs/ggvegas_logo.png";
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const GGVegasTitleSection: FC = () => {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null); 

  return (
    <div ref={container}>
      <div id="about" className="w-screen">
        <div className="flex flex-col items-center gap-4 md:gap-8 py-12 md:pt-40 text-center max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex w-full justify-center">
            <img
              src={ggvegas_logo}
              alt="GGVegas Logo"
              className="h-10 w-auto lg:h-16"
            />
          </div>

          <div>
            <h2 className="whitespace-pre-line text-white">
              {t('ggvegas_title')}
            </h2>
            <h6 className="mx-auto mt-4 md:mt-8 max-w-screen-lg md:whitespace-pre-line text-white opacity-80">
              {t('ggvegas_desc')}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GGVegasTitleSection;