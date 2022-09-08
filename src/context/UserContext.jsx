import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(cookies.grinderUser);
    if (cookies.grinderUser === undefined) {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
    setUserProfile(cookies.grinderUser.profile || null);
  }, []);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
