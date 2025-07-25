// require("dotenv").config();
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import VerifiedBadge from "../components/verifiedBadge/verifiedBadge.jsx";
import { FaExclamation } from "react-icons/fa";
import { useContext } from "react";
import { toast } from "react-toastify";
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
  // const apiUrl = "http://localhost:5000/api";
  // const apiUrl = "https://api.grinders.ng/api";
  const apiUrl = "https://nino-backend.vercel.app/api";
  const [pageLoading, setPageLoading] = useState(true);

  // useEffect(() => {
  //   if (cookies.grinderUser === undefined) {
  //     setLoggedIn(false);
  //     return;
  //   }
  //   setLoggedIn(true);
  //   // setUserProfile(cookies.grinderUser.profile || null);
  // }, [cookies.grinderUser]);
  useEffect(() => {
    console.log('userProfile', userProfile);

  }, [userProfile]);
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
      const profile = response?.data?.data;

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
    const formattedDate = moment(date).format("MMM DD YYYY T h:mm:ss a");
    // console.log(formattedDate)
    const [datePart, timePart] = formattedDate.split(" T ");
    return [datePart, timePart];
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

  // 
  async function CreateJob(jobData) {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", cookies.grinderUser.token); // Replace with actual token logic
      myHeaders.append("Content-Type", "application/json");
      console.log('this is the token', cookies.grinderUser.token)
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(jobData),
        redirect: "follow",
      };

      const response = await fetch(`${apiUrl}/job`, requestOptions);

      if (!response.ok) {
        throw new Error(`Failed to submit job: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Job submitted successfully:", result);
      return result;
    } catch (error) {
      console.error("Error submitting job:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  }


  // functions for jobs
  const [bids, setBids] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobType, setJobType] = useState('ongoing');

  // const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", cookies.grinderUser.token);

      const response = await fetch("https://nino-backend.vercel.app/api/job/mine", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.jobs);

      const ongoingJobs = data.jobs.filter(job =>
        (job.application || (job.applied && job.applied.length > 0)) &&
        job.status === "inprogress"
      );
      const completedJobs = data.jobs.filter(job =>
        job.status === "completed"
      );

      setBids(ongoingJobs);
      setCompletedJobs(completedJobs);

      if (ongoingJobs.length === 0 && jobType === 'ongoing') {
        toast.info("No ongoing jobs found.");
      }
    } catch (err) {
      // setError(err.message);
      toast.error("Failed to fetch jobs: " + err.message);
    } finally {
      setJobLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  // function for bids
  const [artisanBids, setArtisanBids] = useState([]);

  const calculateDays = (timelineStr) => {
    if (!timelineStr) return '0';
    const [startStr, endStr] = timelineStr.split('-').map(s => s.trim());
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day);
    };

    try {
      const startDate = parseDate(startStr);
      const endDate = parseDate(endStr);
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)).toString();
    } catch (error) {
      return '0';
    }
  };

  async function getArtisanBids() {
    // const fetchBids = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from storage
      const response = await fetch('https://nino-backend.vercel.app/api/job/applied', {
        method: 'GET',
        headers: {
          'Authorization': cookies.grinderUser.token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch bids');

      const data = await response.json();
      console.log('this are all the bids', data.jobs)
      // Transform backend data to match frontend structure
      const transformedBids = data.jobs.flatMap(job =>
        job.applied.map(applied => ({
          id: applied._id,
          jobId: job._id,
          jobTitle: job.title,
          amount: `${applied.amount?.toLocaleString() || '0'}`,
          timeline: calculateDays(applied.timeLine),
          createdAt: decodeDate(applied.createdAt),
          updatedAt: decodeDate(applied.updatedAt),
          description: applied.description,
          materials: job.materialInformation?.split(', ') || [],
          status: applied.status,
          rawData: applied // Keep raw data for potential updates
        }))
      );

      setArtisanBids(transformedBids);
    } catch (error) {
      // setError(error.message);
      // setLoading(false);
      console.log(error)
    }
    // };
  }


  const handleUpdateBid = async (updatedBid) => {
    try {
      // Update backend
      const token = localStorage.getItem('token');
      const response = await fetch(`https://nino-backend.vercel.app/api/job/applied/${updatedBid.rawData._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: updatedBid.description,
          amount: parseInt(updatedBid.rawData.amount),
          timeLine: updatedBid.rawData.timeLine,
          // Include other necessary fields
        })
      });

      if (!response.ok) throw new Error('Update failed');

      // Update local state
      setArtisanBids(artisanBids.map(bid => bid.id === updatedBid.id ? updatedBid : bid));
    } catch (error) {
      console.error('Update error:', error);
    }
  };
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
        checkVerifiedFunction: (verify) =>
          verify ? <VerifiedBadge /> : <FaExclamation className="text-danger" />,
        pageLoading,
        getUserProfile,
        profileProgress,
        nonCompleted,
        CreateJob,
        // job state
        jobLoading,
        setJobLoading,
        jobs,
        setJobs,
        bids,
        setBids,
        completedJobs,
        setCompletedJobs,
        fetchJobs, jobType, setJobType,
        // profileCompletenessCheck,
        // get artisan bids
        calculateDays,
        artisanBids,
        getArtisanBids, handleUpdateBid
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;