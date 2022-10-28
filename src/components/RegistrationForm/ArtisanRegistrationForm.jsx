import React, { useContext, useEffect, useState } from "react";
import "./ArtisanRegistrationForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
// import { ProfilePictureModalComponent } from "../Modal/ModalComponent";
// import ImageCropperWithStyle from "../../pages/ImageCropper/ImageCropper";
import CloudinaryUploadProfileButton from "../CloudnaryUploadButton/CloudnaryUploadButton";

function ArtisanRegistrationForm() {
  const [currentTab, setCurrentTab] = useState(1);
  // change this to "5" to add imageCropper
  const [maxTab] = useState(5);
  const [formComplete, setFormComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  // form data
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  // const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  // const [discountsAvailable, setDiscountsAvailable] = useState(false);
  // const [offersRemoteServices, setOffersRemoteServices] = useState(false);
  const [service, setService] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  // const [profileImageFile, setProfileImageFile] = useState(null);

  function updateProfilePicture(img) {
    setAvatar(img);
  }
  const { apiUrl } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      email === "" ||
      fullName === "" ||
      phoneNumber === "" ||
      locationCity === "" ||
      locationState === "" ||
      password === "" //||
      // avatar === ""
    ) {
      return setFormComplete(false);
    }

    // if()
    setFormComplete(true);
  }, [email, fullName, phoneNumber, locationCity, locationState, password]);

  async function handelSubmit(e) {
    e.preventDefault();

    // Validate input
    if (email === "") {
      toast.info("email is empty");
    }
    if (fullName === "") {
      toast.info("fullName is empty");
    }
    if (phoneNumber === "") {
      toast.info("phoneNumber is empty");
    }
    if (locationCity === "") {
      toast.info("LocationCity is empty");
    }
    if (locationState === "") {
      toast.info("LocationState is empty");
    }

    if (password === "") {
      toast.info("password is empty");
    }
    if (password !== rePassword) {
      return toast.info("Password not match");
    }

    if (
      email === "" ||
      fullName === "" ||
      phoneNumber === "" ||
      locationCity === "" ||
      locationState === "" ||
      password === ""
    ) {
      return;
    }

    if (!avatar || avatar === "") {
      return toast.info("Select an image before submitting");
    }
    setLoading(true);

    const profileOject = {
      avatar: avatar,
      fullName: fullName,
      // userName: userName,
      phoneNumber: `+234${Number(phoneNumber)}`,
      gender: gender,
      locationState: locationState,
      locationCity: locationCity,

      officeLocation: officeLocation,
      service: service.toLowerCase().trim(),
      introduction: introduction,
      email: email,
      password: password,
    };

    // console.log(profileOject);
    // ============= Send Request To Back End to save data ======================
    // return;
    // axios POST request
    const options = {
      url: `${apiUrl}/auth/artisan/register`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: profileOject,
    };

    axios(options)
      .then((response) => {
        setLoading(false);

        toast.success("Registration successfully");
        //   navigate("/login?as=artisan");
        // navigate("/login?as=artisan");
        navigate(`/verify-code/${response.data.user.email}`);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
        console.log(error);
      });
    // console.log(profileOject);
  }

  function nextSlide() {
    setCurrentTab(currentTab + 1);
  }
  function prevSlide() {
    setCurrentTab(currentTab - 1);
  }
  return (
    <>
      {/* <ProfilePictureModalComponent /> */}
      <div className="ArtisanRegistrationForm">
        {/* <!-- Circles which indicates the steps of the form: --> */}
        <form
          id="regForm"
          className="form-layout"
          onSubmit={(e) => handelSubmit(e)}
          noValidate
        >
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <ArtisanRegistrationFormIndicator
              tabCount={maxTab}
              activeTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
          <h3 className="login-name w-75 text-center mx-auto">
            Register as a Service Provider
          </h3>

          {/* <!-- One "tab" for each step in the form: --> */}
          <div
            className="tab"
            style={
              currentTab === 1 ? { display: "block" } : { display: "none" }
            }
          >
            Basic Information
            <input
              className="form-control"
              placeholder="Full name..."
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <div className="d-flex">
              <input
                className="form-control w-25"
                type={"text"}
                value="+234"
                readOnly
              />
              <input
                className="form-control"
                placeholder="Phone Number"
                type={"number"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="option-box-div">
              <label className=" d-flex me-3 mt-3">
                {" "}
                <input
                  // className="form-control"
                  type={"radio"}
                  name="gender"
                  className="me-2"
                  onChange={(e) => setGender("Male")}
                />{" "}
                Male
              </label>
              <label className=" d-flex ms-3 mt-3">
                <input
                  // className="form-control"
                  type={"radio"}
                  name="gender"
                  className="me-2"
                  onChange={(e) => setGender("Female")}
                />{" "}
                Female
              </label>
            </div>
          </div>

          <div
            className="tab"
            style={
              currentTab === 2 ? { display: "block" } : { display: "none" }
            }
          >
            Location Information: <br />
            <sup>This is use for search ranking</sup>
            <input
              className="form-control"
              placeholder="City"
              type={"text"}
              onChange={(e) => setLocationCity(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="State"
              type={"text"}
              onChange={(e) => setLocationState(e.target.value)}
            />
          </div>

          <div
            className="tab"
            style={
              currentTab === 3 ? { display: "block" } : { display: "none" }
            }
          >
            Business Information:
            <input
              className="form-control"
              placeholder="Service. Eg Tailor, Painter Etc"
              type={"text"}
              onChange={(e) => setService(e.target.value)}
            />
            <textarea
              placeholder="Tell us about the service you render"
              cols="10"
              rows="3"
              className="w-100 form-control"
              onChange={(e) => setIntroduction(e.target.value)}
            ></textarea>
            <input
              className="form-control"
              placeholder="Office Location"
              type={"text"}
              onChange={(e) => setOfficeLocation(e.target.value)}
            />
          </div>

          <div
            className="tab"
            style={
              currentTab === 4 ? { display: "block" } : { display: "none" }
            }
          >
            Login Information:
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Password..."
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Renter Password..."
              type={"password"}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>

          <div
            className="tab"
            style={
              currentTab === 5
                ? { display: "block", maxHeight: "650px" }
                : { display: "none" }
            }
          >
            Profile Picture
            <div className="edit-image-register-form">
              <CloudinaryUploadProfileButton
                formComplete={formComplete}
                avatar={avatar}
                updateProfilePicture={updateProfilePicture}
              />
            </div>
          </div>
          {formComplete ? null : (
            <sup className="text-danger text-end mt-4 d-block my-2">
              Complete Form to Submit
            </sup>
          )}
          <div style={{ overflow: "auto" }}>
            <div style={{ float: "right" }} className="d-flex">
              {currentTab !== 1 ? (
                <button
                  type="button"
                  id="prevBtn"
                  onClick={() => prevSlide()}
                  className="btn btn-primary mx-1"
                >
                  Previous
                </button>
              ) : null}
              {currentTab === maxTab ? (
                <>
                  {" "}
                  {formComplete ? (
                    <button
                      type="submit"
                      // disabled={formComplete || loading ? false : true}
                      className="btn btn-primary mx-1"
                    >
                      {!loading ? <> Submit</> : <>Loading...</>}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={formComplete || loading ? false : true}
                      className="btn btn-primary mx-1"
                    >
                      Submit
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  id="nextBtn"
                  onClick={() => nextSlide()}
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="form-text mt-3">
            <div>
              have an account? <br />
              <div className="d-flex justify-content-around mt-3">
                <Link
                  to={"/login?as=artisan"}
                  className="btn btn-outline-primary"
                >
                  Login as a Service Provider
                </Link>{" "}
                {/* <span className="my-auto">OR</span>
              <Link
                to={"/register?as=user"}
                className="btn btn-outline-primary"
              >
                Register User
              </Link> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ArtisanRegistrationForm;

export function ArtisanRegistrationFormIndicator({
  tabCount,
  activeTab,
  setCurrentTab,
}) {
  return (
    <>
      {[...Array(tabCount)].map((e, i) => (
        <span
          className={`step ${activeTab === i + 1 ? "active" : null}  ${
            i < activeTab - 1 ? "finish" : null
          }`}
          onClick={() => setCurrentTab(i + 1)}
          key={i}
        ></span>
      ))}
    </>
  );
}
