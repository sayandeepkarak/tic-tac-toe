import { Socket } from "socket.io-client";
import { Boxes } from "./Match.styled";

type valueType = "X" | "O" | "";

type props = {
  value: valueType;
  position: number;
  isFinish: boolean;
  finishIndex: number[];
  socket: Socket;
  isTurn: boolean;
  matchId: string;
  opponentOffline: boolean;
};

const GameBox = ({
  value,
  position,
  isFinish,
  finishIndex,
  isTurn,
  socket,
  matchId,
  opponentOffline,
}: props) => {
  const handleClick = () => {
    if (isTurn && !opponentOffline) {
      socket.emit("updateSimulation", position, matchId);
    }
  };

  return (
    <>
      <Boxes
        onClick={handleClick}
        isWinBox={isFinish && finishIndex.includes(position)}
        isMyTurn={isTurn}
        isOpponentOffline={opponentOffline}
      >
        {value}
      </Boxes>
    </>
  );
};

export default GameBox;
