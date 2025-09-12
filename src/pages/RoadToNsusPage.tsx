import React, { useContext, useEffect, useState } from "react";
import ChevronDownIcon from "../components/icons/ChevronDownIcon";
import { NavbarThemeContext } from "@/App";

const processSteps = [
  {
    title: "서류 전형",
    description: [
      "지원 서류는 자유 양식으로, 글자 수 및 파일 수의 제한이 없습니다.",
      "보유하신 경력과 성과를 구체적으로 기재해 주시면 적합한 포지션 검토에 큰 도움이 됩니다.",
      "서류 형식은 PDF 혹은 URL을 권장 드립니다.(한글, 워드, PPT 등의 문서는 형태와 폰트의 변형이 발생할 수 있음)",
    ],
  },
  {
    title: "영어 역량 검사",
    description: [
      "글로벌 환경에서 원활한 협업을 위해 업무에 필요한 기본적인 영어 역량을 확인하는 절차입니다.",
      "고득점이 목적이 아닌 만큼, 편안한 마음으로 끝까지 응시해 주세요.",
      "말하기, 듣기, 읽기, 쓰기를 종합적으로 확인하는 온라인 AI 테스트입니다.",
      "PC 환경에서 응시하며, 약 30분 소요됩니다.",
    ],
  },
  {
    title: "직무 적합성 검사 + 컬쳐핏 인터뷰(HR)",
    description: [
      "직무 적합성 검사 : 직무와 관련된 사전 과제 및 역량 중심 온라인 테스트를 진행합니다.(직군에 따라 상이할 수 있음)",
      "컬쳐핏 인터뷰 : 이력사항을 기반으로 HR담당자와 전화 인터뷰를 진행합니다.(약 30분 내외)",
      "직무 적합성 검사, 컬쳐핏 인터뷰 결과 등을 종합하여 실무 면접 진행 여부가 결정됩니다.",
    ],
  },
  {
    title: "실무 면접",
    description: [
      "지원자님의 소중한 시간을 존중하여 실무 면접은 1Day로 진행합니다.",
      "직무와 관련된 경험 및 역량 중심의 면접을 진행합니다.",
      "귀한 시간을 내어 방문해 주신 지원자님께 감사의 의미로 면접비를 드립니다.",
    ],
  },
  {
    title: "평판 조회",
    description: [
      "지원자님을 더 잘 이해하기 위해, 평판 조회를 진행합니다.",
      "개인정보보호법에 따라 사전 동의를 받고, 지원자님이 지정한 3인을 대상으로 진행합니다.",
    ],
  },
  {
    title: "처우 협의",
    description: [
      "실무 면접과 평판 조회 결과에 따라서 처우 협의가 진행됩니다.",
      "최종 합격은 상호 간 처우 협의가 완료된 상태를 의미하며, 본 과정은 채용 확정을 위한 마지막 과정입니다.",
    ],
  },
  {
    title: "최종 합격",
    description: ["NSUSLAB과 함께할 즐거운 여정에 대하여 안내드립니다."],
  },
];

const faqData = [
  {
    q: "채용 공고에 명시된 경력 기간과 상이할 경우, 지원할 수 없나요?",
    a: "지원할 수 있습니다. 경력 연차는 가이드일 뿐이니, 역량이 충분하다고 생각되신다면 주저없이 지원해 주시길 바랍니다.",
  },
  {
    q: "전형에 불합격했었는데 재지원 할 수 있나요?",
    a: "지원할 수 있습니다. 다만, 재지원 시 그동안 어떤 역량을 쌓고 성장했는지 이력서에 구체화하여 제출해 주시면 감사하겠습니다.",
  },
  {
    q: "면접 참여 시, 면접비를 주나요?",
    a: "네, 귀한 발걸음을 해주신 의미로 실무 면접 진행 시 지급하고 있습니다. 다만, 적법한 소득세 신고를 위해 주민등록증 또는 운전면허증 등의 신분증 지참을 부탁드립니다.",
  },
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-nsus-gray-100 rounded-lg p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start text-left"
      >
        <span className="font-bold text-lg text-nsus-gray-900 pr-4">
          <span className="text-nsus-blue mr-2">Q.</span>
          {q}
        </span>
        <ChevronDownIcon
          className={`w-6 h-6 text-nsus-gray-500 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-nsus-gray-700">
          <span className="font-bold text-lg text-nsus-gray-700 mr-2">A.</span>
          {a}
        </div>
      )}
    </div>
  );
};

const RoadToNsusPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  return (
    <div className="bg-white">
      <header className="py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-nsus-gray-900">
            Road to NSUS
          </h1>
        </div>
      </header>

      <main className="pb-24">
        <section className="bg-nsus-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-nsus-gray-900">
              NSUSLAB 합류 여정
            </h2>
            <p className="mt-4 text-lg text-nsus-gray-500">
              NSUSLAB의 위대한 도전을 함께할 분을 기다립니다.
            </p>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-x-2 gap-y-8">
              {processSteps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-36 h-36 rounded-full flex items-center justify-center text-center p-2 shadow-lg bg-gradient-to-br from-blue-300 to-nsus-blue`}
                    >
                      <span className="text-white font-bold">
                        {step.title.split("+")[0]}
                        <br />
                        {step.title.split("+")[1]}
                      </span>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-1 h-1 bg-nsus-gray-300 mx-1 hidden md:block"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4">
                    <p className="text-nsus-blue font-bold text-lg">
                      0{index + 1}
                    </p>
                    <h3 className="text-2xl font-bold text-nsus-gray-900 mt-1">
                      {step.title}
                    </h3>
                  </div>
                  <div className="md:w-3/4 border-t border-nsus-gray-200 md:border-none pt-6 md:pt-0">
                    <ul className="space-y-2 text-nsus-gray-700 list-disc list-outside pl-5">
                      {step.description.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-nsus-gray-900 mb-12">FAQ</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FaqItem key={index} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RoadToNsusPage;
