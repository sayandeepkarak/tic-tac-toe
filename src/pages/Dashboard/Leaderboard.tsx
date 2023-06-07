import { animated, useTransition } from "react-spring";
import {
  LeadAvatar,
  BoardWrap,
  LeadText,
  LeaderHead,
} from "./Dashboard.styled";
import { Image } from "../../style/g_style";
import thunderIcon from "../../assets/thunder..png";

type props = {
  isOpen: Array<boolean>;
};

type leadData = {
  id: number;
  name: string;
  points: number;
};

const data: Array<leadData> = [
  {
    id: 1,
    name: "Sayandeep Karak",
    points: 30,
  },
  {
    id: 2,
    name: "Sayandeep Karak",
    points: 30,
  },
  {
    id: 3,
    name: "Sayandeep Karak",
    points: 30,
  },
  {
    id: 4,
    name: "Sayandeep Karak",
    points: 30,
  },
  {
    id: 5,
    name: "Sayandeep Karak",
    points: 30,
  },
  {
    id: 6,
    name: "Sayandeep Karak",
    points: 30,
  },
];

const Leaderboard = ({ isOpen }: props) => {
  const rowTransition = useTransition(data, {
    from: { y: 20, opacity: 0 },
    enter: (item) => async (next) => {
      await next({
        y: 0,
        opacity: 1,
        delay: 150 + data.findIndex((e) => e.id === item.id) * 100,
      });
    },
    leave: { y: 20, opacity: 0 },
  });

  const leadTransition = useTransition(isOpen, {
    from: {
      transform: "translateX(30vh)",
      opacity: 0,
    },
    enter: { transform: "translateX(0vh)", opacity: 1 },
    leave: { transform: "translateX(30vh)", opacity: 0 },
    config: { duration: 150 },
  });

  return (
    <>
      {leadTransition((style) => (
        <BoardWrap as={animated.div} style={style}>
          <LeaderHead>Leaderboard</LeaderHead>
          <table>
            <tbody>
              {rowTransition((style, item) => (
                <animated.tr style={style}>
                  <td>
                    <LeadText>{item.id}</LeadText>
                  </td>
                  <td>
                    <LeadAvatar src="https://lh3.googleusercontent.com/a-/ACNPEu-0g44J4xjgYSZKKJDw9Hcs8xTN9uLXCp9VUgSQ=s96-c" />
                  </td>
                  <td>
                    <LeadText>{item.name}</LeadText>
                  </td>
                  <td>
                    <Image height="20px" src={thunderIcon} />
                  </td>
                  <td>
                    <LeadText>{item.points}</LeadText>
                  </td>
                </animated.tr>
              ))}
            </tbody>
          </table>
        </BoardWrap>
      ))}
    </>
  );
};

export default Leaderboard;
