import { useEffect, useState, useMemo, useCallback } from "react";
import { Socket, io } from "socket.io-client";
import Game from "./Game";
import { GameWrapper, TurnIndicator } from "./Match.styled";
import Round from "./Round";
import Vs from "./Vs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import { SpinLoader } from "../../components/Loader/Loader.styled";
import setTokens from "../../modules/token";
import Cookies from "js-cookie";
import { matchInfo, resultType, roomData } from "../../types/matchType";
import { RootState } from "../../types/storeType";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/userDataSlice";
import { userData } from "../../types/dashboardType";
import Result from "./Result";
import { gsap } from "gsap";
import DisconnectCounter from "./DisconnectCounter";

let socket: Socket;

const Match = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpponentLeft, setIsOpponentLeft] = useState<boolean>(false);
  const { id } = useSelector((state: RootState) => state.userDetails);
  const [matchResult, setMatchResult] = useState<resultType>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [roomInfo, setRoomInfo] = useState<roomData>();
  const [matchInfo, setMatchInfo] = useState<matchInfo>();
  const [params] = useSearchParams();
  const matchId = useMemo(() => params.get("id") || "", [params]);
  const fs = useMemo(() => params.get("fs"), [params]);
  const ss = useMemo(() => params.get("ss"), [params]);
  const myIndex = useMemo(
    () => roomInfo?.users.userId.indexOf(id, 0),
    [roomInfo]
  );
  const myTurn = useMemo(
    () => matchInfo?.turn === roomInfo?.users.userId.indexOf(id, 0),
    [roomInfo, matchInfo]
  );

  const setMatchInfoExternal = useCallback((data: matchInfo) => {
    setMatchInfo(data);
  }, []);

  const joinRoom = useCallback(async () => {
    if (!matchId || !fs || !ss) {
      navigate("/");
      return;
    }

    await setTokens(navigate);
    const token = Cookies.get("accesstoken");

    socket = io(VITE_REACT_BACKEND_URL, {
      query: { matchId, accesstoken: token },
    });

    socket?.on("connectionSuccess", (data: userData) => {
      dispatch(setUserData(data));
    });

    socket?.on("forceFinish", (winnerId: string) => {
      handleForceFinish(winnerId);
    });

    socket?.on("takeRoomMembers", (members: number) => {
      members === 1 && setIsOpponentLeft(true);
    });

    socket?.on("joinSuccess", (data: roomData) => {
      setRoomInfo(data);
      socket?.emit("getRoomMembers");
    });

    socket?.on("takeMatchInfo", (data: matchInfo) => {
      setMatchInfo(() => ({ ...data }));
      setTimeout(() => {
        setIsLoad(false);
      }, 1000);
    });

    socket?.on("opponentReconnect", () => {
      setIsOpponentLeft(false);
    });

    socket?.on("opponentLeft", () => {
      setIsOpponentLeft(true);
    });

    socket?.on("invalidRoom", () => {
      navigate("/");
    });
  }, []);

  const handleForceFinish = useCallback(
    (winnerId: string) => {
      setIsOpponentLeft(false);
      setMatchResult(winnerId === id ? true : false);
    },
    [id]
  );

  useEffect(() => {
    joinRoom();
    return () => {
      socket?.disconnect();
      socket?.off("connectionSuccess");
      socket?.off("invalidRoom");
      socket?.off("takeMatchInfo");
      socket?.off("joinSuccess");
      socket?.off("opponentLeft");
      socket?.off("takeRoomMembers");
      socket?.off("forceFinish");
      socket?.off("opponentReconnect");
    };
  }, []);

  useEffect(() => {
    gsap.to(myTurn ? "#myTurnIndicator" : "#opponentTurnIndicator", {
      bottom: 26,
      opacity: 1,
    });
    const timeline = gsap.timeline();
    timeline.to(!myTurn ? "#myTurnIndicator" : "#opponentTurnIndicator", {
      bottom: 52,
      opacity: 0,
    });
    timeline.to(!myTurn ? "#myTurnIndicator" : "#opponentTurnIndicator", {
      bottom: 0,
    });
  }, [myTurn]);

  const handleSetResult = (result: resultType) => {
    setMatchResult(result);
  };

  if (isLoad) {
    return <SpinLoader />;
  }

  return (
    <>
      <GameWrapper>
        <Vs
          users={roomInfo?.users}
          opponentIndex={Number(!myIndex)}
          isLeft={isOpponentLeft}
        />
        {isOpponentLeft ? (
          <DisconnectCounter />
        ) : (
          <Round round={matchInfo?.round} points={matchInfo?.points} />
        )}
        {matchResult === null ? (
          matchInfo && (
            <Game
              simulations={matchInfo?.simulations}
              socket={socket}
              matchId={matchId}
              isMyTurn={myTurn}
              setMatchData={setMatchInfoExternal}
              setResult={handleSetResult}
              myIndex={myIndex}
              opponentLeft={isOpponentLeft}
            />
          )
        ) : (
          <Result isWin={matchResult} />
        )}
        <TurnIndicator id="myTurnIndicator">Your Turn</TurnIndicator>
        <TurnIndicator id="opponentTurnIndicator">
          Opponent's Turn
        </TurnIndicator>
      </GameWrapper>
    </>
  );
};

export default Match;
