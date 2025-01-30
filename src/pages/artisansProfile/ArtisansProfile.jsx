import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import StarComponent, {
  ReviewStarComponent,
} from "../../components/stars/Stars.jsx";
import ChatPopUp from "../../components/ChatPopUp/ChatPopUp.jsx";
import PageLoading from "../../components/PageLoading/PageLoading.jsx";
import "./ArtisansProfile.scss";
import ShareButton from "../../components/ShareButton/ShareButton.jsx";
import SaveButton from "../../components/SaveButton/SaveButton.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { toast } from "react-toastify";
import {
  FaMapMarked,
  FaRegHandshake,
  FaShieldAlt,
  FaTrophy,
  FaUserCheck,
} from "react-icons/fa";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
import ModalImage from "./../../components/ModalImage/ModalImage.jsx";
// import ModalComponent from "./../../components/Modal/ModalComponent.jsx";
import BackButton from "../../components/BackButton/BackButton.jsx";
import { SearchContext } from "./../../context/SearchContext.jsx";
import { TermiiSMSContext } from "../../context/TermiiContext.jsx";

function ArtisansProfile() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  // const [showArtisansNumber, setShowArtisansNumber] = useState(false);
  const [artisanReviewInput, setArtisanReviewInput] = useState("");
  const [artisanRateInput, setArtisanRateInput] = useState(1);
  const navigate = useNavigate();
  const { apiUrl, loggedIn, userProfile, getUserProfile, decodeDate } =
    useContext(UserContext);
  const { artisans } = useContext(SearchContext);
  const [cookies] = useCookies();
  const { sendMessageFunction, smsBalance } = useContext(TermiiSMSContext);

  // ======= THIS WILL SEND REQUEST to API with the ID form the user profile ===========

  async function getProfile(profileId) {
    if (profileId === "" || profileId === undefined) {
      alert("this page requires an artisan ID ");
      return navigate("/artisans");
    }

    if (artisans.length !== 0) {
      var profile = artisans.find((artisan) => artisan._id === profileId);

      // print
      if (!profile) {
        // toast.info("Artesian profile not found");
        toast.info(" artisan with the ID provided is a not found");
        // navigate("/artisans");
      } else {
        setArtisan(profile);
        setPageLoading(false);
      }
      return;
    } else {
      let response = await fetch(`${apiUrl}/search/${profileId}`);

      if (response.ok) {
        let json = await response.json();
        setArtisan(json[0]);
        setPageLoading(false);
      } else {
        console.log("error");
        alert(" artisan with the ID provided is a not found");
        // navigate("/artisans");
        return;
      }
    }
  }

  // copy link function
  function copyLinkFunction(text) {
    let copiedText = text;
    navigator.clipboard.writeText(copiedText).then(
      function () {
        /* success */
        toast.success("Number Copied");
      },
      function () {
        /* failure */
        toast.error("error copying number");
      }
    );
  }

  // function phoneMessage(object) {
  //   if (object.to === "" || !object.to) {
  //     return toast.info("Service Provider`s number not gotten");
  //   }
  //   if (object.message === "" || !object.message) {
  //     return toast.info("Message not set not gotten");
  //   }
  //   let data = {
  //     message: object.message,
  //     to: `+${object.to}`,
  //   };
  //   const options = {
  //     url: `${apiUrl}/sendMail/notify`,
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json;charset=UTF-8",
  //       authorization: cookies.grinderUser.token,
  //     },
  //     data: data,
  //   };
  //   if (
  //     !window.confirm(
  //       "A notification will be sent to the Service Provider that their number was requested"
  //     )
  //   ) {
  //     return;
  //   }
  //   //  CLike the model button with js
  //   window.document.getElementById("request_artisan_number_button").click();
  //   // return;
  //   axios(options)
  //     .then((response) => {
  //       if (response.ok) {
  //         setShowArtisansNumber(true);
  //       }
  //     })
  //     .catch((error) => {
  //       // setLoading(false);
  //       console.log(error.message);
  //       if (error.response.status || error.response.status === 400) {
  //         return toast.error(error.response.data.message);
  //       }
  //       toast.error(error.message);
  //     });
  // }

  function countHireFunction(artisan) {
    const newHire = artisan.hired + 1;
    const options = {
      url: `${apiUrl}/notification/hireCount/${artisan._id}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: { hired: newHire },
    };
    axios(options)
      .then((response) => {
        getProfile(id);
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }

  function handelSendMessage(object) {
    if (
      !window.confirm(
        "A notification will be sent to the Service Provider that their number was requested"
      )
    ) {
      return;
    }

    sendMessageFunction(object);
    countHireFunction(artisan);
  }
  // function sendMessageFunction(object) {
  //   if (
  //     !window.confirm(
  //       "A notification will be sent to the Service Provider that their number was requested"
  //     )
  //   ) {
  //     return;
  //   }
  //   if (object.to.length === 0)
  //     return toast.error("Receivers Number is required");
  //   if (object.message === "") return toast.error("Message is required");
  //   const options = {
  //     method: "POST",
  //     url: "https://api.sendchamp.com/api/v1/sms/send",
  //     headers: {
  //       accept: "application/json",
  //       "content-type": "application/json",
  //       Authorization: `Bearer sendchamp_live_$2y$10$.lpAz0y5oNTtuwrvbWqOdevgYa7DRO.2Zn1zM40TsVbU4wkFL09ae`,
  //     },
  //     data: {
  //       to: object.to,
  //       message: object.message,
  //       sender_name: "Grinders",
  //       route: "international",
  //     },
  //   };
  //   // console.log(object.to);
  //   window.document.getElementById("request_artisan_number_button").click();
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       toast.success("Notification sent successfully");
  //       console.log(response.data);

  //
  //     })
  //     .catch(function (error) {
  //       toast.error(error.response.data.message);

  //       console.error(error);
  //     });
  // }
  // function handelHire() {
  //   if (!loggedIn) {
  //     toast.info("Login First");
  //   }
  //   let data = {
  //     message: `Your contact was requested by <${userProfile.fullName} , ${userProfile.email}>. Hope you where contacted. `,
  //     privilege: artisan._id,
  //   };
  //   const options = {
  //     // url: `http://localhost:5000/api/notification`,
  //     url: `${apiUrl}/notification`,
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json;charset=UTF-8",
  //       authorization: cookies.grinderUser.token,
  //     },
  //     data: data,
  //   };
  //   phoneMessage({
  //     message: data.message,
  //     to: artisan.phoneNumber,
  //   });

  //   axios(options)
  //     .then((response) => {
  //       countHireFunction(artisan);
  //     })
  //     .catch((error) => {
  //       // setLoading(false);
  //       console.log(error.message);
  //       if (error.response.status || error.response.status === 400) {
  //         return toast.error(error.response.data.message);
  //       }
  //       toast.error(error.message);
  //     });
  // }
  useEffect(() => {
    if (loggedIn) {
      getUserProfile();
    }
  }, []);

  function giveArtisanReview() {
    if (!loggedIn) {
      return toast.info("Login to give a review");
    }
    if (artisanReviewInput === "") {
      return toast.info("Write a review");
    }
    if (artisanRateInput === "") {
      return toast.info("Give a rate (1-5)");
    }
    if (artisanRateInput > 5 || artisanRateInput < 0) {
      return toast.info("Rate is between 1-5");
    }
    const data = {
      avatar: userProfile.avatar,
      fullName: userProfile.fullName,
      rate: artisanRateInput,
      date: moment(Date.now())._d,
      review: artisanReviewInput,
    };
    // axios PUT request
    const options = {
      // url: `http://localhost:5000/api/auth/user/login`,
      url: `${apiUrl}/review/${id}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: data,
    };

    axios(options)
      .then((response) => {
        if (response.data.ok) {
          toast.info("Review saved");
          setArtisanReviewInput("");
          setArtisanRateInput("");
          getProfile(id);
        }
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  useEffect(() => {
    // console.log(id)
    getProfile(id);
  }, []);
  return (
    <>
      <Nav />

      {pageLoading ? (
        <>
          <PageLoading loadingStateError={false}>Loading..</PageLoading>
        </>
      ) : (
        <div className="ArtisansProfile h-100">
          <div className="containers profile">
            <div className="row">
              <div className="col-md-4 p-0">
                <div className="side-section">
                  <div className="header">
                    <BackButton />
                  </div>
                  <div className="profile-image-container">
                    <img
                      src={`${
                        artisan.avatar === ""
                          ? "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png"
                          : artisan.avatar
                      }`}
                      alt="Profile picture"
                      className="profile-image"
                    />
                  </div>
                  <h5>{artisan.fullName}</h5>
                  <p className="mb-0 w-75 mx-auto">
                    {" "}
                    <b>Service</b> <br />
                    {artisan.service}
                  </p>
                  <StarComponent rate={5} />
                  <div className="extra-button">
                    <ShareButton id={`${artisan._id}`} />
                    <SaveButton artisan={artisan} />
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="main-area">
                  <div className="introduction">
                      <div>
                      <h5>
                        <b>Introduction</b>
                      </h5>
                      {artisan.introduction}
                      </div>
                    <hr />
                  </div>
                  <div className="more-info  px-3 ">
                    <h5>
                      <b> Overview</b>
                    </h5>
                    <ul className=" w-100">
                      <li>
                        <span className="icon mx-2">
                          <FaTrophy />
                        </span>
                        Hired {artisan.hired} times
                      </li>

                      <li className="d-flex">
                        <span className="icon mx-2">
                          <FaMapMarked />
                        </span>

                        <span>
                          <p className="mb-0">
                            <b>State:</b> {artisan.locationState}
                          </p>
                          <p className="mb-0">
                            <b>City:</b> {artisan.locationCity}
                          </p>
                        </span>
                      </li>
                      {artisan.backgroundChecked ? (
                        <li>
                          <span className="icon mx-2">
                            <FaUserCheck />
                          </span>
                          Background checked
                        </li>
                      ) : null}
                      {artisan.discountsAvailable ? (
                        <li>
                          <span className="icon mx-2">
                            <FaTrophy />
                          </span>
                          Verified business
                        </li>
                      ) : null}
                      {artisan.licensed ? (
                        <li>
                          <span className="icon mx-2">
                            <FaShieldAlt />
                          </span>
                          License verified
                        </li>
                      ) : null}
                      {artisan.YearsOfExperience ? (
                        <li>
                          <span className="icon mx-2">
                            <FaShieldAlt />
                          </span>
                          {artisan.YearsOfExperience} Years
                        </li>
                      ) : null}

                      {/* <li>
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-clock" />{" "}
                      </span>
                      31 years in business
                    </li> */}
                    </ul>
                  </div>
                  <div className="contact-div">
                    <ChatPopUp artisan={artisan} />

                    <button
                      className="contact-button"
                      onClick={() => {
                        // handelHire();
                        handelSendMessage({
                          to: `${artisan.phoneNumber}`,
                          message: `Your contact was requested by <${userProfile.fullName} , ${userProfile.email}>. Hope you where contacted. `,
                        });
                      }}
                    >
                      <FaRegHandshake className="mx-1" />
                      Hire
                    </button>
                  </div>
                  <hr />
                  {/*!!!!!!!!!!!!!!!!!!!!!!!!! do not remove this commented code !!!!!!!!!!!!!!!!!!!!! */}
                  <div className="featured-projects">
                    <h5>
                      <b>Featured Projects</b>
                    </h5>
                    {artisan.workImage.length} photos
                    <div className="image-flex">
                      {artisan.workImage.map((work, i) => {
                        const { image, about } = work;
                        return (
                          <ModalImage imgUrl={image} about={about} key={i} />
                        );
                      })}
                    </div>
                  </div>
                  {/* <hr />
              <div className="reviews">
                <h3>Reviews</h3>
                Customers rated this pro highly for professionalism, work
                quality, and responsiveness.
                <div>
                  <span>
                    <StarComponent rate={5} />
                  </span>
                </div>
                Your trust means everything to us. Learn about our review
                guidelines.
              </div> */}
                  <hr />
                  <div className="reviews-div">
                    <div className="reviews">
                      {artisan.reviews.length === 0 ? (
                        <h5 className="text-muted text-center">No Review</h5>
                      ) : (
                        <>
                          {" "}
                          {artisan.reviews.map((review, i) => (
                            <div className="review" key={`artisanReview${i}`}>
                              <div className="d-flex">
                                <img
                                  src={review.avatar}
                                  width="60"
                                  height={"60"}
                                />
                                <div className="name-pix d-flex flex-column-reverse  w-100 flex-md-row my-2">
                                  <div className=" ">
                                    <h4 className="m-0">{review.fullName}</h4>
                                    <div className="star-div">
                                      <StarComponent rate={review.rate} />
                                    </div>
                                  </div>
                                  <sup className="ms-md-auto ms-0 me-md-0 me-auto">
                                    {decodeDate(review.date)[0]}
                                  </sup>
                                </div>
                              </div>
                              <div className="distribution">
                                {review.review}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="form-div">
                      {/* <hr /> */}
                      <div className="d-flex flex-column flex-md-row">
                        <textarea
                          className="form-control"
                          placeholder="Write a review on this artisan"
                          cols="5"
                          rows="3"
                          value={artisanReviewInput}
                          onChange={(e) => {
                            setArtisanReviewInput(e.target.value);
                          }}
                        ></textarea>

                        <button
                          className="btn-primary btn h-25 mx-1 mt-auto"
                          onClick={() => {
                            giveArtisanReview();
                          }}
                        >
                          Review
                        </button>
                      </div>
                      <ReviewStarComponent
                        rate={artisanRateInput}
                        setRate={setArtisanRateInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default ArtisansProfile;
