import { forwardRef, useEffect, useRef, useState } from 'react';
import { featureData } from '@/lib/whoweareData';

const FeatureSection = forwardRef<HTMLElement, {}>((_props, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const textSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const textGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    const handleNavClick = (index: number) => {
        const targetSection = textSectionRefs.current[index];
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    
    useEffect(() => {
        const textSections = textSectionRefs.current.filter(Boolean) as HTMLDivElement[];
        const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
        const textGroups = textGroupRefs.current.filter(Boolean) as HTMLDivElement[];

        if (textSections.length === 0) return;

        let currentCenterIdx = -1;
        let ticking = false;

        const update = () => {
            const vh = window.innerHeight;
            const fadeOutLine = vh * 0.30; 
            const centerLine = vh * 0.50;
            const preInLine = vh * 3.0;

            let bestCenterIdx = -1;
            let minCenterDist = Infinity;

            textSections.forEach((section, i) => {
                const rect = section.getBoundingClientRect();
                const textGroup = textGroups[i];
                if (!textGroup) return;

                if (rect.top < preInLine && rect.bottom > 0) {
                    textGroup.classList.remove('enter', 'out');
                    textGroup.classList.add('in');
                } else if (rect.top >= preInLine) {
                    textGroup.classList.remove('in', 'out');
                    textGroup.classList.add('enter');
                }
                
                const midPoint = rect.top + rect.height / 2;
                if (i < textSections.length - 1 && midPoint < fadeOutLine) {
                    textGroup.classList.remove('in');
                    textGroup.classList.add('out');
                }

                const dist = Math.abs(midPoint - centerLine);
                if (dist < minCenterDist) {
                    minCenterDist = dist;
                    bestCenterIdx = i;
                }
            });

            if (bestCenterIdx !== currentCenterIdx) {
                setActiveIndex(bestCenterIdx);
                currentCenterIdx = bestCenterIdx;
            }
            
            let bestPeekIdx = -1;
            let minPeekDist = Infinity;
            textSections.forEach((section, i) => {
                if (i === currentCenterIdx) return;
                const rect = section.getBoundingClientRect();
                if (rect.top > centerLine) {
                    const dist = rect.top - centerLine;
                    if (dist < minPeekDist) {
                        minPeekDist = dist;
                        bestPeekIdx = i;
                    }
                }
            });

            images.forEach((img, i) => {
                img.classList.toggle('show', i === currentCenterIdx);
                if (i !== currentCenterIdx) {
                    img.classList.toggle('peek', i === bestPeekIdx);
                } else {
                    img.classList.remove('peek');
                }
            });
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        textGroups.forEach(tg => tg.classList.add('enter'));
        update();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <section 
            ref={ref} 
            className="w-full transition-colors duration-500 ease-in-out"
            style={{ backgroundColor: featureData[activeIndex]?.bgColor || featureData[0].bgColor }}
        >
            <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:gap-x-8">
                <div className="sticky top-0 hidden lg:flex flex-col justify-center h-screen px-4 whitespace-pre-line">
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold" style={{ color: featureData[activeIndex]?.primaryTextColor }}>NSUS</h1>
                        <nav>
                            <ul>
                                {featureData.map((feature, index) => (
                                    <li key={index} className="py-2">
                                        <button onClick={() => handleNavClick(index)} className="font-semibold text-lg transition-all duration-300" style={{ color: activeIndex === index ? featureData[activeIndex]?.primaryTextColor : featureData[activeIndex]?.secondaryTextColor, opacity: activeIndex === index ? 1 : 0.6 }}>
                                            {feature.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="w-full relative col-start-1 lg:col-start-2">
                    {featureData.map((feature, index) => (
                        <div key={index} ref={el => { if (el) textSectionRefs.current[index] = el; }} className="flex flex-col justify-center items-start lg:min-h-screen px-8 py-24 lg:py-0">
                            <div 
                                ref={el => { if (el) textGroupRefs.current[index] = el; }}
                                className={`
                                    w-full max-w-lg will-change-transform
                                    transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    [&.enter]:opacity-0 [&.enter]:translate-y-8
                                    [&.in]:opacity-100 [&.in]:translate-y-0
                                    [&.out]:opacity-0 [&.out]:-translate-y-6
                                `}
                            >
                                <h2 className="text-3xl font-bold lg:text-4xl leading-tight whitespace-pre-line" style={{ color: feature.primaryTextColor }}>{feature.heading}</h2>
                                <p className="mt-6 text-lg lg:text-xl leading-relaxed whitespace-pre-line" style={{ color: feature.secondaryTextColor }}>{feature.description}</p>
                                {feature.listItems && feature.listItems.length > 0 && (
                                    <ul className="mt-6 space-y-3">
                                        {feature.listItems.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-center">
                                                <span className="text-xl font-semibold opacity-80" style={{ color: feature.primaryTextColor }}>‣</span>
                                                <p className="ml-4 text-lg font-medium" style={{ color: feature.primaryTextColor }}>{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="mt-12 w-full max-w-md mx-auto lg:hidden rounded-2xl overflow-hidden aspect-square object-cover object-right">
                                <img src={feature.imageSrc} alt={feature.title} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="sticky top-0 hidden lg:flex items-center justify-center h-screen">
                    <div className="relative w-full h-auto max-w-2xl aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        {featureData.map((feature, index) => (
                            <img
                                key={index}
                                ref={el => { if (el) imageRefs.current[index] = el; }}
                                src={feature.imageSrc}
                                alt={feature.title}
                                className={`
                                    absolute inset-0 h-full w-full object-cover object-right
                                    transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    opacity-0 scale-105 z-10
                                    [&.show]:opacity-100 [&.show]:scale-100 [&.show]:z-20
                                    [&.peek]:opacity-45 [&.peek]:scale-102 [&.peek]:z-10
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default FeatureSection;
