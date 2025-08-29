import React, { useState, useEffect, useRef } from 'react'; // ✅ useState, useEffect 추가
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import historyVideo from '@/asset/videos/history-1.mp4';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// ✅ Contentful 연동을 위한 import 추가
import { fetchAllHistory } from '@/lib/contentful';
import type { HistoryYear } from '@/types';

gsap.registerPlugin(ScrollToPlugin);

// ❌ 기존에 있던 하드코딩된 historyData 배열은 여기서 삭제합니다.

const HistoryPage: React.FC = () => {
    // ✅ Contentful 데이터를 저장할 state와 로딩 상태를 추가합니다.
    const [historyData, setHistoryData] = useState<HistoryYear[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const historySectionRef = useRef<HTMLElement | null>(null);

    // ✅ useEffect를 사용해 페이지가 로드될 때 Contentful 데이터를 한 번만 불러옵니다.
    useEffect(() => {
        const getHistory = async () => {
            try {
                const data = await fetchAllHistory();
                setHistoryData(data);
            } catch (error) {
                console.error("Error fetching history data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getHistory();
    }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행되도록 합니다.

    const scrollToHistory = () => {
        if (historySectionRef.current) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: historySectionRef.current, autoKill: true },
                ease: "power2.inOut",
            });
        }
    };

    return (
        <div>
            {/* Hero Section (변경 없음) */}
            <section 
                className="h-[100svh] flex flex-col justify-center items-center relative text-center px-4 text-white overflow-hidden"
            >
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src={historyVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="relative z-20">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        우리가 가장 잘하고 좋아하는<br />
                        iGaming을 통해 세상을<br />
                        더욱 즐겁게 만들어 갑니다
                    </h1>
                </div>
                <div onClick={scrollToHistory} className="absolute bottom-10 animate-bounce z-20 cursor-pointer">
                    <ChevronDownIcon className="w-10 h-10 text-white opacity-75" />
                </div>
            </section>

            {/* History/Awards Section (데이터 렌더링 부분만 수정) */}
            <section ref={historySectionRef} className="bg-white py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-nsus-gray-900 mb-16">
                        History/Awards
                    </h2>
                    
                    <div className="space-y-12">
                        {/* ✅ 로딩 상태에 따라 다른 UI를 보여줍니다. */}
                        {isLoading ? (
                            <div className="text-center text-gray-500">
                                <p>Loading history...</p>
                            </div>
                        ) : (
                            historyData.map(({ year, events }) => (
                                <div key={year} className="flex items-start">
                                    <div className="w-24 text-left">
                                        <p className="text-xl font-bold text-nsus-gray-900 sticky top-24">{year}</p>
                                    </div>
                                    <div className="flex-1 pl-8">
                                        <div className="border-t border-nsus-gray-200">
                                            {events.map((event, index) => (
                                                <div key={index} className="flex items-baseline space-x-8 pt-5">
                                                    <p className="w-12 text-sm font-bold text-nsus-gray-700 uppercase">{event.month}</p>
                                                    <p className="text-nsus-gray-700">{event.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HistoryPage;