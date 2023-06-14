import { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import { BoardWrap, LeadTable, LeaderHead } from "./Dashboard.styled";
import { leadData } from "../../types/dashboardType";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import Leaders from "./Leaders";

type props = {
  isOpen: Array<boolean>;
};

const Leaderboard = ({ isOpen }: props) => {
  const [players, setPlayers] = useState<leadData[]>([]);

  const leadTransition = useTransition(isOpen, {
    from: {
      transform: "translateX(30vh)",
      opacity: 0,
    },
    enter: { transform: "translateX(0vh)", opacity: 1 },
    leave: { transform: "translateX(30vh)", opacity: 0 },
    config: { duration: 150 },
  });

  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const res = await fetch(VITE_REACT_BACKEND_URL + "/api/users");
        if (res.ok) {
          const data = await res.json();
          setPlayers(data?.data);
          setTimeout(() => {
            console.log(players);
          }, 1000);
        }
      } catch (error) {}
    };
    getAllPlayers();
  }, []);

  return (
    <>
      {leadTransition((style) => (
        <BoardWrap as={animated.div} style={style}>
          <LeaderHead>Leaderboard</LeaderHead>
          <LeadTable>
            {/* <tbody>
              {players.length > 0 &&
                players.map((e, i) => (
                  <>
                    <Leaders key={i} index={i + 1} data={e} />
                  </>
                ))}
            </tbody> */}
          </LeadTable>
        </BoardWrap>
      ))}
    </>
  );
};

export default Leaderboard;
