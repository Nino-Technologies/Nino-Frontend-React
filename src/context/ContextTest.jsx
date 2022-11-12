import React, { createContext, useContext, useEffect, useState } from "react";
import HomePage from "../pages/Home/HomePage";

export const TestContext = createContext();

export function TestProvider({ children }) {
  const [testName, SetTestName] = useState("Victor");

  return (
    <TestContext.Provider
      value={{
        testName,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}
