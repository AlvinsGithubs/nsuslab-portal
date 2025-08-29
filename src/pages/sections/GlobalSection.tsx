import React, { useEffect, useState, forwardRef, useLayoutEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

// ✅ Contentful 연동을 위한 import 추가
import { fetchAllGlobalLicenses } from '@/lib/contentful';
import type { GlobalLicense } from '@/types';

// ❌ 기존 licence 이미지 import 및 cardData 배열은 모두 삭제합니다.

const TRANSITION_DURATION = 0.7;
const EASE_TYPE = [0.4, 0, 0.2, 1];

interface PartnershipCardProps {
    imgSrc: string;
    text: string;
    isActive: boolean;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({ imgSrc, text, isActive }) => {
    return (
        <div className="group relative w-full aspect-[16/22] rounded-2xl overflow-hidden shadow-md">
            <img
                src={imgSrc}
                alt={text}
                className="w-full h-full object-cover"
            />
            <motion.div
                className="absolute inset-0 bg-white/70"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex justify-between items-end p-6 md:p-8">
                <p className="text-white text-2xl md:text-3xl font-semibold max-w-[80%]">
                    {text}
                </p>
            </div>
        </div>
    );
};

const GlobalSection = forwardRef<HTMLElement, {}>((props, ref) => {
    // ✅ Contentful 데이터를 저장할 state
    const [licenses, setLicenses] = useState<GlobalLicense[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [scope, animate] = useAnimate();
    const carouselContainerRef = useRef<HTMLDivElement | null>(null);
    const [dragConstraintLeft, setDragConstraintLeft] = useState(0);
    
    // ✅ useEffect로 Contentful 데이터를 불러옵니다.
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
        const ctx = gsap.context(() => {
            gsap.fromTo(".animated-item",
                { opacity: 0, y: 80 },
                {
                    opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: {
                        trigger: (ref as React.RefObject<HTMLElement>).current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, ref as React.RefObject<HTMLElement>);
        return () => ctx.revert();
    }, [ref]);

    useEffect(() => {
        const calculateSizes = () => {
            if (carouselContainerRef.current && licenses.length > 0) { // 데이터가 있을 때만 계산
                const containerWidth = carouselContainerRef.current.offsetWidth;
                const isDesktop = window.innerWidth >= 768;
                const gap = isDesktop ? 32 : 20;
                const newCardWidth = isDesktop ? containerWidth / 4.5 : containerWidth * 0.8;
                setCardWidth(newCardWidth);

                const totalContentWidth = licenses.length * newCardWidth + (licenses.length - 1) * gap;
                const newDragConstraintLeft = totalContentWidth > containerWidth ? -(totalContentWidth - containerWidth) : 0;
                setDragConstraintLeft(newDragConstraintLeft);
            }
        };
        
        if (!isLoading) {
            calculateSizes();
        }
        window.addEventListener('resize', calculateSizes);
        return () => window.removeEventListener('resize', calculateSizes);
    }, [isLoading, licenses]);

    useEffect(() => {
        if (cardWidth > 0) {
            const isDesktop = window.innerWidth >= 768;
            const gap = isDesktop ? 32 : 20;
            const totalCardWidth = cardWidth + gap;
            const newX = -activeIndex * totalCardWidth;
            animate(scope.current, { x: newX }, { duration: TRANSITION_DURATION, ease: EASE_TYPE });
        }
    }, [activeIndex, cardWidth, animate, scope]);

    const updateIndex = (direction: number) => {
        const newIndex = activeIndex + direction;
        if (newIndex >= 0 && newIndex < licenses.length) {
            setActiveIndex(newIndex);
        }
    };

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section ref={ref} className="w-full bg-white py-20 overflow-hidden ">
            <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                <div className="md:text-left mb-12">
                    <h2 className="animated-item text-3xl font-bold text-black lg:text-5xl">Expanding the Global Market</h2>
                    <p className="animated-item mt-4 text-gray-400 lg:text-2xl font-bold">
                        NSUS Group은 2017년 영국을 시작으로 미국 펜실베니아, 캐나다, 네덜란드, 독일, 벨기에, 루마니아, 체코, 몰타, 맨섬, 필리핀 등 <br />여러 국가의 License를 취득하며 사업을 확장 해 나가고 있습니다.
                    </p>
                </div>
            </div>

            <div
                ref={carouselContainerRef}
                className="animated-item max-w-[1600px] mx-auto px-8 md:px-16 cursor-grab active:cursor-grabbing"
            >
                <motion.div
                    ref={scope}
                    drag="x"
                    dragConstraints={{ right: 0, left: dragConstraintLeft }}
                    className="flex items-center gap-5 md:gap-8"
                >
                    {/* ✅ 로딩 상태 처리 및 Contentful 데이터(licenses)를 사용하도록 변경 */}
                    {isLoading ? (
                        <div className='w-full text-center py-10'><p>Loading licenses...</p></div>
                    ) : (
                        licenses.map((card, index) => (
                            <motion.div
                                key={card.id}
                                style={{ width: cardWidth, flexShrink: 0 }}
                                onClick={() => handleCardClick(index)}
                            >
                                <PartnershipCard
                                    isActive={index === activeIndex}
                                    imgSrc={card.imageUrl}
                                    text={card.text}
                                />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>

            <div className="flex justify-center items-center mt-10 gap-5">
                <button
                    onClick={() => updateIndex(-1)}
                    disabled={activeIndex === 0}
                    className="w-11 h-11 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => updateIndex(1)}
                    disabled={activeIndex >= licenses.length - 1}
                    className="w-11 h-11 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
});

export default GlobalSection;