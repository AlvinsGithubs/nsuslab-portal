import { useContext, useEffect, createContext } from 'react';
// @ts-ignore
// import { NavbarThemeContext } from '@/App'; // App 경로를 확인하세요

// [수정됨] '@/App' 임포트 경로 오류를 해결하기 위해 임시 Context를 생성합니다.
// 실제 애플리케이션에서는 올바른 경로에서 NavbarThemeContext를 가져와야 합니다.
// @ts-ignore
const NavbarThemeContext = createContext(null);

const CareersPage = () => {
  // @ts-ignore
  const navbarContext = useContext(NavbarThemeContext);

  useEffect(() => {
    // @ts-ignore
    navbarContext?.setNavbarTheme('light');
  }, [navbarContext]);

  useEffect(() => {
    const scriptId = 'round-hr-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://recruit.roundhr.com/nsuslab/embed';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      const iframe = document.getElementById('round_embed_iframe');
      if (iframe?.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f8fb] to-white text-nsus-gray-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#e6f2ff_0%,transparent_55%)]" />

        {/* 이 부모 div는 'items-center'를 유지합니다. 
          이 'items-center'가 유일한 자식인 'max-w-3xl' 래퍼를 중앙 정렬시킵니다.
        */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-40 sm:px-5 lg:px-8">
          {/* [수정됨] 
            단 하나의 'w-full max-w-3xl' 래퍼입니다. 
            모든 왼쪽 정렬 콘텐츠가 이 안에 들어갑니다.
          */}
          <div className="w-full max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-nsus-blue shadow-sm backdrop-blur">
              NSUS LAB Careers
            </span>

            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-4xl text-left">
              함께 성장할 동료를 기다리고 있습니다.
            </h1>

            {/* 이 <p> 태그는 이제 래퍼 안에 있습니다. */}
            <p className="mt-8 text-left text-lg leading-9 text-nsus-gray-800 whitespace-pre-wrap">
              NSUS Group은 현재 북미, 유럽, 아시아 등 다양한 지역에 약 700명 이상의
              임직원들이 일하고 있는 다국적 기업으로 iGaming 업계의 유니콘이며,
              <br />
              NSUSLAB / 앤서스랩은 NSUS Group의 개발 스튜디오로서 그룹의 핵심적인
              역할을 담당하고 있습니다. <br />
              NSUSLAB이 궁금하시다면 📘회사소개서를 클릭하여 확인해 주세요.
            </p>

            {/* 이 <p> 태그도 래퍼 안에 있으며, 불필요한 max-w-4xl, mx-0 클래스를 제거했습니다.
             */}
            <p className="mt-6 text-left text-lg leading-4 text-nsus-gray-600"></p>

            {/* [수정됨] 'justify-left' -> 'justify-start'
              Tailwind에서 왼쪽 정렬은 'justify-start'입니다.
            */}
            <div className="mt-6 flex flex-wrap justify-start gap-4 text-sm text-nsus-gray-500">
              <span>• 글로벌 3개 대륙, 12개 이상 국가 협업</span>
              <span>• 엔지니어링 중심의 데이터 기반 문화</span>
              <a
                // [수정됨] 클래스 이름 뒤의 's' 오타 제거
                className="text-nsus-blue underline underline-offset-4"
                href="https://www.nsuslab.com/about"
                target="_blank"
                rel="noreferrer"
              >
                회사 소개 바로가기
              </a>
            </div>

            {/* [수정됨] 
              구분선을 래퍼 안으로 이동시켜 다른 콘텐츠와 정렬을 맞춥니다.
              w-full, max-w-3xl이 불필요해져서 제거합니다.
            */}
            <div className="py-10">
              <hr className="border-gray-300" />
            </div>
          </div>
          {/* 래퍼 div 끝 */}
        </div>
      </section>

      {/* [수정됨] 
        섹션 사이에 있던 별도의 구분선 div는 래퍼 안으로 이동했으므로 삭제되었습니다.
      */}

      {/* 이 섹션은 이미 'mx-auto max-w-6xl'과 내부 'max-w-3xl' 헤더로
        올바르게 정렬되어 있었으므로, 이제 위 섹션과 정렬이 일치합니다.
      */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <header className="max-w-4xl">
          <h2 className="text-3xl font-semibold text-nsus-gray-900">
            채용 중인 공고
          </h2>
          <p className="mt-3 text-base leading-7 text-nsus-gray-600">
            도전과 성장을 즐기는 분이라면 누구나 환영합니다. 관심 있는 포지션을
            선택하고 지원해 주세요.
          </p>
        </header>

        <div className="mt-10">
          <div className="rounded-3xl bg-white/90 p-50 shadow-x2 ring-2 ring-black/5 backdrop-blur">
            <div
              id="round_embed"
              data-job-layout="sidebar"
              className="min-h-[900px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
