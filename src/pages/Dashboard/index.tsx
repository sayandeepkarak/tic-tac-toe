import { useCallback } from "react";
import Header from "../../components/Header";
import leadIcon from "../../assets/lead.png";
import { DashboardWrap, MiddleContentWrapper } from "./Dashboard.styled";
import AnimatedBanner from "../../components/AnimatedBanner";
import UserInfo from "./Status";
import Leaderboard from "./Leaderboard";
import { useState } from "react";
import FindLoad from "../../components/FindLoad";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showLeaders, setShowLeaders] = useState<Array<boolean>>([]);
  const [isMatchMaking, setIsMatchMaking] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleShowLeaders = useCallback(() => {
    setShowLeaders((old) => (old.length ? [] : [true]));
  }, []);

  const toggleMatchMaking = () => {
    if (!isMatchMaking) {
      setIsMatchMaking(true);
      setTimeout(() => {
        // navigate("/match");
      }, 5000);
    } else {
      setIsMatchMaking(false);
    }
  };

  return (
    <>
      <Header
        btnIcon={leadIcon}
        isOpen={false}
        setOpen={handleShowLeaders}
        isVerified
      />
      <DashboardWrap>
        <UserInfo />
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
