import { Image, InfoText } from "../../style/g_style";
import { InfoBlock, InfoRow } from "./Dashboard.styled";
import thunderIcon from "../../assets/thunder..png";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const UserInfo = () => {
  const root = useRef("");
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current, {
        opacity: 0,
        y: 20,
        stagger: 0.25,
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <>
      <InfoBlock ref={root}>
        <InfoRow>
          <Image height="30px" src={thunderIcon} />
          <InfoText>200</InfoText>
        </InfoRow>
        <InfoText>Online : 30</InfoText>
      </InfoBlock>
    </>
  );
};

export default UserInfo;
