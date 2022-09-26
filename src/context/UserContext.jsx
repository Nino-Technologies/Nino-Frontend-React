// require("dotenv").config();
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import VerifiedBadge from "../components/verifiedBadge/verifiedBadge";
import { FaExclamation } from "react-icons/fa";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userProfile, setUserProfile] = useState([]);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const apiUrl = "https://nino-technologies.herokuapp.com/api";
  // const apiUrl = "http://localhost:5000/api";
  const [pageLoading, setPageLoading] = useState(true);

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

  function checkVerifiedFunction(verify) {
    if (verify) {
      return <VerifiedBadge />;
    }
    return <FaExclamation className="text-danger" />;
  }
  async function getNotification() {
    setPageLoading(true);
    const { token } = cookies.grinderUser;
    try {
      // const resp = await axios.get(`http://localhost:5000/api/notification`, {
      const resp = await axios.get(`${apiUrl}/notification`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      // console.log(resp.data);
      setNotification(resp.data.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

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

  // decodeDate();
  function decodeDate(date) {
    // moment()
    const dateArray = moment(date)
      .format("ddd, MMM Do YYYY T h:mm:ss a")
      .split("T");
    // console.log(dateArray);
    const timeOnly = dateArray[1].split("+");
    // console.log(dateArray);
    return [dateArray[0], timeOnly[0]];
  }

  async function adminActionFunction(action, role, id) {
    if (!action || action === "") {
      return toast.info("Require action");
    }
    if (role === "") {
      return toast.info("Require role");
    }
    if (!id || id === "") {
      return toast.info("Require id");
    }
    // console.log(adminToken);
    console.log(action, role, id);

    const data = {
      id: id,
    };
    // axios POST request
    const options = {
      // url: `http://localhost:5000/api/adminAction/${action}/${role}`,
      url: `${apiUrl}/adminAction/${action}/${role}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
      data: data,
    };

    axios(options)
      .then((response) => {
        getUsers();
        toast.success(`User is now ${action}`);
      })
      .catch((error) => {
        // setLoading(false);
        // console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
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
        decodeDate,
        getNotification,
        notification,
        checkVerifiedFunction,
        pageLoading,
        adminActionFunction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
