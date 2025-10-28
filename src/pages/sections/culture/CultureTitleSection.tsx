import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cultureImg from '@/asset/imgs/culture4.jpg';

type TextBlock = {
  type: 'h3' | 'blockquote';
  text: string;
};

const TEXT_BLOCKS: TextBlock[] = [
  { type: 'h3', text: "최고의 동료와 함께 '완벽한 승리'를 거둔 경험이 있나요?" },
  { type: 'blockquote', text: "시간 가는 줄 모르고 무엇인가에 깊게 빠져드는 경험.\n서로의 눈빛만 봐도 전략을 이해하고, 하나의 목표를 향해 함께 몰아붙이는 희열.\n마침내 최고의 결과를 함께 만들어냈을 때의 짜릿함과 기쁨." },
  { type: 'blockquote', text: "만약, 이 모든 경험이 당신의 '일'이 될 수 있다면 어떨까요?" },
  { type: 'blockquote', text: "일을 방해하는 불필요한 과정이 사라지고,\n오직 최고의 동료들과 최고의 성과를 만드는 데에만 집중할 수 있다면 어떨까요?" },
  { type: 'blockquote', text: "NSUSLAB의 사람들은 일에 몰입하는 즐거움과 성장의 기쁨을 느끼며,\n새로운 역사를 만들고 있습니다." },
  { type: 'blockquote', text: "우리가 일하는 방식은, 단순히 최고의 결과를 내기 위한 규칙이 아닙니다.\n최고의 동료들과 함께 최고의 즐거움을 만들어가는 약속입니다." }
];

const SCROLL_LENGTH = 6000;
const ANIMATION_CONFIG = {
  h3FadeOut: { start: 0.1, duration: 0.4 },
  blockquoteStart: 0.6,
  blockquoteInterval: 0.3,
  exitDelay: 0.2,
  exitDuration: 0.2
};

const CultureTitleSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const blockquoteRefs = useRef<HTMLElement[]>([]);

  const addBlockquoteRef = (el: HTMLElement | null) => {
    if (el && !blockquoteRefs.current.includes(el)) {
      blockquoteRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const elements = {
        section: sectionRef.current,
        sticky: stickyContentRef.current,
        overlay: overlayRef.current,
        image: imageRef.current,
        h3: h3Ref.current,
        blockquotes: blockquoteRefs.current
      };

      if (!elements.section || !elements.sticky || !elements.overlay || 
          !elements.image || !elements.h3 || elements.blockquotes.length === 0) {
        return;
      }

      gsap.set(elements.h3, { opacity: 1, y: 0 });
      gsap.set(elements.overlay, { opacity: 0 });
      gsap.set(elements.image, { scale: 1 });
      gsap.set(elements.blockquotes, { opacity: 0, y: 20 });

      const tl = gsap.timeline();

      tl.to(elements.overlay, { opacity: 0.6, ease: 'none' }, 0)
        .to(elements.image, { scale: 1.2, ease: 'none' }, 0)
        .to(elements.h3, { 
          opacity: 0, 
          y: -20, 
          duration: ANIMATION_CONFIG.h3FadeOut.duration, 
          ease: 'power2.in' 
        }, ANIMATION_CONFIG.h3FadeOut.start);

      elements.blockquotes.forEach((el, i) => {
        const startTime = ANIMATION_CONFIG.blockquoteStart + i * ANIMATION_CONFIG.blockquoteInterval;
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, startTime);
      });

      const lastBlockquoteTime = ANIMATION_CONFIG.blockquoteStart + 
        (elements.blockquotes.length - 1) * ANIMATION_CONFIG.blockquoteInterval;
      const exitTime = lastBlockquoteTime + ANIMATION_CONFIG.exitDelay;

      tl.to(elements.sticky, {
        opacity: 0,
        ease: 'power1.in',
        duration: ANIMATION_CONFIG.exitDuration
      }, exitTime);

      ScrollTrigger.create({
        animation: tl,
        trigger: elements.section,
        pin: elements.sticky,
        start: 'top top',
        end: `+=${SCROLL_LENGTH}`,
        scrub: 1,
        anticipatePin: 1,
        pinSpacing: true,
        markers: false
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderTextBlock = (block: TextBlock, index: number) => {
    if (block.type === 'h3') {
      return (
        <h2 key={index} ref={h3Ref} style={{ whiteSpace: 'pre-line [-webkit-text-stroke:1px_black] shadow-xl' }}>
          {block.text}
        </h2>
      );
    }
    
    return (
      <blockquote
        key={index}
        ref={addBlockquoteRef}
        className="h4 leading-relaxed opacity-0 translate-y-5"
        style={{ whiteSpace: 'pre-line' }}
      >
        {block.text}
      </blockquote>
    );
  };

  return (
    <div ref={sectionRef} style={{ height: `${SCROLL_LENGTH}px` }}>
      <div ref={stickyContentRef} className="h-screen w-full relative overflow-hidden">
        <img
          ref={imageRef}
          src={cultureImg}
          alt="Who we are"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black z-20" />
        <div className="absolute inset-0 z-30 flex justify-center items-center text-white text-center p-4">
          <div className="flex flex-col gap-6 max-w-screen-xl">
            {TEXT_BLOCKS.map((block, index) => renderTextBlock(block, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureTitleSection;