import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLogIn, setIsLogIn] = useState(false);

  // useEffect(() => {
  //   const currentTheme = localStorage.getItem("telecomMerchantTheme");
  //   if (!currentTheme || currentTheme === "") {
  //     return;
  //   }
  //   setTheme(currentTheme);
  // }, [theme]);
  return (
    <UserContext.Provider value={{ isLogIn, setIsLogIn }}>
      {children}
    </UserContext.Provider>
  );
}
