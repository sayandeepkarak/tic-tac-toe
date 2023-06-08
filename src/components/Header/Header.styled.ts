import styled from "styled-components";

export const Head = styled.header<any>`
  width: 100vw;
  display: flex;
  padding: 25px 40px;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: var(--yellow);
  border: none;
  outline: none;
  padding: 7px 20px;
  cursor: pointer;
`;

type ImgProps = {
  isOpen: boolean;
};
export const Icon = styled.img.attrs({ alt: "x" })<ImgProps>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.2s linear;
`;
