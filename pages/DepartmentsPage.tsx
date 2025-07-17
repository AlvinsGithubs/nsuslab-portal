import React, { useState, useEffect } from 'react'; // useState, useEffect import
import { fetchAllGgVegasGames } from '../lib/contentful'; // 방금 만든 함수 import
import type { GgVegasGame } from '../types'; // 방금 만든 타입 import

const ggPokerFeatures = [
    {
        number: '01',
        title: 'Special Features',
        items: [
            { name: 'Splash', description: 'Revenge is a Dish Best Served With a Splash' },
            { name: 'EV Cashout', description: '' },
            { name: 'NFT Avatars', description: '' },
            { name: 'Final Table Betting', description: '' },
            { name: 'Social Features', description: '' },
            { name: 'Staking Platform', description: '' },
            { name: 'Smart HUD', description: '' },
            { name: 'PokerCraft', description: '' },
        ]
    },
    {
        number: '02',
        title: 'GGPoker Classic Games',
        items: [
            { name: 'AoF Sit & Go', description: 'The Fastest Way to Get in The Money' },
            { name: 'All-in or Fold', description: '' },
            { name: 'Mystery Battle Royale', description: '' },
            { name: 'Spin & Gold', description: '' },
            { name: 'Flip & Go', description: '' },
        ]
    },
    {
        number: '03',
        title: 'GGPoker Tournaments',
        items: [
            { name: 'Bounty Hunters Series', description: 'It\'s just business, nothing personal' },
            { name: 'Road to Vegas', description: '' },
            { name: 'GGMillions$', description: '' },
            { name: 'GGMasters', description: '' },
            { name: 'The Weekender', description: '' },
        ]
    }
];



const WsopCard: React.FC<{title: string, description: string, imageUrl: string}> = ({ title, description, imageUrl}) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-2 text-sm text-nsus-gray-500">{description}</p>
        <div className="mt-4 bg-gray-200 h-40 rounded-md" style={{ background: `url(${imageUrl})`, backgroundSize: 'cover' }}></div>
    </div>
);


const WhatWeDoPage: React.FC = () => {
      // GGVegas 게임 데이터를 담을 state를 추가합니다.
    const [ggVegasGames, setGgVegasGames] = useState<GgVegasGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
    useEffect(() => {
        const getGames = async () => {
            try {
                const games = await fetchAllGgVegasGames();
                setGgVegasGames(games);
            } catch (error) {
                console.error("Error fetching GGVegas games:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getGames();
    }, []);

    return (
        <div className="scroll-smooth">
            {/* GGPoker Section */}
            <section id="ggpoker" className="bg-white py-24 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <p className="text-4xl font-bold tracking-tighter text-nsus-gray-900">GG<span className="text-red-600">POKER</span></p>
                            <h1 className="text-6xl font-extrabold text-nsus-gray-900 mt-4 leading-tight">The World's<br/>Biggest<br/>Poker Room</h1>
                            <p className="mt-6 text-nsus-gray-700 max-w-md">
                                2017년 출범한 GGPoker는 포커에 대한 깊은 애정을 가진 숙련된 플레이어들로 구성된 팀이 처음부터 심혈을 기울여 설계했습니다.<br/><br/>
                                우리의 비전은 그 어떤 플랫폼보다 GGPoker에서 더 큰 즐거움을 경험하며 플레이할 수 있도록 하는 것입니다.<br/><br/>
                                GGPoker는 포커의 진정한 재미를 되찾아 드리고자 합니다.
                            </p>
                        </div>
                        <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="mt-24">
                        <h2 className="text-5xl font-extrabold text-center mb-16 text-nsus-gray-900">Key Features</h2>
                        {ggPokerFeatures.map(featureGroup => (
                            <div key={featureGroup.title} className="mb-20">
                                <div className="grid lg:grid-cols-2 gap-16 items-start">
                                    <div>
                                        <p className="text-lg text-nsus-gray-900">{featureGroup.number}</p>
                                        <h3 className="text-4xl font-bold mt-2 text-nsus-gray-900">{featureGroup.title}</h3>
                                        <ul className="mt-8 text-nsus-gray-900">
                                            {featureGroup.items.map(item => (
                                                <li key={item.name} className="py-3 border-b border-gray-200">
                                                    <p className="font-bold text-lg">{item.name}</p>
                                                    {item.description && <p className="text-sm text-nsus-gray-900">{item.description}</p>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-full h-80 bg-gray-200 rounded-lg mt-12 lg:mt-0"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GGVegas Section */}
            <section id="ggvegas" className="bg-nsus-gray-900 text-white py-24 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <p className="text-4xl font-bold tracking-tighter">GG<span className="text-yellow-400">VEGAS</span></p>
                            <h1 className="text-6xl font-extrabold mt-4 leading-tight">Where Fun<br/>Meets<br/>Innovation</h1>
                            <p className="mt-6 text-gray-300 max-w-md">
                                GGVegas는 새롭고, 짜릿하며, 즐거운 경험을 선사하는 데 중점을 둡니다.<br/><br/>
                                저희는 수많은 사람들을 사로잡는 카지노 게임의 핵심 요소를 같이 이해하고 있으며, 이것을 수많은 경험을 선사하기 위해 최선을 다하고 있습니다.
                            </p>
                        </div>
                        <div className="w-full h-96 bg-gray-700 rounded-lg"></div>
                    </div>
                    <div className="mt-24">
                        <h2 className="text-5xl font-extrabold text-center mb-16">Key Features</h2>
                        {ggVegasGames.map(game => (
                            <div key={game.title} className="grid lg:grid-cols-2 gap-8 items-center border-t border-gray-700 py-12">
                                <div>
                                    <p className="text-lg text-gray-400">{game.displayNumber}</p>
                                    <h3 className="text-4xl font-bold mt-2">{game.title}</h3>
                                    <div className="mt-8 border-t border-b border-gray-700 py-2 inline-block">
                                        <p className="text-sm">Release Years</p>
                                        <p className="font-bold">{game.releaseYear}</p>
                                    </div>
                                </div>
                                <img src={game.gameImage} alt={game.title} className="w-full h-64 object-cover rounded-lg"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ClubGG Section */}
            <section id="clubgg" className="bg-white py-24 scroll-mt-20">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <p className="text-4xl font-bold tracking-tighter text-nsus-gray-900">Club<span className="text-red-500">GG</span></p>
                            <h1 className="text-6xl font-extrabold text-nsus-gray-900 mt-4 leading-tight">New Generation<br/>Subscription<br/>Poker Game</h1>
                            <p className="mt-6 text-nsus-gray-700 max-w-md">
                                ClubGG는 새로운 차원의 구독형 온라인 포커 플랫폼으로 전 세계에서 가장 뛰어난 브랜드들과 함께합니다.<br/><br/>
                                나만의 포커 클럽을 만들고 친구를 초대하세요.
                            </p>
                        </div>
                        <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </section>
            
            {/* WSOP Section */}
            <section id="wsop" className="bg-nsus-gray-900 py-24 scroll-mt-20">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                         <div className="flex justify-center items-center gap-4">
                            <h2 className="text-2xl font-semibold text-nsus-white">WORLD SERIES OF POKER</h2>
                            <div className="border-2 border-black rounded-full p-2">
                                <div className="bg-black text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-sm">POKER</div>
                            </div>
                        </div>
                        <h1 className="text-5xl font-extrabold text-nsus-gray-200 mt-4">World Series Of Poker</h1>
                        <p className="text-lg mt-2 text-nsus-gray-700">세계 최대 규모의 포커 토너먼트 대회 운영사</p>
                        <p className="mt-8 text-nsus-gray-600 max-w-3xl mx-auto">
                            NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서<br/>
                            iGaming Industry 전반에서 지속적으로 영향력을 확대하고 있습니다
                        </p>
                    </div>
                    <div className="mt-16 grid lg:grid-cols-3 gap-8 text-nsus-gray-900">
                        <WsopCard title="This outstanding object" description="NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming Industry 전반에서 지속적으로 영향력을 확대해 나가고 있습니다." imageUrl="https://picsum.photos/seed/wsop1/400/300" />
                        <WsopCard title="A greater object" description="NSUS Group은 Poker의 살아 있는 전설 Daniel Negreanu 등, 세계 최고의 포커 플레이어들과 Ambassador 계약을 맺고 그들의 활동을 전폭 지원하고 있습니다." imageUrl="https://picsum.photos/seed/wsop2/400/300" />
                        <WsopCard title="WSOP+" description="Experience the WSOP+ now for everything you need to know about WSOP at your fingertips." imageUrl="https://picsum.photos/seed/wsop3/400/300" />
                    </div>
                    <div className="mt-24">
                        <h2 className="text-4xl font-bold">WSOP Highlight</h2>
                        <p className="mt-2 text-nsus-gray-500">This is what makes these images special.</p>
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div className="bg-gray-300 rounded-lg aspect-square col-span-2 row-span-2"></div>
                            <div className="bg-gray-300 rounded-lg aspect-square"></div>
                            <div className="bg-gray-300 rounded-lg aspect-square"></div>
                            <div className="bg-gray-300 rounded-lg aspect-square"></div>
                            <div className="bg-gray-300 rounded-lg aspect-square"></div>
                            <div className="bg-gray-300 rounded-lg aspect-square"></div>
                            <div className="bg-gray-300 rounded-lg aspect-square col-span-2"></div>
                        </div>
                    </div>
                 </div>
            </section>
            
            {/* Logos Section */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-nsus-gray-500">Drop some names with confidence</p>
                    <div className="mt-8 flex justify-center items-center gap-x-12 gap-y-8 flex-wrap">
                        <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
                        <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
                        <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
                        <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
                        <span className="font-bold text-gray-400 text-2xl">Logoipsum</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhatWeDoPage;
