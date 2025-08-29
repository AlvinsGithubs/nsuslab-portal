import React from 'react';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={`py-20 md:py-24 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-nsus-gray-900 mb-16">{title}</h1>
            {children}
        </div>
    </section>
);

const WorkingWayCard: React.FC<{ title: string; description: string; imageUrl: string }> = ({ title, description, imageUrl }) => (
    <div className="bg-white rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-shadow">
        <div className="w-full h-48 bg-gray-300">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
            <p className="font-bold text-nsus-gray-800 h-12">{description}</p>
            <div className="inline-flex items-center mt-4 font-bold text-sm text-nsus-gray-500 group-hover:text-nsus-blue transition-colors cursor-pointer">
                자세히 보기
                <ArrowRightIcon className="ml-1 w-4 h-4" />
            </div>
        </div>
    </div>
);

const RuleItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="font-bold text-lg text-nsus-gray-900">{title}</h4>
        <p className="mt-2 text-nsus-gray-900">{description}</p>
    </div>
);


const CultureValuePage: React.FC = () => {
    return (
        <div className="bg-white">
            <Section title="Mission">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-nsus-gray-900 leading-tight">
                            iGaming을 통해<br />
                            세상을 연결하고 즐거움을 줍니다.
                        </h2>
                        <p className="mt-6 text-lg text-nsus-gray-900">
                            NSUS는 iGaming Contents를 통해<br />
                            유저와 회사를 넘어, 유저와 유저를 연결함으로써<br />
                            세상을 연결하고자 합니다.
                        </p>
                        <p className="mt-4 text-lg text-nsus-gray-900">
                            즐거움의 가치를 극대화해 나가는 것이<br />
                            우리가 지향하는 궁극적인 목표임과 동시에<br />
                            존재의 이유입니다.
                        </p>
                    </div>
                    <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                        <img src="https://picsum.photos/seed/mission-culture/800/600" alt="Mission" className="w-full h-full object-cover" />
                    </div>
                </div>
            </Section>

            <Section title="Vision">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-nsus-gray-900 leading-tight">
                            Global No.1. iGaming Company
                        </h2>
                        <p className="mt-6 text-lg text-nsus-gray-900">
                            우리의 궁극적인 목표를 달성하기 위해서는<br />
                            반드시 글로벌 iGaming 업계를 선도하는<br />
                            업체가 되어야 합니다.
                        </p>
                        <p className="mt-4 text-lg text-nsus-gray-900">
                           지금까지 그래왔듯,<br />
                           NSUS의 방식으로 업계 1위가 되고자 합니다.
                        </p>
                    </div>
                    <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                        <img src="https://picsum.photos/seed/vision-culture/800/600" alt="Vision" className="w-full h-full object-cover" />
                    </div>
                </div>
            </Section>

            <div className="bg-nsus-gray-100">
                <section className="py-20 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-5xl font-bold text-nsus-gray-900 mb-20">NSUS Ways Of Working</h1>
                        
                        <div className="space-y-20">
                            {/* Working Way 1 */}
                            <div>
                                <h3 className="text-2xl font-bold text-nsus-gray-900">Work Transparently and Proactively</h3>
                                <p className="mt-2 text-nsus-gray-900">일의 모든 과정에서 투명성을 유지하고, 주도적으로 문제를 해결합니다.</p>
                                <p className="mt-4 text-nsus-gray-900 max-w-3xl">엔서스랩은 공개된 채널을 통해 정보를 공유하고, 스스로 문제를 정의하고 해결 방법을 제시하는 방식으로 일합니다.</p>
                                <div className="mt-8 grid sm:grid-cols-2 gap-8">
                                    <WorkingWayCard 
                                        title="Transparency"
                                        description="투명성(Transparency)은 협업의 출발점입니다."
                                        imageUrl="https://picsum.photos/seed/transparency/500/300"
                                    />
                                    <WorkingWayCard 
                                        title="Proactiveness"
                                        description="주도성(Proactiveness)은 우리의 성장 동력입니다."
                                        imageUrl="https://picsum.photos/seed/proactive/500/300"
                                    />
                                </div>
                            </div>

                            {/* Working Way 2 */}
                            <div>
                                <h3 className="text-2xl font-bold text-nsus-gray-900">Communicate with Fearless Truthfulness</h3>
                                <p className="mt-2 text-nsus-gray-900">우리는 신뢰를 바탕으로, 솔직하고 두려움 없이 소통합니다.</p>
                                <p className="mt-4 text-nsus-gray-900 max-w-3xl">솔직한 대화와 피드백이 조직의 성장을 이끄는 힘이라고 믿으며, 소통을 '신뢰 구축과 성장의 과정'이라고 생각합니다.</p>
                                <div className="mt-8 grid sm:grid-cols-2 gap-8">
                                    <WorkingWayCard 
                                        title="Fearless Communication"
                                        description="두려움 없는 소통은 문제를 외면하지 않고, 필요한 이야기를 기꺼이 주고받는 태도입니다."
                                        imageUrl="https://picsum.photos/seed/communication/500/300"
                                    />
                                    <WorkingWayCard 
                                        title="Truthfulness"
                                        description="진실성(Truthfulness)은 말과 행동에 상호 신뢰를 위한 진심을 담는 것입니다."
                                        imageUrl="https://picsum.photos/seed/truthfulness/500/300"
                                    />
                                </div>
                            </div>
                            
                            {/* Working Way 3 */}
                            <div>
                                <h3 className="text-2xl font-bold text-nsus-gray-900">Solve with the 1-3-1 Rule</h3>
                                <p className="mt-2 text-nsus-gray-900">문제를 명확히 정의하고, 다양한 시각에서 해결책을 도출한 후, 최적의 솔루션을 제시하고 실행합니다.</p>
                                <p className="mt-4 text-nsus-gray-900 max-w-3xl">문제란 모호할수록 조직적 해결이 어렵습니다. 진짜 문제가 무엇인지 정의하는 것이 해결의 첫걸음입니다.</p>
                                <div className="mt-8 space-y-4">
                                    <RuleItem 
                                        title="“1” : 하나의 문제"
                                        description="문제가 모호하면 어떤 해결책도 효과적일 수 없습니다. 진짜 문제가 무엇인지 명확하게 정의하는 것이 해결의 첫걸음입니다."
                                    />
                                    <RuleItem 
                                        title="“3” : 세가지 해결책"
                                        description="하나의 관점에만 머무르면 더 나은 방법을 놓칠 수 있습니다. 새로운 시각에서 접근하고, 다양한 대안을 고민합니다."
                                    />
                                    <RuleItem 
                                        title="“1” : 최적의 해결책 한 가지"
                                        description="세 가지 해결책 중 가장 효과적인 방안을 제시하고, 결정권자의 컨펌을 받아 실행합니다."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CultureValuePage;
