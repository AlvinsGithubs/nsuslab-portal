import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import type { FC } from "react";

import ggvegas_casino from "@/asset/videos/ggvegas_casino.mp4";
import ggvegas_logo from "@/asset/imgs/ggvegas_logo.png";

gsap.registerPlugin(ScrollTrigger);

const GGVegasTitleSection: FC = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
     <div className="max-w-6xl mx-auto md:px-10 flex flex-col items-center gap-10 px-5 py-20 text-center">
        <div className="flex w-full justify-center">
          <img
            src={ggvegas_logo}
            alt="GGVegas Logo"
            className="h-10 w-auto lg:h-16"
          />
        </div>

        <div>
          <p className="whitespace-pre-line text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Next Generation of Multiplayer RNG Games
          </p>
          <p className="mx-auto mt-6 max-w-6xl whitespace-pre-line text-md leading-relaxed text-white opacity-80 lg:text-lg pb-7">
            GGVegas는 새롭고, 짜릿하며, 즐거운 경험을 선사합니다. <br/>수많은 사람들을 사로잡는 카지노 게임의 핵심 요소를 깊이 이해하고 있으며, 잊을 수 없는 경험을 선사하기 위해 최선을 다하고 있습니다.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src={ggvegas_casino} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default GGVegasTitleSection;
