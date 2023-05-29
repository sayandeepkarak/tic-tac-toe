import { useState } from "react";
import Logo from "../assets/ttt-logo.png";
import styled from "styled-components";
import LoginIcon from "../assets/login.png";
import IconButton from "./IconButton";

const Header = () => {
  const [options, setOptions] = useState<boolean>(false);

  const toggleOptions = () => {
    setOptions((old) => !old);
  };

  return (
    <>
      <Head>
        <LogoImage src={Logo} />
        <IconButton click={toggleOptions}>
          <Icon isOpen={options} src={LoginIcon} />
        </IconButton>
      </Head>
    </>
  );
};

export default Header;

const Head = styled.header`
  width: 100vw;
  display: flex;
  padding: 25px 40px;
  justify-content: space-between;
  align-items: center;
`;

const LogoImage = styled.img.attrs({ alt: "LOGO" })`
  height: 110px;
  filter: drop-shadow(-7px 1px 13px black);
`;

type ImgProps = {
  isOpen: boolean;
};
const Icon = styled.img.attrs({ alt: "x" })<ImgProps>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.2s linear;
`;
