// require("dotenv").config();
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();
  const apiUrl = "https://nino-technologies.herokuapp.com/api";
  // const apiUrl = "http://localhost:5000/api";

  useEffect(() => {
    if (cookies.grinderUser === undefined) {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
    setUserProfile(cookies.grinderUser.profile || null);
  }, []);
  useEffect(() => {
    if (userProfile === null) {
      setLoggedIn(false);
      return;
    }
  });

  function logOutFunction() {
    if (window.confirm("You will be logged out of your account !!!")) {
      localStorage.removeItem("telecomMerchant");

      // setUserAccountInformation([]);
      setUserProfile([]);
      setLoggedIn(false);
      removeCookie("grinderUser", { path: "/" });
      navigate("/");
    }
  }

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userProfile,
        setUserProfile,
        logOutFunction,
        apiUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
