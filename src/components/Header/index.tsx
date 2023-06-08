import Logo from "../../assets/ttt-logo.png";
import { Button, Head, Icon } from "./Header.styled";
import { Avatar, Image, InfoText } from "../../style/g_style";
import { InfoRow } from "../../pages/Dashboard/Dashboard.styled";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

type props = {
  isVerified: boolean;
  isOpen: boolean;
  setOpen: () => void;
  btnIcon: string;
};

const Header = ({ isOpen, setOpen, btnIcon, isVerified }: props) => {
  const root = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(isVerified ? "#info" : "#logo", { opacity: 0, x: -20 });
      gsap.from(".iconBtn", { opacity: 0, x: 20 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head ref={root}>
        {isVerified ? (
          <InfoRow id="info">
            <Avatar src="https://lh3.googleusercontent.com/a-/ACNPEu-0g44J4xjgYSZKKJDw9Hcs8xTN9uLXCp9VUgSQ=s96-c" />
            <InfoText>Sayandeep Karak</InfoText>
          </InfoRow>
        ) : (
          <Image id="logo" src={Logo} height={"100px"} />
        )}
        <Button className="iconBtn" onClick={setOpen}>
          <Icon isOpen={isOpen} src={btnIcon} />
        </Button>
      </Head>
    </>
  );
};

export default Header;
