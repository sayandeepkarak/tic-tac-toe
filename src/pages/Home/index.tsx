import { useTransition } from "react-spring";
import { useState, useCallback, useEffect } from "react";
import Header from "../../components/Header";
import { AbsoluteWrapper, MainWrapper } from "./Home.styled";
import { Button } from "../../style/g_style";
import LoginIcon from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import AnimatedBanner from "../../components/AnimatedBanner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../config/firebase.config";
import { VITE_REACT_BACKEND_URL } from "../../../config/env";
import Cookie from "js-cookie";

type btnDetails = {
  name: string;
  delay: number;
};

type userDetails = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  emailVerified: boolean;
};

const Home = () => {
  const [showAuth, setShowAuth] = useState<Array<btnDetails>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie: string | undefined = Cookie.get("refreshtoken");

    if (cookie) {
      navigate("/user");
    }
  }, []);

  const handleNavigate = useCallback(async (btnType: string) => {
    if (btnType === "Google") {
      const google = new GoogleAuthProvider();
      try {
        const res = await signInWithPopup(auth, google);

        const newData: userDetails = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          isAnonymous: res.user.isAnonymous,
          emailVerified: res.user.emailVerified,
        };

        if (newData.emailVerified && !newData.isAnonymous) {
          const res = await fetch(VITE_REACT_BACKEND_URL + "/api/user", {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newData),
          });
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            navigate("/user");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Guest feature isn't implemented");
    }
  }, []);

  const authTransition = useTransition(showAuth, {
    from: { y: "90vh", scale: 0.1 },
    enter: (item: btnDetails) => async (next) => {
      await next({ y: "0vh", delay: item.delay });
      await next({ scale: 1, delay: item.delay });
    },
    leave: { y: "90vh", scale: 0.1 },
  });

  const handleOpenAuth = useCallback(() => {
    const len: number = showAuth.length;
    if (len > 0) {
      setShowAuth([]);
      return;
    }
    setShowAuth([
      { name: "Google", delay: len > 0 ? 100 : 50 },
      { name: "Guest", delay: len > 0 ? 50 : 100 },
    ]);
  }, [showAuth]);

  return (
    <>
      <Header
        isVerified={false}
        btnIcon={LoginIcon}
        isOpen={Boolean(showAuth.length)}
        setOpen={handleOpenAuth}
      />
      <MainWrapper>
        <AnimatedBanner
          isFallBack={false}
          fallback=""
          click={handleOpenAuth}
          btnText="Start"
        />
      </MainWrapper>
      <AbsoluteWrapper>
        {authTransition((style, item) => (
          <Button
            style={style}
            onClick={() => {
              handleNavigate(item.name);
            }}
          >
            {item.name}
          </Button>
        ))}
      </AbsoluteWrapper>
    </>
  );
};

export default Home;
