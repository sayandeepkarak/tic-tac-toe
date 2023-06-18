import { Avatar, Image, InfoText } from "../../style/g_style";
import { MemberBlock, VsBlock } from "./Match.styled";
import VsImage from "../../assets/ttt-vs.png";
import { Expo, gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

type props = {
  users?: {
    names: string[];
    images: string[];
  };
  opponentIndex: number | undefined;
  isLeft: boolean;
};

const Vs = ({ users, opponentIndex, isLeft }: props) => {
  const root = useRef();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from("#firstBlock", { opacity: 0, x: -50 });
      gsap.from("#secondBlock", { opacity: 0, x: 50 });
      gsap.from("#vsImage", { opacity: 0, scale: 0, ease: Expo.easeInOut });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <>
      <VsBlock ref={root}>
        <MemberBlock
          id="firstBlock"
          direction="row"
          left={isLeft && opponentIndex === 0}
        >
          <Avatar src={users?.images[0]} />
          <InfoText>{users?.names[0]}</InfoText>
        </MemberBlock>
        <Image id="vsImage" height="130px" src={VsImage} />
        <MemberBlock
          id="secondBlock"
          direction="row-reverse"
          left={isLeft && opponentIndex === 1}
        >
          <Avatar src={users?.images[1]} />
          <InfoText>{users?.names[1]}</InfoText>
        </MemberBlock>
      </VsBlock>
    </>
  );
};

export default Vs;
