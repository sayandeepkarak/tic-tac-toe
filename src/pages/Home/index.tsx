import { useTransition } from "react-spring";
import { useState } from "react";
import Header from "../../components/Header";
import { AbsoluteWrapper, MainWrapper } from "./Home.styled";
import { Button } from "../../style/g_style";
import LoginIcon from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import AnimatedBanner from "../../components/AnimatedBanner";

type btnDetails = {
  name: string;
  delay: number;
  jump: () => void;
};

const Home = () => {
  const [showAuth, setShowAuth] = useState<Array<btnDetails>>([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/user");
  };

  const authTransition = useTransition(showAuth, {
    from: { y: "90vh", scale: 0.1 },
    enter: (item: btnDetails) => async (next) => {
      await next({ y: "0vh", delay: item.delay });
      await next({ scale: 1, delay: item.delay });
    },
    leave: { y: "90vh", scale: 0.1 },
  });

  const handleOpenAuth = () => {
    const len: number = showAuth.length;
    if (len > 0) {
      setShowAuth([]);
      return;
    }
    setShowAuth([
      { name: "Google", delay: len > 0 ? 100 : 50, jump: handleNavigate },
      { name: "Guest", delay: len > 0 ? 50 : 100, jump: handleNavigate },
    ]);
  };

  return (
    <>
      <Header
        isVerified={false}
        btnIcon={LoginIcon}
        isOpen={Boolean(showAuth.length)}
        setOpen={handleOpenAuth}
      />
      <MainWrapper>
        <AnimatedBanner isFallBack={false} fallback="" />
        <Button onClick={handleOpenAuth}>Start</Button>
      </MainWrapper>
      <AbsoluteWrapper>
        {authTransition((style, item) => (
          <Button style={style} onClick={item.jump}>
            {item.name}
          </Button>
        ))}
      </AbsoluteWrapper>
    </>
  );
};

export default Home;
