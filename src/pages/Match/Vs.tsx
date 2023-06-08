import { Avatar, Image, InfoText } from "../../style/g_style";
import { MemberBlock, VsBlock } from "./Match.styled";
import VsImage from "../../assets/ttt-vs.png";
import { Expo, gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

let url =
  "https://lh3.googleusercontent.com/a-/ACNPEu-0g44J4xjgYSZKKJDw9Hcs8xTN9uLXCp9VUgSQ=s96-c";

const Vs = () => {
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
        <MemberBlock id="firstBlock" direction="row">
          <Avatar src={url} />
          <InfoText>Sayandeep Karak</InfoText>
        </MemberBlock>
        <Image id="vsImage" height="130px" src={VsImage} />
        <MemberBlock id="secondBlock" direction="row-reverse">
          <Avatar src={url} />
          <InfoText>Sayandeep Karak</InfoText>
        </MemberBlock>
      </VsBlock>
    </>
  );
};

export default Vs;
