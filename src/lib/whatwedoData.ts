import whatwedoVideo from "@/asset/videos/whatwedo-1.mp4";
import ggpoker_feature_bounty from "@/asset/videos/ggpoker_feature_bounty.mp4";
import ggpoker_feature_splash from "@/asset/videos/ggpoker_feature_splash.mp4";
import ggpoker_feature_splash2 from "@/asset/videos/ggpoker_feature_splash2.mp4";
import ggpoker_feature_squeeze from "@/asset/videos/ggpoker_feature_squeeze.mp4";
import ggpoker_feature_timebank from "@/asset/videos/ggpoker_feature_timebank.mp4";
import whoweare_ggpoker from "@/asset/imgs/whoweare_ggpoker.webp";

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
    id: 5,
    type: "textOnly",
    className: "",
    title: "Unique Features That Make Poker Exciting",
  },
  {
    id: 2,
    type: "default",
    className: "row-span-1 md:col-span-1 md:row-span-2",
    title: "bounty",
    description:
      "The only thing more exciting than KOing the villain is discovering the bounty is a Jackpot",
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
      "Express your feelings using new actions. Items can be obtained if you lose a big pot. They can be used on opponents that beat you.",
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
      "Use the thumbs up/down reaction to express your feelings. All users, including those sitting-out, can send bet reactions.",
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
      "When you are at a crossroad, Take some Time and shape your destiny",
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
    id: 2,
    type: "textOnly",
    className: "",
    title: "Where Fun Meets Innovation ",
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
    id: 8,
    type: "textOnly",
    className: "",
    title: "A Modern Interpretation of Classic Games",
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
    description:
      "Unlimited attempts, win prizes daily",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg1,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Live Events",
    description:
      "Register to the best LIVE poker tournaments",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg2,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Your Own Club",
    description:
      "Invite your friends & playing poker, anywhere, anytime.",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: clubgg3,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Club Features",
    description:
      "Customizable game settings & game variation",
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
    description:
      "Distribution and management of thousands of casino games",
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
    description:
      "World's #1 MTT Staking Platform",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: plus1,
  },
  {
    id: 3,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "WSOP+ App",
    description:
      "Official WSOP Live Tournament Schedule App",
    isComingSoon: true,
    mediaType: "image",
    mediaSrc: plus2,
  },
  {
    id: 4,
    type: "default",
    className: "md:col-span-1 md:me-0",
    title: "Management Tool",
    description:
      "Admin Tool for MTT Management",
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