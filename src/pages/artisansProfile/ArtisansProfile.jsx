import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import StarComponent from "../../components/stars/Stars";
import ChatPopUp from "../../components/ChatPopUp/ChatPopUp";
import PageLoading from "../../components/PageLoading/PageLoading";
import "./ArtisansProfile.scss";
import ShareButton from "../../components/ShareButton/ShareButton";
import SaveButton from "../../components/SaveButton/SaveButton";
import { UserContext } from "../../context/UserContext";

function ArtisansProfile() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);

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
          <div className="containers bor der h-100">
            <div className="main-area">
              <div className="top-section">
                {/* <!--  --> */}
                <div className="image-div">
                  <img
                    src={`${
                      artisan.avatar === ""
                        ? artisan.gender === "male"
                          ? "https://st4.depositphotos.com/9998432/20073/v/1600/depositphotos_200738870-stock-illustration-default-placeholder-businessman-half-length.jpg"
                          : "https://st3.depositphotos.com/9998432/19099/v/1600/depositphotos_190990184-stock-illustration-default-placeholder-businesswoman-half-length.jpg"
                        : artisan.avatar
                    }`}
                    alt="Profile picture"
                    className="w-100 "
                  />
                </div>
                <div className="name-div">
                  <h1 className="m-0">{artisan.fullName}</h1>
                  <p className="m-0">
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
                        <font-awesome-icon icon="fas fa-trophy" />
                      </span>
                      Hired {artisan.hired} times
                    </li>

                    <li>
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-location-dot" />
                      </span>
                      {artisan.locationCity},{artisan.locationState}
                    </li>

                    <li v-if="artisanProfile.backgroundChecked">
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-user-check" />
                      </span>
                      Background checked
                    </li>

                    <li v-if="artisanProfile.discountsAvailable">
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-trophy" />{" "}
                      </span>
                      Verified business
                    </li>

                    <li v-if="artisanProfile.licensed">
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-shield-halved" />{" "}
                      </span>
                      License verified
                    </li>

                    <li>
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-people-group" />{" "}
                      </span>
                      {artisan.employees} employees
                    </li>

                    <li>
                      <span className="icon mx-2">
                        <font-awesome-icon icon="fas fa-clock" />{" "}
                      </span>
                      31 years in business
                    </li>
                  </ul>
                </div>
              </div>

              <div className="contact-div">
                <ChatPopUp />

                <button className="contact-button">
                  <font-awesome-icon icon="fas fa-phone" />
                  Request a Call
                </button>
              </div>

              <hr />
              {/*!!!!!!!!!!!!!!!!!!!!!!!!! do not remove this commented code !!!!!!!!!!!!!!!!!!!!! */}

              {/* <div className="featured-projects">
                <h4>Featured Projects</h4>
                {/* 6 photos * /}
                {/* <div className="image-flex">
                  <img
                    src="https://production-next-images-cdn.thumbtack.com/i/461310836399915022/desktop/retina/centered_large_thumb"
                    alt=""
                  />
                  <img
                    src="https://production-next-images-cdn.thumbtack.com/i/461310836399915022/desktop/retina/centered_large_thumb"
                    alt=""
                  />
                  <img
                    src="https://production-next-images-cdn.thumbtack.com/i/461310836399915022/desktop/retina/centered_large_thumb"
                    alt=""
                  />
                  <img
                    src="https://production-next-images-cdn.thumbtack.com/i/461310836399915022/desktop/retina/centered_large_thumb"
                    alt=""
                  />
                  <img
                    src="https://production-next-images-cdn.thumbtack.com/i/461310836399915022/desktop/retina/centered_large_thumb"
                    alt=""
                  />
                  <img
                    src="https://production-next-images-cdn.thumbtack.com/i/461310836399915022/desktop/retina/centered_large_thumb"
                    alt=""
                  />
                </div> * /}
              </div>
              <hr /> */}

              <div className="reviews">
                <h3>Reviews</h3>
                Customers rated this pro highly for professionalism, work
                quality, and responsiveness.
                <div>
                  <span>
                    <StarComponent rate="5" />
                    34 reviews
                  </span>
                  5 91% 4 3% 3 0% 2 3% 1 3%
                </div>
                Your trust means everything to us. Learn about our review
                guidelines.
              </div>

              <hr />

              <div className="reviews-div">
                {artisan.reviews.map((review, i) => (
                  <div className="review" key={`artisanReview${i}`}>
                    <div className="name-pix d-flex my-2">
                      <img
                        src="https://production-next-images-cdn.thumbtack.com/i/431288469664604162/width/120/aspect/1-1.webp"
                        alt=""
                        className=""
                        width="60"
                      />
                      <div className="">
                        <h4>{review.fullName}</h4>
                        <StarComponent rate="4" />
                        {review.hiredOnThumbtack ? (
                          <span>Hired on Thumbtack</span>
                        ) : null}
                      </div>
                      <span className="ms-auto"> {review.date}</span>
                    </div>
                    <div className="distribution">{review.review}</div>
                  </div>
                ))}
              </div>
              <hr />

              <div className="specialties">
                <h4>Specialties</h4>
                <b>Fixture type</b> <br />
                <ul className="nav my-auto">
                  <font-awesome-icon icon="fas fa-check" className="my-auto" />
                </ul>
              </div>

              <hr />

              <div className="credentials">
                <h4>Credentials</h4>
                <span v-if="artisanProfile.backgroundChecked">
                  <b>
                    Background Check
                    <font-awesome-icon icon="fas fa-check" />
                  </b>
                  <p>Jonathan Mcconnell</p>
                </span>

                <a href="#">View credential details</a>
              </div>

              <hr />
              <div className="faqs">
                <h4>FAQs</h4>
              </div>
            </div>
            {/* main area */}

            <div className="card-area">
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
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default ArtisansProfile;
