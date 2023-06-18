import { animated } from "react-spring";
import styled from "styled-components";

export const Button = styled(animated.button)`
  font-family: "Reggae One", cursive;
  box-shadow: inset 4px 4px 0px var(--dark-bg),
    inset -4px -4px 0px var(--dark-bg);
  padding: 11px 68px;
  background-color: var(--yellow);
  border: 4px solid #ffffff;
  outline: none;
  cursor: pointer;
  color: var(--dark-bg);
  font-size: 1.8rem;
`;

type imgProps = {
  height: String;
};

export const Image = styled.img.attrs({
  alt: "LOGO",
})<imgProps>`
  height: ${({ height }) => height};
  filter: drop-shadow(-7px 1px 13px black);
`;

export const Avatar = styled.img.attrs({ alt: "x" })`
  height: 60px;
  border: 4px solid var(--yellow);
  border-radius: 50%;
`;

export const InfoText = styled.p`
  font-family: "Gluten", cursive;
  color: var(--light);
  font-size: 1.3rem;
  filter: drop-shadow(-7px 1px 4px black);
`;
