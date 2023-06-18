import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { DisconnectBlock } from "./Match.styled";
import { gsap } from "gsap";

const DisconnectCounter = () => {
  const root = useRef("");
  const [time, setTime] = useState<number>(59);
  const [falseTime, setFalseTime] = useState<number>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current, { opacity: 0, y: 50 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (time < 10) setFalseTime(0);
    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0) clearTimeout(timer);
  }, [time]);

  return (
    <DisconnectBlock ref={root}>
      <p>Oppoent left</p>
      <p>
        00 : {falseTime}
        {time}
      </p>
    </DisconnectBlock>
  );
};

export default DisconnectCounter;
