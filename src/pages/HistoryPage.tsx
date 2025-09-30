import React, { useState, useEffect, useRef, useContext } from 'react';
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import historyVideo from '@/asset/videos/history-1.mp4';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { fetchAllHistory } from '@/lib/contentful';
import type { HistoryYear } from '@/types';
import { NavbarThemeContext } from '@/App';

gsap.registerPlugin(ScrollToPlugin);

const HistoryPage: React.FC = () => {
    const navbarContext = useContext(NavbarThemeContext);
    useEffect(() => {
        if (navbarContext) {
            navbarContext.setNavbarTheme("dark");
        }
    }, [navbarContext]);
    
    const [historyData, setHistoryData] = useState<HistoryYear[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const historySectionRef = useRef<HTMLElement | null>(null);

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
    }, []);

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

            <section ref={historySectionRef} className="bg-white py-24 md:py-32">
                <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-bold text-nsus-gray-900 mb-12 md:mb-24">
                        History/Awards
                    </h2>
                    
                    <div className="space-y-8">
                        {isLoading ? (
                            <div className="text-center text-gray-500">
                                <p>Loading history...</p>
                            </div>
                        ) : (
                            historyData.map(({ year, events }) => (
                                <div key={year} className="flex flex-col md:flex-row md:items-start border-t border-nsus-gray-200">
                                    <div className="w-32 text-left pt-8">
                                        <h4 className="text-nsus-gray-900">{year}</h4>
                                    </div>
                                    <div className="flex-1 lg:pl-8">
                                        <div>
                                            {(() => {
                                                const groupedByMonth = events.reduce<Record<string, { description: string }[]>>((acc, event) => {
                                                    const month = event.month.toString();
                                                    if (!acc[month]) {
                                                        acc[month] = [];
                                                    }
                                                    acc[month].push(event);
                                                    return acc;
                                                }, {});

                                                const sortedMonths = Object.entries(groupedByMonth).sort(([a], [b]) => Number(b) - Number(a));

                                                return sortedMonths.map(([month, monthEvents]) => (
                                                    <div key={month} className="flex items-start space-x-8 md:space-x-16 pt-4 md:pt-8">
                                                        <h6 className="w-12 font-bold text-gray-400 md:mr-8">{`${month.padStart(2, '0')}월`}</h6>
                                                        <div className="flex-1">
                                                            {monthEvents.map((event, index) => (
                                                                <h6 key={index} className="text-nsus-gray-700">
                                                                    {event.description}
                                                                </h6>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
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