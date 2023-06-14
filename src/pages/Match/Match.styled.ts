import styled from "styled-components";

export const GameWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 40px 10px;
  gap: 30px;
  justify-content: start;
`;

export const VsBlock = styled.div<any>`
  height: auto;
  display: flex;
  align-items: center;
  gap: 20px;
`;

type memberProps = {
  direction: "row-reverse" | "row";
  ref?: any;
};
export const MemberBlock = styled.div<memberProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  gap: 10px;
`;

export const RoundBlock = styled.div<any>`
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  padding: 25px 0px;
  p {
    color: var(--light);
    font-size: 4rem;
    font-family: "Gluten", cursive;
  }
`;

export const RoundMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 2.5rem;
  }
`;

export const GameBlock = styled.div<any>`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  row-gap: 10px;
`;

type boxProps = {
  isWinBox: boolean;
};
export const Boxes = styled.div.attrs({ className: "gameBoxes" })<boxProps>`
  background-color: ${({ isWinBox }) =>
    isWinBox ? "var(--yellow)" : "var(--light)"};
  width: 110px;
  height: 110px;
  display: inherit;
  border-radius: 10px;
  cursor: pointer;
  font-family: Gluten, cursive;
  font-size: 3.5rem;
  place-items: center;
  transform: translate(0, -200vh);
  opacity: 0;
  scale: 0.2;
  /* transition: all 0.1s linear; */
  &:hover {
    scale: 1.1;
  }
`;
