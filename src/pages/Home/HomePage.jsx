import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FaExclamation, FaInfoCircle, FaRetweet } from "react-icons/fa";
import ModalComponent from "../../components/Modal/ModalComponent";
import { TermiiSMSContext } from "../../context/TermiiContext";
import { ProfileSubscriptionAlertCard } from "../ProfilePage/ProfilePage";
import { ProfileSVerificationAlertCard } from "./../ProfilePage/ProfilePage";

function HomePage() {
  const [profileProgress, setProfileProgress] = useState(0);
  const {
    logOutFunction,
    userProfile,
    notification,
    pageLoading,
    decodeDate,
    getNotification,
    checkVerifiedFunction,
    getUserProfile,
  } = useContext(UserContext);
  const { getBalance, smsBalance } = useContext(TermiiSMSContext);
  console.log();
  function checkProperty(property) {
    if (property !== "" && property) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    // {
    //   Nin: "123456";
    //   account_active: true;
    //   account_verified: false;
    //   avatar: "http://res.cloudinary.com/dhvacnvek/image/upload/v1664505887/vrnyf1d809ouq4cipfyb.png";
    //   email: "victorjosiahm3@gmail.com";
    //   email_verified: false;
    //   fullName: "Josiah Victor";
    //   joinDate: "2022-09-30T02:07:26.342Z";
    //   locationCity: "Bako";
    //   locationState: "Bako";
    //   password: "$2b$12$mUt2FCMHqRCVXm747XOite10EG1CMnMwxTx8W/iZ/hjGjZjtOYdlu";
    //   phoneNumber: 2348137297150;
    //   role: 0;
    // }
    let getProgress = profileProgress;
    if (userProfile || userProfile.role === 0) {
      if (checkProperty(userProfile.account_active)) {
        getProgress += 10;
      }
      if (checkProperty(userProfile.account_verified)) {
        getProgress += 10;
      }
      if (checkProperty(userProfile.email_verified)) {
        getProgress += 10;
      }
      if (checkProperty(userProfile.Nin)) {
        getProgress += 10;
      }
      if (
        checkProperty(userProfile.locationCity) &&
        checkProperty(userProfile.locationState)
      ) {
        getProgress += 10;
      }
      // console.log(getProgress);
    }
    // console.log(userProfile);
    setProfileProgress(getProgress);
  }, []);
  // const [count, setCount] = useState(0);
  // const [distance, setDistance] = useState(0);
  // const [date, setDate] = useState("");

  // useEffect(() => {
  //   //  // Set the date we're counting down to
  //   var countDownDate = new Date(1670510319633).getTime();
  //   // var countDownDate = new Date("Jan 7, 2023 15:37:25").getTime();

  //   //  // Update the count down every 1 second
  //   const interval = setInterval(() => {
  //     setCount(count + 1);
  //     // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     //  var distance =
  //     setDistance(countDownDate - now);
  //     // setDistance(1670510319633);

  //     // console.log(distance);

  //     // Time calculations for days, hours, minutes and seconds
  //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Output the result in an element with id="demo"
  //     //  document.getElementById("demo").innerHTML =
  //     //    minutes + "m " + seconds + "s ";
  //     setDate(`${days}d ${hours}h ${minutes} m ${seconds} s`);
  //     // If the count down is over, write some text
  //     // if (distance < 0) {
  //     //   clearInterval(x);
  //     //   // document.getElementById("demo").innerHTML = "EXPIRED";
  //     // }
  //   }, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, [count, distance]);
  useEffect(() => {
    getUserProfile();
  }, []);
  useEffect(() => {
    getNotification();
  }, []);
  useEffect(() => {
    if (!userProfile.email_verified) {
      if (userProfile.role === 3) {
        setProfileProgress(100);
      } else {
        //  CLike the model button with js
        window.document
          .getElementById("open_profile_completeness_modal")
          .click();
      }
    }
  }, [userProfile]);
  return (
    <div className="HomePage">
      {/* button to open model */}
      <button
        type="button"
        className="button"
        id="open_profile_completeness_modal"
        // hide button; it will be clicked with js
        style={{ display: "none" }}
        data-bs-toggle="modal"
        data-bs-target="#profile_completeness_modal"
      ></button>
      {/* model component;  */}
      <ModalComponent
        modalTitle={"Important Notification"}
        modalId={"profile_completeness_modal"}
      >
        Your profile is not completed <br />
        Update Profile{" "}
        {userProfile.role === 0 ? (
          <>to get our top pro service provider</>
        ) : (
          <>
            to become a verified service providers
            {userProfile.refereeNumber &&
            userProfile.refereeNumber.trim() === "" ? (
              <>
                <br /> <FaExclamation className="text-danger" /> Fill Referee
                Number for Account verification
              </>
            ) : null}{" "}
            {userProfile.refereeName &&
            userProfile.refereeName.trim() === "" ? (
              <>
                {" "}
                <br />
                <FaExclamation className="text-danger" /> Fill Referee Name for
                Account verification
              </>
            ) : null}
          </>
        )}
        <br />{" "}
        <Link
          onClick={() => {
            document.getElementById("closeModalComponent").click();
          }}
          to="/dashboard/profile"
          className="btn btn-primary mt-2 ms-auto"
        >
          Update Profile
        </Link>
      </ModalComponent>
      <div className="header my-4  d-flex justify-content-between">
        <div className="welcome ms-4">
          Welcome {userProfile.fullName || "User"}
        </div>
        <button
          className="btn-danger btn me-4 btn-sm"
          onClick={() => logOutFunction()}
        >
          Log Out
        </button>
      </div>
      <hr className="mb-0" />
      <ProfileSVerificationAlertCard userProfile={userProfile} />
      <ProfileSubscriptionAlertCard userProfile={userProfile} />
      {/* We have {count}s left <br />
      {distance < 0 ? "Expired" : date} <br />
      {date} */}
      <div className="container">
        <div className="d-flex flex-wrap ">
          <div className="px-1"></div>
        </div>
      </div>
      <div className="container">
        {" "}
        <div className="row"></div>
      </div>
      <div className="container">
        {" "}
        <div className="row mt-1">
          <div className="col-sm-6">
            {userProfile.role === 3 ? (
              <>
                {" "}
                <div
                  className="card text-dark mx-2 mt-2"
                  // style={{ maxWidth: "18rem" }}
                >
                  <div className="card-header d-flex justify-content-between">
                    <span className="my-auto">SMS Wallet</span>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        getBalance();
                      }}
                    >
                      <FaRetweet />
                      <span className="d-none d-lg-inline ml-1">Refresh</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Wallet Balance</h5>
                    {smsBalance.loading ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <b>
                          {smsBalance.currency} {smsBalance.balance}
                          <br />
                        </b>
                        <sup>Balance for sms</sup>
                      </>
                    )}
                  </div>
                </div>{" "}
              </>
            ) : null}
          </div>
          <div className="col-sm-6">
            <div className="card mx-2 mt-2">
              <h5 className="card-header tw-1">Profile Completeness</h5>
              <div className="card-body d-flex flex-column">
                <p className="card-text">
                  Update Profile to get our top pro service providers
                </p>
                <div className="progress" style={{ height: "30px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-info "
                    role="progressbar"
                    style={{ width: `${profileProgress}%` }}
                  >
                    {profileProgress}%
                  </div>
                </div>
                <Link
                  to="/dashboard/profile"
                  className="btn btn-primary mt-2 ms-auto"
                >
                  {userProfile.role !== 3 ? (
                    <>Update Profile</>
                  ) : (
                    <>View Profile</>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {" "}
        <div className="row mt-5">
          <div className="col-sm-6">
            <div className="card mx-2 notification">
              <div className="card-header">Notification</div>
              <div className="card-body">
                {pageLoading ? (
                  <li className="loading">Loading....</li>
                ) : (
                  <>
                    {" "}
                    {notification.length === 0 ? (
                      <li className="loading">No Notification Found</li>
                    ) : (
                      notification.map((notification, i) => {
                        const { _id, message, sentDate } = notification;
                        return (
                          <>
                            {i <= 2 ? (
                              <div key={_id}>
                                <span className="w-100 me-4">
                                  <sup className="d-inline d-md-flex justify-content-between  mt-2 mb-0 flex-wrap"></sup>
                                  <sub className="date ms-md-auto my-0 ">
                                    {decodeDate(sentDate)[0]}
                                  </sub>{" "}
                                  <br />
                                  {message}{" "}
                                </span>
                                <hr className="my-0 mb-2" />
                              </div>
                            ) : null}
                          </>
                        );
                      })
                    )}
                    <Link to={"/dashboard/notification"}>Read More...</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card mx-2">
              <div className="card-header">Achievements</div>
              <div className="card-body d-flex flex-column">
                <ul className="nav">
                  <li className="achievements-div my-1 w-100">
                    {checkVerifiedFunction(false)}
                    <div className="text ms-2">
                      <b>Profile Completeness</b>
                      <>time</>
                    </div>
                  </li>
                  <li className="achievements-div my-1 w-100">
                    {checkVerifiedFunction(userProfile.email_verified)}
                    <div className="text ms-2">
                      <b>email_verified</b>
                      <>time</>
                    </div>
                  </li>
                  {userProfile.role !== 3 && userProfile.role !== 0 ? (
                    <>
                      <li className="achievements-div my-1 w-100">
                        {checkVerifiedFunction(userProfile.licensed)}
                        <div className="text ms-2">
                          <b>Licensed</b>
                          <>time</>
                        </div>
                      </li>
                      <li className="achievements-div my-1 w-100">
                        {checkVerifiedFunction(userProfile.backgroundChecked)}
                        <div className="text ms-2">
                          <b>background Checked</b>
                          <>time</>
                        </div>
                      </li>
                      <li className="achievements-div my-1 w-100">
                        {checkVerifiedFunction(userProfile.topPro)}
                        <div className="text ms-2">
                          <b>Top Pro</b>
                          <>time</>
                        </div>
                      </li>{" "}
                    </>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*!!!!!!!!!!!!!!!!!!!!!!!!! do not remove this commented code !!!!!!!!!!!!!!!!!!!!! */}
      {/* <h4 className="mt-5">Resent Hairs</h4>
      <div className="container  table-responsive ">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">FullName</th>
              <th scope="col">phoneNumber</th>
              <th scope="col">officeLocation</th>
              <th scope="col">Date</th>
              <th scope="col">Profile Link</th>
            </tr>
          </thead>
          <tbody className="table-primary">
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default HomePage;
