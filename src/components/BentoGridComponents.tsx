import React, { useState, useRef } from "react";

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  mediaType?: "video" | "image";
  mediaSrc?: string;
  title?: React.ReactNode;
  description?: string;
  isComingSoon?: boolean;
}

interface TextCardProps {
  title: React.ReactNode;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

const MediaBackground: React.FC<{
  mediaType?: "video" | "image";
  src?: string;
}> = ({ mediaType, src }) => {
  const className =
    "absolute left-0 top-0 size-full object-cover object-center";

  if (mediaType === "video" && src) {
    return (
      <video src={src} loop muted autoPlay playsInline className={className} />
    );
  }
  if (mediaType === "image" && src) {
    return <img src={src} alt="" className={className} />;
  }
  return null;
};

export const BentoCard: React.FC<BentoCardProps> = ({
  mediaType,
  mediaSrc,
  title,
  description,
}) => {
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  return (
    <div
      className="relative size-full overflow-hidden rounded-md border-hsla"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <MediaBackground mediaType={mediaType} src={mediaSrc} />

      <div
        className={`pointer-events-none absolute inset-0 z-[5] max-md:bg-black/60 md:bg-gradient-to-b md:from-black/80 md:to-transparent md:to-70% transition-opacity duration-300 ${
          isCardHovered ? "opacity-60" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex size-full flex-col justify-between p-5 transition-opacity duration-300`}
      >
        <div>
          <h1 className="bento-title text-white">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 lg:max-w-96 text-xs md:text-base text-white opacity-80">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const TextCard: React.FC<TextCardProps> = ({ title }) => {
  return (
    <div className="flex size-full flex-col justify-between overflow-hidden rounded-md bg-black p-5">
      <h1 className="bento-title max-w-64 lg:max-w-96 text-white">{title}</h1>
    </div>
  );
};
