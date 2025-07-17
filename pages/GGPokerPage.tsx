import React from 'react';
import PageWrapper from '../components/PageWrapper';

const GGPokerPage: React.FC = () => {
  return (
    <PageWrapper
      title="GGPoker"
      subtitle="The World's Biggest Poker Room"
    >
      {/* 이 안에 GGPoker 페이지의 상세 내용을 채워 넣으세요. */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-nsus-gray-900">
          GGPoker 서비스 소개
        </h2>
        <p className="mt-4 text-nsus-gray-700">
          이곳에 GGPoker 서비스에 대한 자세한 설명, 특징, 이미지 등을 추가할 수 있습니다.
        </p>
      </div>
    </PageWrapper>
  );
};

export default GGPokerPage;