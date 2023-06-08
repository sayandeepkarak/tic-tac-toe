import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RoundBlock, RoundMiddle } from "./Match.styled";

const Round = () => {
  const root = useRef("");
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current, { opacity: 0, y: 50 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <>
      <RoundBlock ref={root}>
        <p>0</p>
        <RoundMiddle>
          <p>Round</p>
          <p>1</p>
        </RoundMiddle>
        <p>0</p>
      </RoundBlock>
    </>
  );
};

export default Round;
