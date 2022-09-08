import React, { useEffect, useState } from "react";
import "./ArtisanRegistrationForm.scss";
import { Link } from "react-router-dom";

function ArtisanRegistrationForm() {
  const [currentTab, setCurrentTab] = useState(1);
  const [maxTab, setMaxTab] = useState(4);
  const [formComplete, setFormComplete] = useState(false);
  // form data
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [socialContact, setSocialContact] = useState("");
  const [moreContactInformation, setMoreContactInformation] = useState("");
  const [accountInformation, setAccountInformation] = useState("");
  const [categories, setCategories] = useState("");
  const [gender, setGender] = useState("");
  const [discountsAvailable, setDiscountsAvailable] = useState(false);
  const [offersRemoteServices, setOffersRemoteServices] = useState(false);
  const [service, setService] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [payment, setPayment] = useState("");

  function convertTextToArray(text) {
    return text.split(",");
  }

  useEffect(() => {
    if (
      email === "" ||
      fullName === "" ||
      phoneNumber === "" ||
      locationCity === "" ||
      locationState === "" ||
      password === ""
    ) {
      return setFormComplete(false);
    }
    setFormComplete(true);
  }, [email, fullName, phoneNumber, locationCity, locationState, password]);

  async function handelSubmit(e) {
    e.preventDefault();

    // console.dir();

    const formElements = e.target;

    // Validate input
    if (email === "") {
      return console.log("email is empty");
    }
    if (fullName === "") {
      return console.log("fullName is empty");
    }
    if (phoneNumber === "") {
      return console.log("phoneNumber is empty");
    }
    if (locationCity === "") {
      return console.log("LocationCity is empty");
    }
    if (locationState === "") {
      return console.log("LocationState is empty");
    }

    if (password === "") {
      return console.log("password is empty");
    }

    const profileOject = {
      avatar: "",
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      password: password,
      location: {
        city: locationCity,
        state: locationState,
      },
      socialContact: {
        facebook: null,
        instagram: null,
        tweeter: null,
        linkedin: null,
      },
      moreContactInformation: [
        {
          question: "Tell us more about our work",
        },
        {
          question: "Let Get Your Contact",
        },
      ],

      accountInformation: [
        {
          bankName: null,
          accountNumber: null,
        },
      ],
      categories: ["Artisans"],
      role: "1",

      gender: gender,

      discountsAvailable: discountsAvailable,
      offersRemoteServices: offersRemoteServices,
      service: service,
      introduction: introduction,
      payment: payment,
    };

    // ============= Send Request To Back End to save data ======================

    //   const res = await axios({
    //     method: 'post',
    //     url: url,
    //     headers: { Authorization: "<Generated Bearer Token>"},
    //     data: {

    //     }
    // })
    console.log(profileOject);
  }

  function nextSlide() {
    setCurrentTab(currentTab + 1);
  }
  function prevSlide() {
    setCurrentTab(currentTab - 1);
  }
  return (
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
        <h3 class="login-name">Register Artisan</h3>

        {/* <!-- One "tab" for each step in the form: --> */}
        <div
          className="tab"
          style={currentTab === 1 ? { display: "block" } : { display: "none" }}
        >
          {/* Basic Information */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="Full name..."
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="phoneNumber"
            type={"number"}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* </p> */}
          {/* <p> */}
          <div className="option-box-div">
            <label className=" d-flex me-3 mt-3">
              {" "}
              <input
                // className="form-control"
                type={"radio"}
                name="gender"
                // className="me-2"
                onChange={(e) => setGender("Male")}
              />{" "}
              Male
            </label>
            <label className=" d-flex ms-3 mt-3">
              <input
                // className="form-control"
                type={"radio"}
                name="gender"
                // className="me-2"
                onChange={(e) => setGender("Female")}
              />{" "}
              Female
            </label>
          </div>
          {/* </p> */}
        </div>

        <div
          className="tab"
          style={currentTab === 2 ? { display: "block" } : { display: "none" }}
        >
          {/* Location Info: */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="City"
            type={"text"}
            onChange={(e) => setLocationCity(e.target.value)}
          />
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="State"
            type={"text"}
            onChange={(e) => setLocationState(e.target.value)}
          />
          {/* </p> */}
          {/* <p> */}
          <input className="form-control" placeholder="Social Login" />
          <input className="form-control" placeholder="Social Login" />
          <input className="form-control" placeholder="Social Login" />
          <input className="form-control" placeholder="Social Login" />
          {/* </p> */}
        </div>

        <div
          className="tab"
          style={currentTab === 3 ? { display: "block" } : { display: "none" }}
        >
          {/* Business Information: */}
          {/* <p> */}
          <textarea
            placeholder="introduction"
            cols="10"
            rows="3"
            className="w-100 form-control"
            onChange={(e) => setIntroduction(e.target.value)}
          ></textarea>
          {/* <input
          className="form-control"
          //  
          //   type={"text"}
          
          // /> */}
          {/* </p> */}
          {/* <p> */}
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="service"
            type={"text"}
            onChange={(e) => setService(e.target.value)}
          />
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="payment"
            type={"text"}
            onChange={(e) => setPayment(convertTextToArray(e.target.value))}
          />
          <sup>Separate with (,)</sup>
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="accountInformation"
            type={"text"}
            onChange={(e) => setAccountInformation(e.target.value)}
          />
          {/* </p> */}
          <div className="option-box-div">
            <label className=" me-3 my-2 ">
              {" "}
              <input
                // className="form-control"
                type={"checkbox"}
                name="gender"
                // className="me-2"
                onChange={(e) => setDiscountsAvailable(!discountsAvailable)}
              />{" "}
              discounts Available
            </label>
            <label className="  my-2">
              <input
                // className="form-control"
                type={"checkbox"}
                name="gender"
                // className="me-2"
                onChange={(e) => setOffersRemoteServices(!offersRemoteServices)}
              />{" "}
              offers Remote Services
            </label>
          </div>
        </div>

        <div
          className="tab"
          style={currentTab === 4 ? { display: "block" } : { display: "none" }}
        >
          {/* Login Info: */}
          {/* <p> */}
          <input className="form-control" placeholder="Username..." />
          {/* </p> */}
          {/* <p> */}
          <input
            className="form-control"
            placeholder="Password..."
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* </p> */}
          {formComplete ? null : (
            <span className="text-danger my-2">Complete Form to Submit</span>
          )}
        </div>

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
              <button
                type="submit"
                disabled={formComplete ? false : true}
                className="btn btn-primary mx-1"
              >
                Submit
              </button>
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
        <div class="form-text mt-3">
          <div>
            have an account? <br />
            <div className="d-flex justify-content-around mt-3">
              <Link
                to={"/login?as=artisan"}
                className="btn btn-outline-primary"
              >
                Login As An Artisan
              </Link>{" "}
              <span class="my-auto">OR</span>
              <Link
                to={"/register?as=user"}
                className="btn btn-outline-primary"
              >
                Register As An User
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
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
