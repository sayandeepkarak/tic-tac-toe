import { Button } from "../../style/g_style";
import { useLayoutEffect, useMemo, useRef } from "react";
import { ResultBlock, ResultHead, ResultText } from "./Match.styled";
import { Elastic, gsap } from "gsap";
import { useNavigate } from "react-router-dom";

type props = {
  isWin: boolean | "draw";
};

const getResultText = ({ isWin }: props, result: string[]) => {
  switch (isWin) {
    case true:
      return result[0];
    case false:
      return result[1];
    case "draw":
      return result[2];
  }
};

const Result = ({ isWin }: props) => {
  const resTextHead = useMemo(
    () => getResultText({ isWin }, ["You win", "You loss", "Draw"]),
    [isWin]
  );
  const resText = useMemo(
    () => getResultText({ isWin }, ["Congratulations", "Oops!", "don't worry"]),
    [isWin]
  );
  const root = useRef("");
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const timeline = gsap.timeline();
    timeline.to(root.current, {
      width: 500,
      ease: Elastic.easeOut,
      duration: 1.5,
    });
    timeline.fromTo(".resulttext", { y: 30 }, { opacity: 1, y: 0 });
    timeline.fromTo(
      ".continuebtn",
      { y: 200, scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, y: 0 }
    );
    return () => {
      timeline.kill();
    };
  }, []);

  const handleContinue = () => {
    navigate("/user");
  };

  return (
    <>
      <ResultBlock ref={root} isWin={isWin}>
        <ResultHead className="resulttext">{resTextHead}</ResultHead>
        <ResultText className="resulttext">{resText}</ResultText>
      </ResultBlock>
      <Button
        className={"continuebtn"}
        style={{ backgroundColor: "var(--light)", marginTop: "4vw" }}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </>
  );
};

export default Result;
