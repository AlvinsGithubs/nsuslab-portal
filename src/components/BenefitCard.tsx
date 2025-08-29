import React from 'react';
import type { Benefit } from '../types';
import { ICON_MAP } from '../constants'; // ICON_MAP import
import { BriefcaseIcon } from './icons/BriefcaseIcon'; // 기본 아이콘으로 사용할 아이콘 import

interface BenefitCardProps {
  // benefit 타입은 이제 types.ts에 정의된 것을 따릅니다.
  benefit: Benefit;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit }) => {
  // benefit.icon 문자열을 기반으로 ICON_MAP에서 실제 컴포넌트를 찾습니다.
  // 만약 해당하는 아이콘이 없으면 기본값으로 BriefcaseIcon을 사용합니다.
  const IconComponent = ICON_MAP[benefit.icon] || BriefcaseIcon;

  return (
    <div className="bg-nsus-gray-100 p-6 rounded-lg text-center">
      <div className="text-nsus-blue mx-auto mb-4 w-12 h-12 flex items-center justify-center">
        {/* 기존 코드 대신 IconComponent를 사용합니다. */}
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-nsus-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-nsus-gray-500">{benefit.description}</p>
    </div>
  );
};

export default BenefitCard;