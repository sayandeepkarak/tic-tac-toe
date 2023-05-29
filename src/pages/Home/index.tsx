import styled from "styled-components";
import BannerImage from "../../assets/ttt-banner.png";
import { useSpring, animated } from "react-spring";

const Home = () => {
  const banner = useSpring({
    from: { transform: "translateY(-10px)" },
    transform: "translateY(10px)",
    loop: { reverse: true },
    config: { duration: 3000 },
  });
  return (
    <>
      <MainWrapper>
        <AnimatedBanner src={BannerImage} style={banner} loading="lazy" />
        <Button>Start</Button>
      </MainWrapper>
    </>
  );
};

export default Home;

const MainWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 160px);
  gap: 40px;
`;

const Banner = styled.img.attrs({ alt: "X" })`
  height: 450px;
`;

const AnimatedBanner = animated(Banner);

const Button = styled.button`
  font-family: "Reggae One", cursive;
  box-shadow: inset 4px 4px 0px var(--dark-bg),
    inset -4px -4px 0px var(--dark-bg);
  padding: 11px 68px;
  background-color: var(--yellow);
  border: 4px solid #ffffff;
  outline: none;
  cursor: pointer;
  color: var(--dark-bg);
  font-size: 1.8rem;
`;
