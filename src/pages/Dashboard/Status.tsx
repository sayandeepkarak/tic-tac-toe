import { useLayoutEffect, useRef } from "react";
import { Image, InfoText } from "../../style/g_style";
import { InfoBlock, InfoRow } from "./Dashboard.styled";
import thunderIcon from "../../assets/thunder..png";
import { gsap } from "gsap";

type props = {
  players: number;
  points: number | undefined;
};

const UserInfo = ({ players, points }: props) => {
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
          <InfoText>{points}</InfoText>
        </InfoRow>
        <InfoText>Online : {players - 1}</InfoText>
      </InfoBlock>
    </>
  );
};

export default UserInfo;
