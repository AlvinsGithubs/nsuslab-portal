import React, { useState, useEffect } from 'react';
import { fetchAllFinancialInfo } from '../lib/contentful';
import type { FinancialInfo } from '../types';



// const chartData = [
//   { label: '2018.4Q', value: 10 },
//   { label: '2019.1Q', value: 12 },
//   { label: '2019.2Q', value: 15 },
//   { label: '2019.3Q', value: 18 },
//   { label: '2020.1Q', value: 16 },
//   { label: '2020.2Q', value: 25 },
//   { label: '2020.3Q', value: 35 },
//   { label: '2020.4Q', value: 45 },
//   { label: '2021.1Q', value: 55 },
//   { label: '2021.2Q', value: 48 },
//   { label: '2021.3Q', value: 60 },
//   { label: '2021.4Q', value: 65 },
//   { label: '2022.1Q', value: 70 },
//   { label: '2022.2Q', value: 75 },
//   { label: '2022.3Q', value: 80 },
//   { label: '2022.4Q', value: 85 },
//   { label: '2023.1Q', value: 90 },
//   { label: '2023.2Q', value: 100 },
//   { label: '2023.3Q', value: 110 },
//   { label: '2023.4Q', value: 125 },
//   { label: '2024.1Q', value: 130 },
//   { label: '2024.2Q', value: 140 },
//   { label: '2024.3Q', value: 150 },
//   { label: '2024.4Q', value: 165 },
//   { label: '2025.1Q', value: 170 },
// ];

// const BarChart: React.FC = () => {
//     const maxValue = Math.max(...chartData.map(d => d.value));
//     return (
//         <div className="bg-gradient-to-b from-[#1E3A8A] to-[#111827] p-6 sm:p-8 rounded-lg shadow-xl overflow-hidden">
//             <h3 className="text-2xl font-bold text-white text-center mb-10">분기별 매출 추이</h3>
//             <div className="overflow-x-auto pb-12 -mb-12">
//                 <div className="flex items-end h-80 min-w-[800px] space-x-2">
//                     {chartData.map((data, index) => (
//                         <div key={index} className="flex-1 h-full flex flex-col justify-end items-center relative">
//                             <div 
//                                 className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-sm"
//                                 style={{ height: `${(data.value / maxValue) * 100}%` }}
//                                 title={`${data.label}`}
//                             ></div>
//                             <span className="absolute text-white text-xs whitespace-nowrap" style={{
//                                 transform: 'rotate(-65deg)',
//                                 bottom: '-5px',
//                                 transformOrigin: 'center',
//                             }}>{data.label}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// };


const FinancialInfoPage: React.FC = () => {
    const [financialInfo, setFinancialInfo] = useState<FinancialInfo | null>(null);

    useEffect(() => {
      const getFinancialInfo = async () => {
        const data = await fetchAllFinancialInfo();
        if (data.length > 0) {
          setFinancialInfo(data[0]);
        }
      };
      getFinancialInfo();
    }, []);
    return (
        <div className="bg-white py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-nsus-gray-900 mb-8">Work at NSUSLAB</h1>
                
                <div className="space-y-4 text-nsus-gray-700 leading-relaxed">
                    <p>
                        NSUS Group은 현재 북미, 유럽, 아시아 등 다양한 지역에 700명 이상의 임직원들이 일하고 있는 다국적 기업으로, iGaming 업계의 유니콘 입니다.
                    </p>
                    <p>
                        NSUSLAB(엔서스랩)은 이러한 NSUS Group의 개발 스튜디오로서 그룹의 핵심적인 역할을 하고 있습니다.
                    </p>
                    <p>
                        폭발적 성장에 따른 안정적인 수익과 건실한 재무상태를 바탕으로 지속적인 인재 영입과 개발 환경 개선에 많은 투자를 하고 있으며, 성과와 나눔의 복지 확장에도 힘쓰고 있습니다.
                    </p>
                </div>
                
                  <div className="my-16">
                    {financialInfo && (
                      <div>
                        <h3 className="text-2xl font-bold text-nsus-gray-900 text-center mb-8">
                          {financialInfo.title}
                        </h3>
                        <img 
                          src={financialInfo.imageUrl} 
                          alt={financialInfo.title} 
                          className="w-full h-auto rounded-lg shadow-xl" 
                        />
                      </div>
                    )}
                  </div>
                
                <div className="space-y-4 text-nsus-gray-700 leading-relaxed">
                    <p>
                        외부 투자에 의지하고 성공에 대한 막연한 희망으로 프로젝트를 진행하는 대부분의 게임 개발사와는 달리, 저희 NSUSLAB은 성공한 제품과 사업에 의한 안정적 매출을 기반으로 보다 큰 성공을 이루기 위해 달리고 있습니다.
                    </p>
                    <p>
                        또한 투자자의 외압이 없는 독자적이며 신속한 의사결정 구조를 가지고 있습니다. 급변하는 시장에서 이와 같은 효율과 자율성은 큰 경쟁력이며, 투자자가 아닌 함께 고생한 구성원들에게 노력의 결실이 보다 많이 돌아갈 수 있는 환경입니다.
                    </p>
                    <p>
                        우리는 단지 꿈만 꾸는 것이 아닌, 좋은 현실을 더 좋게 만들고자 합니다. 안정적인 개발 환경에서 세계 시장을 제패하기 위해 도전적 성장과 경험을 함께 할 좋은 인재들을 적극 영입하고 있습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinancialInfoPage;