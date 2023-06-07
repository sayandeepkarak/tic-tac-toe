import { Boxes } from "./Match.styled";

type valueType = "X" | "O" | "";

type props = {
  value: valueType;
  change: (index: number) => void;
  position: number;
  isFinish: boolean;
  finishIndex: number[];
};

const GameBox = ({ value, change, position, isFinish, finishIndex }: props) => {
  const handleClick = () => {
    if (value != "X" && value != "O") {
      change(position);
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
