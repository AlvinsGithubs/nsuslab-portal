import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccordionItem } from "@/lib/wsopData"; // 경로에 맞게 수정해주세요

// --- 1. 서브 컴포넌트: 아코디언 아이템 ---
interface WSOPAccordionItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const WSOPAccordionItem: React.FC<WSOPAccordionItemProps> = ({
  title,
  description,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-neutral-800 py-5">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left text-white transition-colors hover:text-gray-300"
        aria-expanded={isOpen}
      >
        <h4 className="text-lg md:text-xl font-medium text-nsus-gray-200">
          {title}
        </h4>
        <span className="text-2xl ml-4">{isOpen ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "1rem" },
              collapsed: { opacity: 0, height: 0, marginTop: "0rem" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pr-8 overflow-hidden"
          >
            <p className="text-gray-400 whitespace-pre-line">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 2. 서브 컴포넌트: 미디어 렌더러 ---
const MediaRenderer: React.FC<{ images: string[] }> = ({ images }) => {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        className="w-full h-auto rounded-lg object-cover"
        alt=""
      />
    );
  }

  if (images.length === 2) {
    return (
      <div className="flex flex-col gap-4">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="w-full h-auto rounded-lg object-cover"
            alt=""
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          className="w-full h-auto rounded-lg object-cover"
          alt=""
        />
      ))}
    </div>
  );
};

// --- 3. 메인 UI 컴포넌트: ContentSection ---
export interface ContentSectionProps {
  title: string;
  description?: string;
  images: string[];
  imagePosition: "left" | "right"; // 이미지 위치 결정
  accordionItems?: AccordionItem[];
  openAccordionId?: string | null;
  handleAccordionClick?: (id: string) => void;
}

const WSOPContentSection = React.forwardRef<HTMLDivElement, ContentSectionProps>(
  (
    {
      title,
      description,
      images,
      imagePosition,
      accordionItems,
      openAccordionId,
      handleAccordionClick,
    },
    ref
  ) => {
    // 텍스트 영역 (왼쪽 혹은 오른쪽 배치)
    const textContent = (
      <div
        className={`w-full ${
          imagePosition === "left" ? "md:order-2" : "md:order-1"
        }`}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          {title}
        </h3>

        {/* 텍스트 렌더링: \n\n 기준으로 문단 분리 */}
        {description && (
          <div className="text-base text-white opacity-90">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0 whitespace-pre-line">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        )}

        {/* 아코디언 영역 */}
        {accordionItems && handleAccordionClick && (
          <div className="grid grid-cols-1 gap-0 mt-8">
            {accordionItems.map((item) => (
              <WSOPAccordionItem
                key={item.title}
                title={item.title}
                description={item.description}
                isOpen={openAccordionId === item.title}
                onClick={() => handleAccordionClick(item.title)}
              />
            ))}
          </div>
        )}
      </div>
    );

    // 미디어 영역 (이미지들)
    const mediaContent = (
      <div
        className={`w-full ${
          imagePosition === "left" ? "md:order-1" : "md:order-2"
        }`}
      >
        <MediaRenderer images={images} />
      </div>
    );

    return (
      <div
        className="item-point pt-12 md:pt-24 mt-12 md:mt-24 border-t border-neutral-800"
        ref={ref}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-28 w-full">
          {textContent}
          {mediaContent}
        </div>
      </div>
    );
  }
);

export default WSOPContentSection;