import { NavigateFunction } from "react-router-dom";
import { VITE_REACT_BACKEND_URL } from "../../config/env";
import Cookies from "js-cookie";

const setTokens = async (navigate: NavigateFunction) => {
  if (!Cookies.get("refreshtoken")) {
    return navigate("/");
  }
  try {
    const res = await fetch(VITE_REACT_BACKEND_URL + "/api/token", {
      credentials: "include",
    });
    if (res.status === 401) {
      Cookies.remove("refreshtoken");
      Cookies.remove("accesstoken");
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export default setTokens;
