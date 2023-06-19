import Logo from "../../assets/ttt-logo.png";
import { Button, ControlWrapper, Head, Icon } from "./Header.styled";
import { Avatar, Image, InfoText } from "../../style/g_style";
import { InfoRow } from "../../pages/Dashboard/Dashboard.styled";
import { useLayoutEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import logoutIcon from "../../assets/logout.png";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import setTokens from "../../modules/token";

type props = {
  isVerified: boolean;
  isOpen: boolean;
  setOpen: () => void;
  btnIcon: string;
  name?: string | undefined;
  image?: string | undefined;
};

const Header = ({
  isOpen,
  setOpen,
  btnIcon,
  isVerified,
  name,
  image,
}: props) => {
  const root = useRef();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(isVerified ? "#info" : "#logo", { opacity: 0, x: -20 });
      gsap.from(".iconBtn", { opacity: 0, x: 20 });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleLogout = useCallback(async () => {
    if (!Cookies.get("accesstoken")) {
      await setTokens(navigate);
    }
    try {
      const res = await fetch(VITE_REACT_BACKEND_URL + "/api/logout", {
        credentials: "include",
      });
      if (res.ok) {
        Cookies.remove("accesstoken");
        Cookies.remove("refreshtoken");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Head ref={root}>
        {isVerified ? (
          <InfoRow id="info">
            <Avatar src={image} />
            <InfoText>{name}</InfoText>
          </InfoRow>
        ) : (
          <Image id="logo" src={Logo} height={"100px"} />
        )}
        <ControlWrapper>
          <Button className="iconBtn" onClick={setOpen}>
            <Icon isOpen={isOpen} src={btnIcon} />
          </Button>
          {isVerified && (
            <Button
              className="iconBtn"
              isVerified={isVerified}
              onClick={handleLogout}
            >
              <Icon src={logoutIcon} />
            </Button>
          )}
        </ControlWrapper>
      </Head>
    </>
  );
};

export default Header;
