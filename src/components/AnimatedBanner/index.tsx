import React, { useLayoutEffect } from "react";
import { Button, Image } from "../../style/g_style";
import { animated, useSpring } from "react-spring";
import BannerImage from "../../assets/ttt-banner.png";
import { gsap } from "gsap";

type props = {
  isFallBack: boolean;
  fallback: React.ReactNode;
  click: () => void;
  btnText: string;
};

const AnimatedBanner = ({ isFallBack, fallback, click, btnText }: props) => {
  const banner = useSpring({
    from: { transform: "translateY(-10px)" },
    transform: "translateY(10px)",
    loop: { reverse: true },
    config: { duration: 3000 },
  });

  useLayoutEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(".bannerImg", { opacity: 0 }, { opacity: 1 });
    timeline.fromTo(
      ".middleBtn",
      { scale: 0, opacity: 0, y: 1000 },
      { scale: 0.5, opacity: 1, y: 500, ease: "expo.out" }
    );
    timeline.to(".middleBtn", { scale: 1, y: 0, ease: "expo.out" });
    return () => {
      timeline.kill();
    };
  }, []);

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
          className="bannerImg"
        />
      )}
      <Button className={"middleBtn"} onClick={click}>
        {btnText}
      </Button>
    </>
  );
};

export default AnimatedBanner;
