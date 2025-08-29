
import React, { useState, useEffect } from 'react';
import { fetchAllBenefits } from '@/lib/contentful';
import type { Benefit } from '@/types';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

const WorkAtNSUSLABItem: React.FC<{ number: string; title: string; description: string; imageUrl: string }> = ({ number, title, description, imageUrl }) => (
    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
            <p className="text-lg font-semibold text-nsus-gray-500">{number}</p>
            <h3 className="mt-2 text-3xl font-bold text-nsus-gray-900">{title}</h3>
            <p className="mt-4 text-nsus-gray-700 leading-relaxed">{description}</p>
        </div>
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
    </div>
);

const BenefitItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div>
        <h4 className="font-bold text-lg text-nsus-gray-900">{title}</h4>
        <p className="mt-2 text-nsus-gray-700">{description}</p>
    </div>
);

const BenefitCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="grid md:grid-cols-4 gap-8 py-10 border-b border-nsus-gray-200">
        <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-nsus-gray-900 sticky top-24">{title}</h3>
        </div>
        <div className="md:col-span-3 space-y-8">
            {children}
        </div>
    </div>
);


const BenefitsPage: React.FC = () => {
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [categorizedBenefits, setCategorizedBenefits] = useState<Record<string, Benefit[]>>({});

    const categoryOrder = ['Compensation', 'Work Flex', 'Workspace', 'Wellness', 'Life & Growth'];

    useEffect(() => {
        const getBenefits = async () => {
            const fetchedBenefits = await fetchAllBenefits();
            setBenefits(fetchedBenefits);
        };
        getBenefits();
    }, []);

    useEffect(() => {
        const grouped = benefits.reduce((acc, benefit) => {
            const category = benefit.category;
            if (category && categoryOrder.includes(category)) {
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(benefit);
            }
            return acc;
        }, {} as Record<string, Benefit[]>);
        setCategorizedBenefits(grouped);
    }, [benefits]);
    
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        window.location.hash = path;
    };


    return (
        <div className="bg-white">
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left max-w-xl">
                        <h1 className="text-5xl font-bold text-nsus-gray-900">Benefits</h1>
                        <p className="mt-4 text-lg text-nsus-gray-700">
                            엔서스랩은 수평적인 문화에서 도전하며 성장할 수 있도록 최고의 보상과 근무 환경을 제공합니다.
                        </p>
                    </div>
                    <div className="mt-12 w-full h-[500px] rounded-xl bg-gray-200 overflow-hidden">
                        <img src="https://picsum.photos/seed/new-benefits-hero/1280/500" alt="NSUSLAB Team" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-nsus-gray-900 mb-16">Work at NSUSLAB</h2>
                    <div className="space-y-20">
                        <WorkAtNSUSLABItem
                            number="01"
                            title="도전과 성장의 기회"
                            description="실시간 글로벌 서비스를 운영한다는 것은 기술적으로 큰 도전 과제입니다. 전 세계의 유저들이 한 서버에 모여 게임을 즐기고 있어, 개발 측면에서는 여러 가지 흥미로운 고려 사항들이 있기 때문입니다. 또한 최고의 사용자 경험을 제공하기 위해, 최신 기술과 제품 그리고 기법들을 선제적으로 도입하고 있습니다. 이처럼 엔지니어로서 매일 만나는 도전을 마주하며 성장할 수 있습니다. 그리고 그 도전을 서로의 역량을 가진 엔지니어들이 있어 서로의 경험과 지식을 공유할 수 있습니다."
                            imageUrl="https://picsum.photos/seed/work-challenge/800/600"
                        />
                         <WorkAtNSUSLABItem
                            number="02"
                            title="자유롭고 수평적인 문화"
                            description="고정적인 생각과 권위로만 일을 밀어붙이는 꽉 막히고 답답한 상사가 없습니다. 외국계 기업다운 수평적인 업무 환경과 직원들 간의 유대를 중시하는 회사 문화는 어떤 이슈에도 의견을 제시하고 정당한 피드백을 받을 수 있도록 합니다. 출근 복장, 개인 사무 환경, 업무 중 이어폰 사용, 회식 강요, 직원들 간의 호칭 등 업무 외의 어떤 것에도 간섭하지 않습니다."
                            imageUrl="https://picsum.photos/seed/work-culture/800/600"
                        />
                         <WorkAtNSUSLABItem
                            number="03"
                            title="최고의 보상과 근무 환경"
                            description="폭발적인 성장세와 매출을 기반으로 업계 평균을 상회하는 연봉과 인센티브를 제공하여 구성원의 안정적인 생활을 보장합니다. 또한 구성원 건강을 위해 식사 및 각종 영양 간식, 커피, 음료 등을 항시 무상으로 제공하고 업무 효율성을 위해 최신 장비를 적극 지원합니다. 역량 개발을 위해서 회사가 주관하는 교육과 더불어 개개인의 필요에 의한 도서 및 외부 교육 또한 지원합니다. 유연 근무 및 재택 근무 또한 개인 스케줄 및 업무 집중도를 고려하여 필요한 경우 이용할 수 있도록 합니다."
                            imageUrl="https://picsum.photos/seed/work-env/800/600"
                        />
                    </div>
                </div>
            </section>

            <section className="py-24 bg-nsus-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-nsus-gray-900">NSUS의 성장과 안정적 재무구조</h2>
                    <a 
                      href="#/financial-info"
                      onClick={(e) => handleNavigate(e, '#/financial-info')}
                      className="mt-6 inline-flex items-center px-6 py-3 bg-nsus-gray-900 text-white font-bold rounded-full hover:bg-black transition-transform hover:scale-105"
                    >
                        더 알아보기 <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>
            
            <section className="py-24">
                 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-4xl font-bold text-nsus-gray-900 mb-10">What we offer</h2>
                     <div>
                        {categoryOrder.map(category => {
                           const items = categorizedBenefits[category];
                           if (!items || items.length === 0) return null;
                           return (
                             <BenefitCategory key={category} title={category}>
                               {items.map(benefit => (
                                   <BenefitItem key={benefit.id} title={benefit.title} description={benefit.description} />
                               ))}
                             </BenefitCategory>
                           )
                        })}
                     </div>
                 </div>
            </section>
        </div>
    );
};

export default BenefitsPage;