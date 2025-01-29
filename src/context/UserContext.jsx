// require("dotenv").config();
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import VerifiedBadge from "../components/verifiedBadge/verifiedBadge";
import { FaExclamation } from "react-icons/fa";

export const UserContext = createContext();

function UserProvider({ children }) {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [userProfile, setUserProfile] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loggedIn, setLoggedIn] = useState(() => !!cookies.grinderUser);
  const [userProfile, setUserProfile] = useState(cookies.grinderUser?.profile || null);

  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  // const apiUrl = "https://nino-technologies.herokuapp.com/api";
  const apiUrl = "http://localhost:5000/api";
  // const apiUrl = "https://api.grinders.ng/api";
  const [pageLoading, setPageLoading] = useState(true);

  // useEffect(() => {
  //   if (cookies.grinderUser === undefined) {
  //     setLoggedIn(false);
  //     return;
  //   }
  //   setLoggedIn(true);
  //   // setUserProfile(cookies.grinderUser.profile || null);
  // }, [cookies.grinderUser]);
  // useEffect(() => {
  //   if (userProfile === null) {
  //     setLoggedIn(false);
  //     return;
  //   }
  // }, [userProfile]);
  useEffect(() => {
    if (!cookies.grinderUser) {
      setLoggedIn(false);
      setUserProfile(null);
    } else {
      setLoggedIn(true);
      setUserProfile(cookies.grinderUser.profile || null);
    }
  }, [cookies.grinderUser]);

  const getUserProfile = useCallback(async () => {
    if (!cookies.grinderUser) return;

    try {
      const options = {
        url: `${apiUrl}/users/profile/${cookies.grinderUser.profile._id}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: cookies.grinderUser.token,
        },
      };

      const response = await axios(options);
      const profile = response.data.data;

      setUserProfile((prev) => {
        // Only update state if profile changes
        return JSON.stringify(prev) !== JSON.stringify(profile) ? profile : prev;
      });
    } catch (error) {
      console.error(error.message);
    }
  }, [apiUrl, cookies.grinderUser]);

  useEffect(() => {
    if (loggedIn) {
      getUserProfile();
    }
  }, [loggedIn, getUserProfile]);

  function checkVerifiedFunction(verify) {
    if (verify) {
      return <VerifiedBadge />;
    }
    return <FaExclamation className="text-danger" />;
  }
  async function getNotification() {
    setPageLoading(true);
    try {
      // const resp = await axios.get(`http://localhost:5000/api/notification`, {
      const resp = await axios.get(`${apiUrl}/notification`, {
        headers: {
          authorization: cookies.grinderUser.token,
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
      // localStorage.removeItem("telecomMerchant");

      // setUserAccountInformation([]);
      setUserProfile([]);
      setLoggedIn(false);
      removeCookie("grinderUser", { path: "/" });
      navigate("./");
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

  const [profileProgress, setProfileProgress] = useState(0);
  const [nonCompleted, setNonCompleted] = useState([]);


  // Profile Completeness Check
  const profileCompletenessCheck = useCallback(() => {
    if (!userProfile) return;

    let progressCount = 0;
    const incompleteFields = [];

    const checkTextProperty = (property) =>
      property && property.trim() !== "" ? true : false;
    const checkNumberProperty = (property) =>
      Number(property) > 0 ? true : false;
    const checkBooleanProperty = (property) => !!property;

    const fields = {
      email: checkTextProperty(userProfile.email),
      fullName: checkTextProperty(userProfile.fullName),
      avatar: checkTextProperty(userProfile.avatar),
      password: checkTextProperty(userProfile.password),
      location: checkTextProperty(userProfile.locationCity),
      phoneNumber: checkNumberProperty(userProfile.phoneNumber),
      account_active: checkBooleanProperty(userProfile.account_active),
      account_verified: checkBooleanProperty(userProfile.account_verified),
      email_verified: checkBooleanProperty(userProfile.email_verified),
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        progressCount += 10;
      } else {
        incompleteFields.push(key);
      }
    }

    setProfileProgress(progressCount);
    setNonCompleted(incompleteFields);
  }, [userProfile]);

  useEffect(() => {
    profileCompletenessCheck();
  }, [userProfile, profileCompletenessCheck]);


  return (
    // <UserContext.Provider
    //   value={{
    //     loggedIn,
    //     setLoggedIn,
    //     userProfile,
    //     setUserProfile,
    //     logOutFunction,
    //     apiUrl,
    //     decodeDate,
    //     getNotification,
    //     notification,
    //     checkVerifiedFunction,
    //     pageLoading,
    //     getUserProfile,
    //     profileCompletenessCheck,
    //     profileProgress,
    //     nonCompleted,
    //   }}
    // >
    //   {children}
    // </UserContext.Provider>
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userProfile,
        setUserProfile,
        logOutFunction,
        apiUrl,
        decodeDate: (date) =>
          moment(date).format("ddd, MMM Do YYYY h:mm:ss a"),
        getNotification,
        notification,
        checkVerifiedFunction: (verify) =>
          verify ? <VerifiedBadge /> : <FaExclamation className="text-danger" />,
        pageLoading,
        getUserProfile,
        profileProgress,
        nonCompleted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;