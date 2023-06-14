import { useEffect, useState, useMemo, useCallback } from "react";
import { Socket, io } from "socket.io-client";
import Game from "./Game";
import { GameWrapper } from "./Match.styled";
import Round from "./Round";
import Vs from "./Vs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import { SpinLoader } from "../../components/Loader/Loader.styled";
import setTokens from "../../modules/token";
import Cookies from "js-cookie";
import { matchInfo, roomData } from "../../types/matchType";
import { RootState } from "../../types/storeType";
import { useSelector } from "react-redux";

let socket: Socket;

const Match = () => {
  const navigate = useNavigate();
  const { id } = useSelector((state: RootState) => state.userDetails);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [roomInfo, setRoomInfo] = useState<roomData>();
  const [matchInfo, setMatchInfo] = useState<matchInfo>();
  const [params] = useSearchParams();
  const matchId = useMemo(() => params.get("id") || "", [params]);
  const fs = useMemo(() => params.get("fs"), [params]);
  const ss = useMemo(() => params.get("ss"), [params]);

  const setMatchInfoExternal = useCallback((data: matchInfo) => {
    setMatchInfo(data);
  }, []);

  useEffect(() => {
    const joinRoom = async () => {
      if (!matchId || !fs || !ss) {
        navigate("/");
        return;
      }

      await setTokens(navigate);
      const token = Cookies.get("accesstoken");

      socket = io(VITE_REACT_BACKEND_URL, {
        query: { matchId, accesstoken: token },
      });

      socket.on("joinSuccess", (data: roomData) => {
        setRoomInfo(data);
      });

      socket.on("takeMatchInfo", (data: matchInfo) => {
        setMatchInfo(data);
        setTimeout(() => {
          setIsLoad(false);
        }, 200);
      });

      socket.on("invalidRoom", () => {
        navigate("/");
      });
    };

    joinRoom();

    return () => {
      socket?.disconnect();
      socket?.off("room");
      socket?.off("invalidRoom");
      socket?.off("takeMatchInfo");
      socket?.off("joinSuccess");
    };
  }, []);

  if (isLoad) {
    return <SpinLoader />;
  }

  return (
    <>
      <GameWrapper>
        <Vs users={roomInfo?.users} />
        <Round round={matchInfo?.round} points={matchInfo?.points} />
        {matchInfo && (
          <Game
            simulations={matchInfo?.simulations}
            socket={socket}
            matchId={matchId}
            isMyTurn={roomInfo?.users.userId[matchInfo?.turn] === id}
            setMatchData={setMatchInfoExternal}
          />
        )}
      </GameWrapper>
    </>
  );
};

export default Match;
