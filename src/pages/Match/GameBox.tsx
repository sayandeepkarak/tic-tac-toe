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
};

const GameBox = ({
  value,
  position,
  isFinish,
  finishIndex,
  isTurn,
  socket,
  matchId,
}: props) => {
  const handleClick = () => {
    if (isTurn) {
      socket.emit("updateSimulation", position, matchId);
    }
  };

  return (
    <>
      <Boxes
        onClick={handleClick}
        isWinBox={isFinish && finishIndex.includes(position)}
      >
        {value}
      </Boxes>
    </>
  );
};

export default GameBox;
