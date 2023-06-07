import { useState, useCallback, useEffect } from "react";
import GameBox from "./GameBox";
import { GameBlock } from "./Match.styled";

type valueType = "X" | "O" | "";
const wins: Array<Array<number>> = [
  [0, 1, 2],
  [0, 3, 6],
  [6, 7, 8],
  [2, 5, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

type props = {};

type state = {
  allValues: valueType[];
  turn: boolean;
  step: number;
  isFinish: boolean;
  finishIndex: number[];
};

const initialState: state = {
  allValues: Array(9).fill(""),
  turn: false,
  step: 0,
  isFinish: false,
  finishIndex: Array(3).fill(-1),
};

const Game = ({}: props) => {
  const [{ allValues, finishIndex, isFinish, step, turn }, setState] =
    useState<state>(initialState);

  const checkMatch = useCallback((): boolean => {
    for (let i = 0; i < wins.length; i++) {
      const first = allValues[wins[i][0]];
      const second = allValues[wins[i][1]];
      const third = allValues[wins[i][2]];
      if (
        first === second &&
        second === third &&
        (third === "O" || third === "X")
      ) {
        setState((old) => ({ ...old, finishIndex: [...wins[i]] }));
        return true;
      }
    }
    return false;
  }, [allValues]);

  const handleChange = (index: number) => {
    if (!isFinish) {
      const newArr: valueType[] = [...allValues];
      newArr[index] = turn ? "X" : "O";
      setState((old) => ({
        ...old,
        allValues: newArr,
        turn: !old.turn,
        step: old.step + 1,
      }));
    }
  };

  const handleReset = () => {
    setState({ ...initialState });
  };

  useEffect(() => {
    console.log(step);
    const setReset = () => {
      setTimeout(() => {
        handleReset();
      }, 1500);
    };
    if ((step > 4 && checkMatch()) || (step === 9 && !checkMatch())) {
      setState((old) => ({ ...old, isFinish: true }));
      setReset();
    }
  }, [step]);

  return (
    <>
      <GameBlock>
        {allValues.map((e, i) => {
          return (
            <GameBox
              key={i}
              value={e}
              position={i}
              isFinish={isFinish}
              finishIndex={finishIndex}
              change={handleChange}
            />
          );
        })}
      </GameBlock>
    </>
  );
};

export default Game;
