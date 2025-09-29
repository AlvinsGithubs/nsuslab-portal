import s1Img from '@/asset/imgs/about-us-Img/s1Img.jpg';
import s2Img from '@/asset/imgs/about-us-Img/s2Img.jpg';
import whoweare_b from '@/asset/imgs/about-us-Img/whoweare_b.jpg';
import whoweare_miro from '@/asset/imgs/about-us-Img/whoweare_miro.jpg';
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
    description: string;
    listItems: string[];
    imageSrc: string;
    bgColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
}

export const featureData: Feature[] = [
    {
        title: "Our Mission",
        heading: "iGaming을 통해\n세상을 연결합니다",
        description: "NSUS Group은 현재 북미, 유럽, 아시아 등 지역에 700명 이상의 임직원들이 일하고 있는 다국적 기업으로 iGaming 업계의 유니콘이며, NSUSLAB은 NSUS Group의 개발 스튜디오로서 그룹의 핵심적인 역할을 담당하고 있습니다.\n\n우리는 iGaming을 통해 세상을 연결하고자 합니다. 이를 통해 유저의 즐거움을 극대화 하는 것이 NSUSLAB이 지향하는 궁극적인 목표이자 존재의 이유입니다.",
        listItems: ["NSUS Group - Forefront of marketing and technology", "NSUSLAB - Development Studio"],
        imageSrc: s1Img,
        bgColor: '#111111',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "Our Vision",
        heading: "Global No.1\niGaming Company",
        description: "NSUSLAB은 그 누구도 감히 상상하지 못했던 Global No.1 Poker Game 이라는 성공 신화를 만든 노하우를 바탕으로 Casino 시장에서도 또 한 번 혁신적인 제품을 가지고 세계 최고가 되고자 합니다. \n\n이를 통해 iGaming Industry 전반에서 독보적인 리더로 자리매김할 것입니다.",
        listItems: ["GGPoker - Classic Games", "GGPoker - Tournament", "GGVegas - Table Games", "GGVegas - Slots","ClubGG","WSOP+" ],
        imageSrc: s2Img,
        bgColor: '#841e09',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    },
    {
        title: "Our Value",
        heading: "새로운 차원의\n엔터테인먼트를 제공합니다",
        description: "NSUSLAB은 새로운 차원의 엔터테인먼트를 제공하여 \nGlobal iGaming Community의 리더가 되고자 합니다. \n\n명품을 만들기 위해서는 끊임없는 노력과 인내가 필요합니다. 이 도전이 쉽지 않은 것을 알기에 확신이 없는 프로젝트는 시작하지 않을 것이며, 한번 시작한 프로젝트는 명품이 될 때까지 지속적인 지원이 이루어 지도록 할 것입니다.",
        listItems: [],
        imageSrc: whoweare_b,
        bgColor: '#4f46e5',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffedd5',
    },
    {
        title: "We're Hiring",
        heading: "NSUSLAB의 위대한 도전을\n함께하실 분을 찾습니다.",
        description: "외부 투자에 의지하고 성공에 대한 막연한 희망으로 프로젝트를 진행하는 대부분의 게임 개발사와는 달리, NSUSLAB은 성공한 제품과 사업에 의한 안정적 매출을 기반으로 보다 큰 성공을 이루기 위해 달리고 있습니다. \n\n 우리는 단지 꿈만 꾸는 것이 아닌, 좋은 현실을 더 좋게 만들고자 합니다. 안정적인 개발 환경에서 세계 시장을 제패하기 위해 도전적 성장과 경험을 함께 할 좋은 인재들을 적극 영입하고 있습니다.",
        listItems: ["도전과 성장의 기회", "자유롭고 수평적인 문화", "최고의 보상과 근무 환경"],
        imageSrc: whoweare_miro,
        bgColor: '#111111',
        primaryTextColor: '#ffffff',
        secondaryTextColor: '#ffffff',
    }
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

export const cultureTitle = {
    line1: "상상 그 이상의 즐거움",
    line2: "NSUSLAB이 여러분을 기다립니다",
};

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



