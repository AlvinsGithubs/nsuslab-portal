import ggpoker_feature_bounty from "@/asset/videos/ggpoker_feature_bounty.mp4";
import ggpoker_feature_splash from "@/asset/videos/ggpoker_feature_splash.mp4";
import ggpoker_feature_splash2 from "@/asset/videos/ggpoker_feature_splash2.mp4";
import ggpoker_feature_timebank from "@/asset/videos/ggpoker_feature_timebank.mp4";
import whoweare_ggpoker from "@/asset/imgs/about-us-Img/whoweare_ggpoker.webp";

import ggvegas_mov1 from "@/asset/imgs/slotImg/ggvegas_mov1.gif";
import ggvegas_mov2 from "@/asset/imgs/slotImg/ggvegas_mov2.gif";
import ggvegas_mov3 from "@/asset/imgs/slotImg/ggvegas_mov3.gif";
import ggvegas_mov4 from "@/asset/imgs/slotImg/ggvegas_mov4.gif";
import ggvegas_mov5 from "@/asset/imgs/slotImg/ggvegas_mov5.gif";
import ggvegas_mov7 from "@/asset/imgs/slotImg/ggvegas_mov7.gif";
import ggvegas_mov8 from "@/asset/imgs/slotImg/ggvegas_mov8.gif";
import ggvegas_mov9 from "@/asset/imgs/slotImg/ggvegas_mov9.gif";

import clubgg1 from "@/asset/imgs/clubggImg/clubgg1.png";
import clubgg2 from "@/asset/imgs/clubggImg/clubgg2.jpg";
import clubgg3 from "@/asset/imgs/clubggImg/clubgg3.png";
import clubgg4 from "@/asset/imgs/clubggImg/clubgg4.png";

import cp1 from "@/asset/imgs/cpImg/cp1.png";
import cp2 from "@/asset/imgs/cpImg/cp2.png";
import cp3 from "@/asset/imgs/cpImg/cp3.png";
import cp4 from "@/asset/imgs/cpImg/cp4.png";

import plus1 from "@/asset/imgs/plusImg/plus1.avif";
import plus2 from "@/asset/imgs/plusImg/plus2.avif";
import plus3 from "@/asset/imgs/plusImg/plus3.avif";
import plus4 from "@/asset/imgs/plusImg/plus4.jpg";

import wsop1 from "@/asset/imgs/wsopImg/wsop1.jpg";
import wsop2 from "@/asset/imgs/wsopImg/wsop2.jpg";

// Bento Card Data
export type BentoCardType = "default" | "textOnly" | "mediaOnly";

export interface BentoGridItem {
  id: number;
  type: BentoCardType;
  className: string;
  title?: React.ReactNode;
  description?: string;
  isComingSoon?: boolean;
  mediaType?: "video" | "image";
  mediaSrc?: string;
}

export const ggpokerData: BentoGridItem[] = [
  {
    id: 2,
    type: "default",
    className: "row-span-1 md:col-span-1 md:row-span-2",
    title: "bounty",
    description:
      "상대방을 쓰러트리는 짜릿한 순간, 잭팟 바운티가 더해져 승리의 기쁨을 극대화합니다.",
    isComingSoon: true,
    mediaType: "video",
    mediaSrc: ggpoker_feature_bounty,
  },
  {
    id: 3,
    type: "default",
    className: "row-span-1 md:col-span-1 md:ms-0",
    title: "Splash",
    description:
      "새로운 '스플래시' 기능으로 테이블 위에서 감정을 생생하게 표현하세요. 큰 팟을 아쉽게 놓쳤을 때 얻는 아이템으로 상대방과 재치 있는 상호작용이 가능합니다.",
    isComingSoon: true,
    mediaType: "video",
    mediaSrc: ggpoker_feature_splash,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Reactions",
    description:
      "'좋아요/싫어요' 리액션으로 자신의 생각을 즉각적으로 표현하세요. 자리를 비운 플레이어를 포함, 테이블의 모든 유저가 베팅에 대한 반응을 실시간으로 공유할 수 있습니다.",
    isComingSoon: true,
    mediaType: "video",
    mediaSrc: ggpoker_feature_splash2,
  },

  {
    id: 6,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Time Bank Card",
    description:
      "승부의 결정적인 순간, '타임 뱅크 카드'로 소중한 시간을 확보하세요. 신중한 결정으로 승리의 흐름을 가져올 수 있습니다.",
    isComingSoon: true,
    mediaType: "video",
    mediaSrc: ggpoker_feature_timebank,
  },
];

export const ggvegasData: BentoGridItem[] = [
  {
    id: 1,
    type: "textOnly",
    className: "",
    title: "-",
  },
  {
    id: 3,
    type: "default",
    className: "row-span-1 md:col-span-1 md:row-span-2",
    title: "High-quality Features",
    description:
      "Unique titles you won’t find anywhere else, with fresh drops all the time—only at GGVegas.",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov1,
  },
  {
    id: 4,
    type: "default",
    className: "row-span-1 md:col-span-1 md:ms-0",
    title: "fun experiences",
    description: "GGVegas brings non-stop action straight to your fingertips",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov2,
  },
  {
    id: 5,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "New Originals",
    description: "Fresh games are always dropping. Heres what coming next.",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov3,
  },
  {
    id: 6,
    type: "default",
    className: "row-span-1 md:col-span-1 md:row-span-2",
    title: "GGVegas App",
    description: "Vegas in Hand Spin Smart, Win Happy",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov5,
  },
  {
    id: 7,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "High-quality Features",
    description:
      "When you are at a crossroad, Take some Time and shape your destiny",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov4,
  },
  {
    id: 9,
    type: "default",
    className: "row-span-1 md:col-span-1 md:ms-0",
    title: "Table Games",
    description: "Multi-Table Feature",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov7,
  },
  {
    id: 10,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Cowboy Hold'em",
    description: "Mode Variety",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov8,
  },
  {
    id: 11,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Shark Crash",
    description: "Graphic Excellence",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: ggvegas_mov9,
  },
];

export const clubGGData: BentoGridItem[] = [
  {
    id: 1,
    type: "default",
    className: "border-hsla relative mb-7 h-96 w-full md:h-[65vh]",
    title: "",
    description: "",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: whoweare_ggpoker,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Platinum Membership",
    description: "Unlimited attempts, win prizes daily",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg1,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Live Events",
    description: "Register to the best LIVE poker tournaments",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg2,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Your Own Club",
    description: "Invite your friends & playing poker, anywhere, anytime.",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg3,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Club Features",
    description: "Customizable game settings & game variation",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg4,
  },
];

export const platformData: BentoGridItem[] = [
  {
    id: 1,
    type: "default",
    className: "border-hsla relative mb-7 h-96 w-full md:h-[65vh]",
    title: "",
    description: "",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: whoweare_ggpoker,
  },
  {
    id: 2,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Platform Solutions",
    description: "Distribution and management of thousands of casino games",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: cp1,
  },
  {
    id: 3,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Trust and Safety",
    description:
      "Thorough testing and licensing to guarantee fairness and responsible practices",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: cp2,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Third-Party Integration",
    description:
      "Seamless, high-performance systems integration with world renowned studios",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: cp3,
  },
  {
    id: 5,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Engagement Resources",
    description:
      "Integrated utilities for marketing and customer outreach strategies",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: cp4,
  },
];

export const plusData: BentoGridItem[] = [
  {
    id: 1,
    type: "default",
    className: "border-hsla relative mb-7 h-96 w-full md:h-[65vh]",
    title: "",
    description: "",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: whoweare_ggpoker,
  },
  {
    id: 2,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "PokerStake",
    description: "World's #1 MTT Staking Platform",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: plus1,
  },
  {
    id: 3,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "WSOP+ App",
    description: "Official WSOP Live Tournament Schedule App",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: plus2,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Management Tool",
    description: "Admin Tool for MTT Management",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: plus3,
  },
  {
    id: 5,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Play Online",
    description:
      "Experience the WSOP+ now for everything you need to know about WSOP at your fingertips!",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: plus4,
  },
];

type ImageSource = string;

interface WSOPCardData {
  id: number;
  image: ImageSource;
  title: string;
  description: string;
}

export const wsopCardData: WSOPCardData[] = [
  {
    id: 1,
    image: wsop1,
    title: "This outstanding object",
    description:
      "NSUS Group은 세계 최대 규모의 토너먼트 WSOP의 운영사로서 iGaming Industry 전반에서 지속적으로 영향력을 확대해 나가고 있습니다.",
  },
  {
    id: 2,
    image: wsop2,
    title: "A greater object",
    description:
      "NSUS Group은 Poker의 살아 있는 전설 Daniel Negreanu 등, 세계 최고의 포커 플레이어들과 Ambassador 계약을 맺고 그들의 활동을 전폭 지원하고 있습니다.",
  },
  {
    id: 3,
    image: plus1,
    title: "WSOP+",
    description:
      "WSOP에 대해 알아야 할 모든 것이 손끝에서 펼쳐집니다. 지금 WSOP+를 만나보세요.",
  },
];
