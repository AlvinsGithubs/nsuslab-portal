
import React from 'react';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';

const historyData = [
    { year: '2025', events: [ { month: 'MAR', description: 'GGN, MGA License 취득' }, { month: 'MAR', description: 'GCVegas, Isle of Man(IoM) License 취득' } ] },
    { year: '2024', events: [ { month: 'DEC', description: 'Sweden License 취득' }, { month: 'NOV', description: 'NSUS Malta, MGA ESG 인증 획득' }, { month: 'OCT', description: '2024 EGR Awards Best Poker Operator 수상' }, { month: 'SEP', description: '2024 대한민국 일자리 으뜸기업 선정' }, { month: 'AUG', description: 'WSOP(세계 최대 규모의 포커 토너먼트) 인수' }, { month: 'FEB', description: 'Philippines License 취득' } ] },
    { year: '2023', events: [ { month: 'NOV', description: 'WSOP+ 런칭' }, { month: 'JAN', description: 'Czechia License 취득' }, { month: '', description: 'Netherlands Casino License 취득' } ] },
    { year: '2022', events: [ { month: 'NOV', description: '업계 최초 Germany Poker License 취득' }, { month: 'SEP', description: '2ACE 대한민국 런칭' }, { month: 'JUN', description: 'Sigma Americas Award 올해의 온라인 포커 수상' }, { month: 'MAR', description: '캐나다 Ontario License 취득' } ] },
    { year: '2021', events: [ { month: 'NOV', description: 'Sweden License 취득' }, { month: 'OCT', description: '업계 최초 Netherlands Poker License 취득' }, { month: '', description: '네덜란드 축구 2부 리그 Almere City 스폰서' }, { month: 'JUL', description: 'Belgium Poker License 취득' }, { month: 'JUN', description: 'Romania License 취득' }, { month: '', description: 'Philippines License 취득' }, { month: 'MAY', description: 'ISO27001:2013 획득' }, { month: '', description: 'ISO27017:2015 획득' }, { month: '', description: 'ISO27018:2019 획득' }, { month: 'FEB', description: '미국 Pennsylvania License 취득' } ] },
    { year: '2020', events: [ { month: 'DEC', description: 'Best Poker Operator 2020 선정' }, { month: 'OCT', description: '최대 규모 온라인 토너먼트 기네스북 등재' }, { month: '', description: 'Isle of Man License 취득' }, { month: 'SEP', description: 'ClubGG Social Poker 북미 런칭' }, { month: 'JUN', description: 'MGA B2B License 취득' } ] },
    { year: '2019', events: [ { month: 'JAN', description: '유한책임회사 엔서스랩코리아 전환' } ] },
    { year: '2018', events: [ { month: 'MAR', description: 'Slotventures Social Slots 북미 런칭' } ] },
    { year: '2017', events: [ { month: 'AUG', description: '영국 UKGC License 취득' } ] },
    { year: '2016', events: [ { month: 'JUN', description: '(주)엔서스랩 외국인투자등록증명' } ] },
    { year: '2015', events: [ { month: 'JUL', description: '(주)엔서스랩 벤처기업인증' } ] },
    { year: '2014', events: [ { month: 'JUN', description: '(주)엔서스랩 기업부설연구소 설립' }, { month: 'FEB', description: '2월 14일, (주)엔서스랩 설립' } ] },
];

const HistoryPage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section 
                className="h-screen bg-cover bg-center flex flex-col justify-center items-center relative text-center px-4 text-white"
                style={{ backgroundImage: "url('https://picsum.photos/seed/history-bg/1920/1080')" }}
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        우리가 가장 잘하고 좋아하는<br />
                        iGaming을 통해 세상을<br />
                        더욱 즐겁게 만들어 갑니다
                    </h1>
                </div>
                <div className="absolute bottom-10 animate-bounce z-10">
                    <ChevronDownIcon className="w-10 h-10 text-white opacity-75" />
                </div>
            </section>

            {/* History/Awards Section */}
            <section className="bg-white py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-nsus-gray-900 mb-16">
                        History/Awards
                    </h2>
                    
                    <div className="space-y-12">
                        {historyData.map(({ year, events }) => (
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
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HistoryPage;
