import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const TermiiSMSContext = createContext();

export function TermiiSMSProvider({ children }) {
  const [smsBalance, setSmsBalance] = useState({
    loading: true,
    balance: 0,
    currency: "NGN",
  });

  const { userProfile } = useContext(UserContext);
  useEffect(() => {
    getBalance();
  }, []);
  const termiiAPIKey = `TL9ymGZVt8cnzkarqUfXforVgMCmJDpoz3QxdNbgmNRalPeZbY9qdLXJEbS5e0`;
  function getBalance() {
    setSmsBalance({
      loading: true,
      balance: 0,
      currency: "NGN",
    });
    const options = {
      url: `https://api.ng.termii.com/api/get-balance?api_key=${termiiAPIKey}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    axios(options)
      .then((response) => {
        if (response.status === 200) {
          const { balance, currency } = response.data;
          setSmsBalance({
            loading: false,
            balance,
            currency,
          });
        }
      })
      .catch((error) => {
        setSmsBalance({
          loading: true,
          balance: "0.0000",
          currency: "ERROR",
        });
        console.log(error + ".");
      });
  }

  return (
    <TermiiSMSContext.Provider
      value={{
        getBalance,
        smsBalance,
      }}
    >
      {children}
    </TermiiSMSContext.Provider>
  );
}
