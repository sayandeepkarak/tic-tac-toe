import { useEffect, useState } from "react";
import { BoardWrap, LeadTable, LeaderHead } from "./Dashboard.styled";
import { leadData } from "../../types/dashboardType";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import Leaders from "./Leaders";
import { gsap } from "gsap";

type props = {
  isOpen: Array<boolean>;
};

const Leaderboard = ({}: props) => {
  const [players, setPlayers] = useState<leadData[]>([]);

  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const res = await fetch(VITE_REACT_BACKEND_URL + "/api/users");
        if (res.ok) {
          const data = await res.json();
          setPlayers(data?.data);
          gsap.to("#leaderWrapper", {
            opacity: 1,
          });
        }
      } catch (error) {}
    };
    getAllPlayers();
  }, []);

  return (
    <>
      <BoardWrap id="leaderWrapper">
        <LeaderHead>Leaderboard</LeaderHead>
        <LeadTable>
          <tbody>
            {players.length > 0 &&
              players.map((e, i) => (
                <>
                  <Leaders key={i} index={i + 1} data={e} />
                </>
              ))}
          </tbody>
        </LeadTable>
      </BoardWrap>
    </>
  );
};

export default Leaderboard;
