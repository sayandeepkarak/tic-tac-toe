import React from "react";
import { Image } from "../../style/g_style";
import { animated, useSpring } from "react-spring";
import BannerImage from "../../assets/ttt-banner.png";

type props = {
  isFallBack: boolean;
  fallback: React.ReactNode;
};

const AnimatedBanner = ({ isFallBack, fallback }: props) => {
  const banner = useSpring({
    from: { transform: "translateY(-10px)" },
    transform: "translateY(10px)",
    loop: { reverse: true },
    config: { duration: 3000 },
  });

  return (
    <>
      {isFallBack ? (
        fallback
      ) : (
        <Image
          as={animated.img}
          height={"450px"}
          src={BannerImage}
          style={banner}
          loading="lazy"
        />
      )}
    </>
  );
};

export default AnimatedBanner;
