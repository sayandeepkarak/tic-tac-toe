import styled from "styled-components";

export const Head = styled.header<any>`
  width: 100%;
  display: flex;
  padding: 25px 40px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 25px 30px;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const Button = styled.button<any>`
  background-color: var(--yellow);
  border: none;
  outline: none;
  padding: 7px 20px;
  cursor: pointer;
  @media (max-width: 600px) {
    ${(props) => props.isVerified && "position: absolute"};
    ${(props) => props.isVerified && "transform: translateY(70px) !important"};
  }
`;

type ImgProps = {
  isOpen?: boolean;
};
export const Icon = styled.img.attrs({ alt: "x" })<ImgProps>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.2s linear;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
