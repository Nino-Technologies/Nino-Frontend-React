import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import StarComponent, {
  ReviewStarComponent,
} from "../../components/stars/Stars";
import ChatPopUp from "../../components/ChatPopUp/ChatPopUp";
import PageLoading from "../../components/PageLoading/PageLoading";
import "./ArtisansProfile.scss";
import ShareButton from "../../components/ShareButton/ShareButton";
import SaveButton from "../../components/SaveButton/SaveButton";
import { UserContext } from "../../context/UserContext";
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
import ModalImage from "./../../components/ModalImage/ModalImage";
import ModalComponent from "./../../components/Modal/ModalComponent";

function ArtisansProfile() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [showArtisansNumber, setShowArtisansNumber] = useState(false);
  const [artisanReviewInput, setArtisanReviewInput] = useState("");
  const [artisanRateInput, setArtisanRateInput] = useState(1);
  const navigate = useNavigate();
  const { apiUrl, loggedIn, userProfile, getUserProfile, decodeDate } =
    useContext(UserContext);
  const [cookies] = useCookies();

  // ======= THIS WILL SEND REQUEST to API with the ID form the user profile ===========

  async function getProfile(profileId) {
    if (profileId === "" || profileId === undefined) {
      alert("this page requires an artisan ID ");
      return navigate("/artisans");
    }
    let response = await fetch(`${apiUrl}/search/${profileId}`);
    // let response = await fetch(`http://localhost:5000/api/search/${profileId}`);

    if (response.ok) {
      let json = await response.json();
      setArtisan(json[0]);
      setPageLoading(false);
    } else {
      console.log("error");
      alert(" artisan with the ID provided is a not found");
      navigate("/artisans");
      return;
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

  function phoneMessage(object) {
    if (object.to === "" || !object.to) {
      return toast.info("Artisan number not gotten");
    }
    if (object.message === "" || !object.message) {
      return toast.info("Message not set not gotten");
    }
    let data = {
      message: object.message,
      to: `+${object.to}`,
    };
    const options = {
      // url: `http://localhost:5000/api/notification`,
      url: `${apiUrl}/sendMail/notify`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: data,
    };
    if (
      !window.confirm(
        "A notification will be sent to artisan their number was requested"
      )
    ) {
      return;
    }
    //  CLike the model button with js
    window.document.getElementById("request_artisan_number_button").click();
    // return;
    axios(options)
      .then((response) => {
        if (response.ok) {
          setShowArtisansNumber(true);
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

  // console.log(artisan.phoneNumber);
  function handelHire() {
    if (!loggedIn) {
      toast.info("Login First");
    }
    let data = {
      message: `Your contact was requested by <${userProfile.fullName} , ${userProfile.email}>. Hope you where contacted. `,
      privilege: artisan._id,
    };
    const options = {
      // url: `http://localhost:5000/api/notification`,
      url: `${apiUrl}/notification`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: data,
    };
    phoneMessage({
      message: data.message,
      to: artisan.phoneNumber,
    });

    axios(options)
      .then((response) => {})
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
    // console.log(moment(Date.now())._d);
    // console.log("Data", userProfile);
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
        <div className="ArtisansProfile">
          {/* button to open model */}
          <button
            type="button"
            className="button"
            id="request_artisan_number_button"
            // hide button; it will be clicked with js
            style={{ display: "none" }}
            data-bs-toggle="modal"
            data-bs-target="#request_artisan_number"
          ></button>
          {/* model component;  */}
          <ModalComponent
            modalTitle={"Important Notification"}
            modalId={"request_artisan_number"}
          >
            {artisan.phoneNumber !== "" ? (
              <>
                Artisan will be notified that their number is been request
                <h5 className="border my-2 ps-3 py-2">
                  +{artisan.phoneNumber}
                </h5>{" "}
                <div className="btn-group" role="group">
                  <a href={`tel:+${artisan.phoneNumber}`}>
                    {" "}
                    <button type="button" className="btn btn-primary">
                      Call
                    </button>
                  </a>
                  {/* <!-- Use %20 instead of spaces, + for country code --> */}
                  <a
                    href={`sms:+${artisan.phoneNumber}?body=Question%20from%20me`}
                  >
                    <button type="button" className="btn btn-primary">
                      SMS
                    </button>
                  </a>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => copyLinkFunction(`+${artisan.phoneNumber}`)}
                  >
                    Copy
                  </button>
                </div>
              </>
            ) : (
              <>to become a verified artisan</>
            )}
            <br />{" "}
          </ModalComponent>
          <div className="containers h-100">
            <div className="main-area">
              <div className="top-section">
                {/* <!--  --> */}
                <div className="image-div">
                  <img
                    src={`${
                      artisan.avatar === ""
                        ? "https://via.placeholder.com/100x100"
                        : artisan.avatar
                    }`}
                    alt="Profile picture"
                    className="w-100 "
                  />
                </div>
                <div className="name-div">
                  <h1 className="m-0">{artisan.fullName}</h1>
                  <p className="m-0 nav flex-row">
                    {/* <!-- Exceptional 5.0 --> */}

                    <StarComponent rate="5" />
                    {/* <!-- (22) --> */}
                  </p>
                  <b>Service</b> <br />
                  {artisan.service}
                  <div className="extra-button">
                    <ShareButton id={`${artisan._id}`} />
                    <SaveButton />
                  </div>
                </div>
              </div>
              <hr />
              <div className="introduction">
                <p>
                  <b>Introduction</b>: {artisan.introduction}
                </p>
                <hr />
              </div>
              <div className="more-info d-flex px-3">
                <div>
                  <b> Overview</b>
                  <ul>
                    <li>
                      <span className="icon mx-2">
                        <FaTrophy />
                      </span>
                      Hired {artisan.hired} times
                    </li>

                    <li>
                      <span className="icon mx-2">
                        <FaMapMarked />
                      </span>
                      {artisan.locationCity},{artisan.locationState}
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

                    <li>
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-people-group" />{" "}
                      </span>
                      {artisan.employees} employees
                    </li>

                    {/* <li>
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-clock" />{" "}
                      </span>
                      31 years in business
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="contact-div">
                <ChatPopUp artisan={artisan} />

                <button
                  className="contact-button"
                  onClick={() => {
                    handelHire();
                  }}
                >
                  <FaRegHandshake className="mx-1" />
                  Hire
                </button>
              </div>
              <hr />
              {/*!!!!!!!!!!!!!!!!!!!!!!!!! do not remove this commented code !!!!!!!!!!!!!!!!!!!!! */}
              <div className="featured-projects">
                <h4>Featured Projects</h4>
                {artisan.workImage.length} photos
                <div className="image-flex">
                  {artisan.workImage.map((work) => {
                    const { image, about } = work;

                    return <ModalImage imgUrl={image} about={about} />;
                  })}
                </div>
              </div>
              <hr />
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
              </div>
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
                            <img src={review.avatar} width="60" height={"60"} />
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
                          <div className="distribution">{review.review}</div>
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
              {/*  <hr />
               <div className="specialties">
                <h4>Specialties</h4>
                <b>Fixture type</b> <br />
                <ul className="nav my-auto">
                  <font-awesome-icon icon="fas fa-check" className="my-auto" />
                </ul>
              </div> */}
              <hr />
            </div>
            {/* main area */}

            {/* <div className="card-area">
              <div className="form-card">
                <form action="">
                  <font-awesome-icon icon="fas fa-comment" /> contact for price
                  <hr />
                  <label className="w-100 text-start">
                    <b> Zip-Code</b>
                    <input type="text" className="form-control" />
                  </label>
                  <label className="w-100 text-start">
                    <b> Areas needing help</b>
                    <select type="text" className="form-select">
                      <option value="">select an answer</option>
                    </select>
                  </label>
                  <label className="w-100 text-start">
                    <b> Property type</b>
                    <select type="text" className="form-select">
                      <option value="">select an answer</option>
                    </select>
                  </label>
                  <button className="btn btn-primary w-100 mt-4">
                    Request a Quote
                  </button>
                  <p className="mt-3">
                    <font-awesome-icon icon="fas fa-comments" />
                    Responds within
                    <span className="bold">a day</span>
                  </p>
                </form>
              </div>
            </div> */}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default ArtisansProfile;
