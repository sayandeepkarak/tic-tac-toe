import Game from "./Game";
import { GameWrapper } from "./Match.styled";
import Round from "./Round";
import Vs from "./Vs";

const Match = () => {
  return (
    <>
      <GameWrapper>
        <Vs />
        <Round />
        <Game />
      </GameWrapper>
    </>
  );
};

export default Match;
