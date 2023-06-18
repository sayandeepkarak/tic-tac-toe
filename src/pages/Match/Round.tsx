import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RoundBlock, RoundMiddle } from "./Match.styled";

type props = {
  points: number[];
  round: number;
};

const Round = ({ points, round }: Partial<props>) => {
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
        <p>{points && points[0]}</p>
        <RoundMiddle>
          <p>Round</p>
          <p>{round}</p>
        </RoundMiddle>
        <p>{points && points[1]}</p>
      </RoundBlock>
    </>
  );
};

export default Round;
