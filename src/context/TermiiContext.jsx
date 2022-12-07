import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { toast } from "react-toastify";

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

  // How to send message
  //  sendMessageFunction({
  //    to: `Number`,
  //    message: `Message`,
  //  });

  function sendMessageFunction(object) {
    if (object.to.length === 0)
      return toast.error("Receivers Number is required");
    if (object.message === "") return toast.error("Message is required");
    const options = {
      method: "POST",
      url: "https://api.ng.termii.com/api/sms/send",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer sendchamp_live_$2y$10$.lpAz0y5oNTtuwrvbWqOdevgYa7DRO.2Zn1zM40TsVbU4wkFL09ae`,
      },
      data: {
        to: object.to,
        message: object.message,
        sender_name: "Grinders",
        route: "international",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        toast.success("Notification sent successfully");
        console.log(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.message);

        console.error(error);
      });
  }
  return (
    <TermiiSMSContext.Provider
      value={{
        sendMessageFunction,
        getBalance,
        smsBalance,
      }}
    >
      {children}
    </TermiiSMSContext.Provider>
  );
}
