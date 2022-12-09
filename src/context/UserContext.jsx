// require("dotenv").config();
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import VerifiedBadge from "../components/verifiedBadge/verifiedBadge";
import { FaExclamation } from "react-icons/fa";
import { toast } from "react-toastify";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userProfile, setUserProfile] = useState([]);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const apiUrl = "https://nino-technologies.herokuapp.com/api";
  // const apiUrl = "http://localhost:5000/api";
  // const apiUrl = "https://api.grinders.ng/api";
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (cookies.grinderUser === undefined) {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
    // setUserProfile(cookies.grinderUser.profile || null);
  }, []);
  useEffect(() => {
    if (userProfile === null) {
      setLoggedIn(false);
      return;
    }
  });
  function getUserProfile() {
    // axios GET request
    const options = {
      // url: `http://localhost:5000/api/auth/user/login`,
      url: `${apiUrl}/users/profile/${cookies.grinderUser.profile._id}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
    };

    axios(options)
      .then((response) => {
        const userProfile = response.data.data;
        setUserProfile(userProfile);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  useEffect(() => {
    if (loggedIn) {
      getUserProfile();
    }
  }, []);

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
      localStorage.removeItem("telecomMerchant");

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

  function checkTextProperty(property) {
    if (property && property.trim() !== "") {
      return true;
    } else {
      return false;
    }
  }
  function checkNumberProperty(property) {
    if (Number(property) > 0) {
      return true;
    } else {
      return false;
    }
  }
  function checkBooleanProperty(property) {
    if (property) {
      return true;
    } else {
      return false;
    }
  }

  function profileCompletenessCheck() {
    setProfileProgress(0);
    let progressCount = 0;
    let nonCompleted = [];
    if (userProfile.role === 1) {
      const {
        avatar,
        email,
        fullName,
        phoneNumber,
        password,
        officeLocation,
        refereeNumber,
        locationState,
        locationCity,
        service,
        gender,
        introduction,
        Nin,
        YearsOfExperience,
        refereeName,
        email_verified,
        account_verified,
        account_active,
        freeAccount,
        subscriptionExpired,
      } = userProfile;

      if (!email && !password) return;

      // console.log(userProfile);

      if (checkTextProperty(email)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Email");
      }

      if (checkTextProperty(Nin)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Nin");
      }

      if (checkTextProperty(fullName)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Full name");
      }

      if (checkTextProperty(avatar)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Profile picture");
      }

      if (checkTextProperty(password)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Password");
      }

      if (checkTextProperty(service)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Service");
      }

      if (checkTextProperty(officeLocation)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Office location");
      }

      if (checkTextProperty(locationCity)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Location city");
      }

      if (checkTextProperty(locationState)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Location state");
      }

      if (checkTextProperty(gender)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Gender");
      }

      if (checkTextProperty(introduction)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Introduction");
      }

      if (checkTextProperty(refereeName)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Referee name");
      }

      if (checkNumberProperty(YearsOfExperience)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Years of experience");
      }

      if (checkNumberProperty(phoneNumber)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Phone number");
      }

      if (checkNumberProperty(refereeNumber)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Referee number");
      }

      if (checkBooleanProperty(subscriptionExpired)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Subscription expired");
      }

      if (checkBooleanProperty(freeAccount)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Account Subscription");
      }

      if (checkBooleanProperty(account_active)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Account inactive ");
      }

      if (checkBooleanProperty(account_verified)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Account verification");
      }

      if (checkBooleanProperty(email_verified)) {
        progressCount += 5;
      } else {
        nonCompleted.push("Email verification");
      }
    }

    if (userProfile.role === 3) {
      const {
        fullName,
        avatar,
        location,
        email,
        email_verified,
        account_verified,
        account_active,
        password,
        number,
        role,
      } = userProfile;

      if (checkTextProperty(email)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Email");
      }

      if (checkTextProperty(fullName)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Full name");
      }

      if (checkTextProperty(avatar)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Profile picture");
      }

      if (checkTextProperty(password)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Password");
      }

      if (checkTextProperty(location)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Location");
      }

      if (checkNumberProperty(number)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Number");
      }

      if (checkNumberProperty(role)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Role");
      }

      if (checkBooleanProperty(account_active)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Account inactive");
      }

      if (checkBooleanProperty(account_verified)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Account verification");
      }

      if (checkBooleanProperty(email_verified)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Email verification");
      }
    }

    if (userProfile.role === 0) {
      const {
        fullName,
        avatar,
        locationCity,
        locationState,
        email,
        email_verified,
        account_verified,
        account_active,
        password,
        phoneNumber,
      } = userProfile;

      if (checkTextProperty(email)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Email");
      }

      if (checkTextProperty(fullName)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Full name");
      }

      if (checkTextProperty(avatar)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Profile picture");
      }

      if (checkTextProperty(password)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Password");
      }

      if (checkTextProperty(locationState)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Location state");
      }

      if (checkTextProperty(locationCity)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Location city");
      }

      if (checkNumberProperty(phoneNumber)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Phone number");
      }

      if (checkBooleanProperty(account_active)) {
        progressCount += 10;
      } else {
        nonCompleted.push("account_active");
      }

      if (checkBooleanProperty(account_verified)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Account verification");
      }

      if (checkBooleanProperty(email_verified)) {
        progressCount += 10;
      } else {
        nonCompleted.push("Email verification");
      }
    }

    setNonCompleted(nonCompleted);
    setProfileProgress(progressCount);
  }

  useEffect(() => {
    profileCompletenessCheck();
  }, [userProfile]);

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
        getUserProfile,
        profileCompletenessCheck,
        profileProgress,
        nonCompleted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
