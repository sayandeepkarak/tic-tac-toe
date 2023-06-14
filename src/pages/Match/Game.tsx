import { useState, useEffect, useLayoutEffect, useRef } from "react";
import GameBox from "./GameBox";
import { GameBlock } from "./Match.styled";
import { Bounce, gsap } from "gsap";
import { Socket } from "socket.io-client";
import { matchInfo, valueType } from "../../types/matchType";

type props = {
  socket: Socket;
  matchId: string;
  simulations: valueType[] | undefined;
  isMyTurn: boolean;
  setMatchData: (data: matchInfo) => void;
};

type state = {
  allValues: valueType[];
  isFinish: boolean;
  finishIndex: number[];
};

const initialState: state = {
  allValues: [],
  isFinish: false,
  finishIndex: Array(3).fill(-1),
};

const Game = ({
  socket,
  matchId,
  simulations,
  isMyTurn,
  setMatchData,
}: props) => {
  const [{ allValues, finishIndex, isFinish }, setState] = useState<state>({
    ...initialState,
    allValues: simulations !== undefined ? simulations : [],
  });
  const root = useRef("");

  useEffect(() => {
    socket.on("getRoundWin", (result: number[]) => {
      setState((old) => ({ ...old, isFinish: true, finishIndex: result }));
    });
    socket.on("finishRound", (data: matchInfo) => {
      const timeline = gsap.timeline();
      setTimeout(() => {
        setMatchData(data);
        setState((old) => ({ ...old, isFinish: false, finishIndex: [] }));
        timeline.to(root.current, { rowGap: 30 });
        timeline.to(root.current, { rowGap: 10 });
      }, 1500);
    });
    return () => {
      socket.off("finishRound");
    };
  }, []);

  useEffect(() => {
    setState((old) => ({
      ...old,
      allValues: simulations !== undefined ? simulations : [],
    }));
  }, [simulations]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.to(".gameBoxes", {
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        opacity: 1,
        ease: Bounce.easeOut,
      });
      timeline.to(".gameBoxes", { scale: 1, delay: 0.2 });
    }, root);
    return () => {
      ctx.kill();
    };
  }, []);

  return (
    <>
      <GameBlock ref={root}>
        {allValues.map((e, i) => {
          return (
            <GameBox
              key={i}
              value={e}
              position={i}
              isFinish={isFinish}
              finishIndex={finishIndex}
              socket={socket}
              isTurn={isMyTurn}
              matchId={matchId}
            />
          );
        })}
      </GameBlock>
    </>
  );
};

export default Game;
