import { useCallback, useState, useEffect } from "react";
import Header from "../../components/Header";
import leadIcon from "../../assets/lead.png";
import { DashboardWrap, MiddleContentWrapper } from "./Dashboard.styled";
import AnimatedBanner from "../../components/AnimatedBanner";
import UserInfo from "./Status";
import Leaderboard from "./Leaderboard";
import FindLoad from "../../components/FindLoad";
import { Socket, io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import setTokens from "../../modules/token";
import { userData } from "../../types/dashboardType";
import { SpinLoader } from "../../components/Loader/Loader.styled";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../store/userDataSlice";
import { RootState } from "../../types/storeType";

let socket: Socket;

const Dashboard = () => {
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [showLeaders, setShowLeaders] = useState<Array<boolean>>([]);
  const [isMatchMaking, setIsMatchMaking] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowLeaders = useCallback(() => {
    setShowLeaders((old) => (old.length ? [] : [true]));
  }, []);

  const toggleMatchMaking = () => {
    if (!isMatchMaking) {
      setIsMatchMaking(true);
      socket.emit("requestMatch");
      socket.on("successMatchMaking", (matchId: number, users: string[]) => {
        navigate(`/match?id=${matchId}&fs=${users[0]}&ss=${users[1]}`);
      });
    } else {
      socket.off("successMatchMaking");
      socket.emit("cancelMatchMaking");
      setIsMatchMaking(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (!Cookies.get("accesstoken")) {
        await setTokens(navigate);
      }
      const token = Cookies.get("accesstoken");
      socket = io(VITE_REACT_BACKEND_URL, {
        query: { accesstoken: token },
      });

      socket.on("connectionSuccess", (data: userData) => {
        dispatch(setUserData(data));
        setTimeout(() => {
          setIsLoad(false);
        }, 200);
      });

      socket.on("invalidUser", () => {
        socket?.disconnect();
        Cookies.remove("accesstoken");
        Cookies.remove("refreshtoken");
        navigate("/");
      });

      socket.on("newConnection", (players: number) => {
        setActivePlayer(players);
      });

      socket.on("userLeft", () => {
        socket.emit("getPlayers");
      });
    };

    getUserData();

    return () => {
      socket?.off("connectionSuccess");
      socket?.off("invalidUser");
      socket?.off("newConnection");
      socket?.off("userLeft");
      socket?.disconnect();
    };
  }, []);

  if (isLoad) {
    return <SpinLoader />;
  }

  return (
    <>
      <Header
        btnIcon={leadIcon}
        isOpen={false}
        setOpen={handleShowLeaders}
        isVerified
        name={userDetails?.name}
        image={userDetails?.photoURL}
      />
      <DashboardWrap>
        <UserInfo points={userDetails?.points} players={activePlayer} />
        <MiddleContentWrapper>
          <AnimatedBanner
            isFallBack={isMatchMaking}
            fallback={<FindLoad />}
            click={toggleMatchMaking}
            btnText={isMatchMaking ? "Cancel" : "Start"}
          />
        </MiddleContentWrapper>
        {showLeaders[0] && <Leaderboard isOpen={showLeaders} />}
      </DashboardWrap>
    </>
  );
};

export default Dashboard;
