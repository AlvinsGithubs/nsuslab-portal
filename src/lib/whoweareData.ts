import whoweare_ggpoker from '@/asset/imgs/about-us-Img/whoweare_ggpoker.webp';
import whoweare_globalnetwork from '@/asset/imgs/about-us-Img/whoweare_globalnetwork.jpg';
import whoweare_iso from '@/asset/imgs/about-us-Img/whoweare_iso.jpg';
import whoweare_wsop from '@/asset/imgs/about-us-Img/whoweare_wsop.jpg';
import cardImg2 from '@/asset/imgs/about-us-Img/cardImg2.png';
import whoweare_iGaming from '@/asset/imgs/about-us-Img/whoweare_iGaming.jpg';
import whoweare_culture3 from '@/asset/imgs/about-us-Img/whoweare_culture3.png';

// Feature Section
interface Feature {
  title: string;
  heading: string;
  description: string; // ✅ string[] 에서 string으로 타입 변경
  listItems: string;
  bgColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}

// ✅ [수정] description 데이터를 배열에서 \n을 포함한 문자열로 변경
export const featureData: Feature[] = [
  {
    title: "A QUESTION THAT CHANGED THE GAME",
    heading: "질문으로 시작된 여정",
    description:
      "우리는 포커와 그 문화를 사랑했습니다. \n하지만 우리가 사랑했던 포커 게임은 점점 본질을 잃어가고 있었습니다. 즐거움 대신 승패만이,새로운 플레이어 대신 소수의 '꾼'들만이 남은 시장.\n\n더 이상 게임은 즐겁지 않았습니다. 우리는 스스로에게 질문을 던졌습니다.",
    listItems: "\n어떻게 하면 포커를 다시\n모두에게 재미있는 게임으로 만들 수 있을까?",
    bgColor: "#000000",
    primaryTextColor: "#ffffff",
    secondaryTextColor: "#ffffff",
  },
  {
    title: "FROM A SIMPLE ANSWER TO GLOBAL NO.1",
    heading: "하나의 해답, 세계 1위가 되다",
    description:
      "해답은 의외로 단순했습니다. 기술이나 자본이 아닌, 게임의 본질인 '사람'과 '재미'로 돌아가는 것이었습니다.\n\n'플레이어에 대한 깊은 이해와 게임에 대한 순수한 열정'.\n\n이 단순한 원칙 하나로 시작된 GGPoker는 수년 만에 세계 1위 포커룸으로 성장했고, 기네스북에 등재되는 등 누구도 예상치 못한 성공 신화를 써 내려갔습니다.",
    listItems: "\n우리는 증명했습니다.\n‘사람’과 '재미'라는 단순한 가치가 가장 강력한 혁신이 될 수 있다는 것을.",
    bgColor: "#000000",
    primaryTextColor: "#ffffff",
    secondaryTextColor: "#ffffff",
  },
  {
    title: "CONNECTING THE WORLD AT PLAY",
    heading: "포커를 넘어, 세상을 연결하다",
    description:
      "온라인 포커 시장을 근본부터 바꾸었던 우리의 성공 방정식은 더 큰 가능성을 향한 질문으로 이어졌습니다.\n\n'iGaming을 통해 세상을 더 즐겁게 만들 수는 없을까?'\n\nFIFA가 축구를 통해 전 세계인을 하나로 묶는 것처럼, 우리는 iGaming을 통해 국경과 언어를 넘어선 연결과 즐거움을 만들고자 합니다.\n\n우리의 미션은 명확합니다.",
    listItems:
      "\nTo entertain and connect the world through iGaming\niGaming을 통해 세상을 연결하고, 즐거움을 줍니다.",
    bgColor: "#000000",
    primaryTextColor: "#ffffff",
    secondaryTextColor: "#ffffff",
  },
  {
    title: "THE FUTURE OF PLAY OUR NEXT CHAPTER",
    heading: "우리가 만들어갈 즐거움의 미래",
    description:
      "우리의 여정은 이제 시작입니다.\n\n단순히 세계 1위 iGaming 기업이 되는 것을 넘어, 우리는 디지털 세상 속에서 사람들이 함께 웃고, 경쟁하고, 소통할 수 있는 세상에서 가장 거대하고 즐거운 공간을 꿈꿉니다.",
    listItems:
      "\nNSUSLAB이 만들어갈 미래는 게임의 경계를 넘어,\n새로운 연결과 즐거움의 시대가 될 것입니다.",
    bgColor: "#000000",
    primaryTextColor: "#ffffff",
    secondaryTextColor: "#ffffff",
  },
  {
    title: "WRITE THE NEXT CHAPTER OF PLAY",
    heading: "다음 챕터를 함께 만들어갈\n플레이어를 찾습니다",
    description:
      "상상은 현실이 되고, 성공은 더 큰 미래를 엽니다.\n우리의 미션은 단순히 게임을 만드는 것을 넘어, '재미'를 통해 세상을 연결하는 것입니다.\n이 거대하고 즐거운 미래를 함께 만들어갈 최고의 플레이어가 필요합니다. 최고의 플레이어에게는 최고의 Playground가 주어져야 합니다.\n\n우리는 최고의 플레이어의 역량에 대한 확신을 업계 최고 수준의 보상으로 증명합니다.\nNSUSLAB에서 최신 AI 기술과 도구를 마음껏 탐구하고, 당신의 상상과 아이디어를 현실로 만드는 혁신을 직접 주도할 수 있습니다.",
    listItems:
      "\nNSUSLAB은 당신의 잠재력이 폭발하고 성장의 한계가 사라지는 완벽한 Playground입니다.",
    bgColor: "#000000",
    primaryTextColor: "#ffffff",
    secondaryTextColor: "#ffffff",
  },
];

// Key Achievement Section
interface Achievement {
    title: string;
    subTitle: string;
    description: string;
    image: string;
}

export const achievementData: Achievement[] = [
    {
        title: "Global No.1 Traffic - GGPoker",
        subTitle: "전 세계 포커 시장 점유율 1위",
        description: "NSUS Group의 GGPoker는 현재 기준 고객 유입률, Cash, Peak traffic 등 전반적인 모든 지표에서 압도적인 시장 점유율을 차지하고 있으며, 그 격차를 지속적으로 확대하고 있습니다.",
        image: whoweare_ggpoker
    },
    {
        title: "Expanding the market for iGaming",
        subTitle: "Global iGaming Industry 확장",
        description: "NSUS Group은 유럽, 미주, 아시아, 남미 등의 주요 국가와 우호적인 파트너십 관계를 바탕으로 새로운 시장을 지속적으로 개척하여 보다 많은 사람들에게 즐거운 서비스를 제공하려 노력하고 있습니다.",
        image: whoweare_globalnetwork
    },
    {
        title: "ISO Certified Company",
        subTitle: "세계 최고 수준의 정보 보안 관리",
        description: "NSUS Group은 BMM Testlabs 을 통해 제품의 안전성 및 공정성에 대한 인증을 받았습니다. 이를 통해 각 국가 별로 정해진 규정을 지키고 안정적인 제품과 서비스를 제공 하고 있습니다.",
        image: whoweare_iso
    },
    {
        title: "GGPoker & WSOP Partnership",
        subTitle: "세계 최대 규모의 포커 토너먼트 대회 운영사",
        description: "NSUS Group은 세계 최대 규모의 토너먼트 WSOP - World Series of Poker의 운영사로서 iGaming 산업 전반에서 지속적으로 영향력을 확대해 나가고 있습니다.",
        image: whoweare_wsop
    }
];

// Culture Section
interface Culture {
    id: number;
    image: string;
    title: string;
    description: string;
    linkTo: string;
    linkText: string;
}

export const cultureData: Culture[] = [
    {
        id: 1,
        image: whoweare_iGaming,
        title: "도전과 성장의 기회",
        description: "실시간 글로벌 서비스를 운영한다는 것은 도전적인 과제입니다. 그리고 그 도전을 함께 할 수 있는 다양한 역량을 가진 엔지니어와 함께 서로의 경험과 지식을 공유하며 성장합니다.",
        linkTo: "/departments",
        linkText: "What We Do",
    },
    {
        id: 2,
        image: cardImg2,
        title: "자유롭고 수평적인 문화",
        description: "자유롭고 수평적인 업무 환경과 직원 간 유대를 중시하며 어떠한 이슈라도 의견을 제시하고 정당한 피드백을 받을 수 있는 앤서스만의 기업 문화를 만들어가고 있습니다.",
        linkTo: "/culture",
        linkText: "NSUS Culture",
    },
    {
        id: 3,
        image: whoweare_culture3,
        title: "최고의 보상과 근무 환경",
        description: "폭발적인 성장세와 매출을 기반으로 업계 평균을 상회하는 보상을 제공하여 구성원의 안정적인 생활을 보장하고, 업무에 몰입할 수 있는 최적의 업무 환경을 제공합니다.",
        linkTo: "/financial-info",
        linkText: "Financial Info",
    }
];



