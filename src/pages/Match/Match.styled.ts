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
  left: boolean;
};
export const MemberBlock = styled.div<memberProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  gap: 1.8vh;
  ${({ left }) => left && "filter:grayscale(1)"}
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
  isMyTurn: boolean;
  isOpponentOffline: boolean;
};
export const Boxes = styled.div.attrs({ className: "gameBoxes" })<boxProps>`
  background-color: ${({ isWinBox }) =>
    isWinBox ? "var(--yellow)" : "var(--light)"};
  width: 110px;
  height: 110px;
  display: inherit;
  border-radius: 10px;
  cursor: ${({ isMyTurn }) => (isMyTurn ? "pointer" : "not-allowed")};
  ${({ isOpponentOffline }) =>
    isOpponentOffline && "cursor: not-allowed !important"};
  font-family: Gluten, cursive;
  font-size: 3.5rem;
  place-items: center;
  transform: translate(0, -100vh);
  opacity: 0;
  scale: 0.2;
  &:hover {
    scale: 1.1;
  }
`;

export const ResultBlock = styled.div<any>`
  background-color: ${({ isWin }) =>
    isWin === "draw"
      ? "var(--yellow)"
      : isWin
      ? "var(--success)"
      : "var(--error)"};
  height: min-content;
  padding: 35px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 2vw;
  p {
    ${({ isWin }) => isWin === "draw" && "color:var(--dark-bg) !important"}
  }
`;

export const ResultHead = styled.p`
  font-size: 5rem;
  color: var(--light);
  font-family: "Gluten", cursive;
  opacity: 0;
`;

export const ResultText = styled.p`
  font-family: "Reggae One", cursive;
  font-size: 2rem;
  color: var(--light);
  opacity: 0;
`;

export const TurnIndicator = styled.p`
  position: absolute;
  bottom: 0;
  opacity: 0;
  color: var(--light);
  right: 40px;
  font-family: "Gluten", cursive;
  font-size: 1.8rem;
`;

export const DisconnectBlock = styled(RoundMiddle)<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 25px 0px;
  p {
    color: var(--light);
    font-family: "Gluten", cursive;
  }
`;
