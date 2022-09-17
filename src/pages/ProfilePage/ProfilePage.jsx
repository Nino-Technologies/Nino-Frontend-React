import React, { useContext, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { PaymentModalComponent } from "../../components/Modal/ModalComponent";
import { UserContext } from "../../context/UserContext";
import "./ProfilePage.scss";

function ProfilePage() {
  const [editForm, setEditForm] = useState(false);
  const { userProfile } = useContext(UserContext);
  // console.log(userProfile);
  function getAccountType(role) {
    if (role === 0) {
      return "User";
    }
    if (role === 1) {
      return "Artisan";
    }
  }
  // const [editProfile, setEditProfile] = useState({
  //   accountInformation: [],
  //   avatar: "",
  //   backgroundChecked: "",
  //   categories: ["artisans"],
  //   discountsAvailable: false,
  //   email: "",
  //   email_verified: false,
  //   employees: "",
  //   fullName: "",
  //   hired: 0,
  //   joinDate: "",
  //   licensed: false,
  //   location: { city: "", state: "" },
  //   moreContactInformation: [],
  //   offersRemoteServices: false,
  //   paymentMethods: ["Bank transfer", "Cash"],
  //   phoneNumber: "",
  //   introduction: "",
  //   reviews: [],
  //   role: 1,
  //   socialContact: {
  //     facebook: null,
  //     instagram: null,
  //     tweeter: null,
  //     linkedin: null,
  //   },
  //   specialties: [],
  //   topPro: false,
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(value);
  //   setEditProfile((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  // const {
  //   avatar,
  //   backgroundChecked,
  //   categories,
  //   discountsAvailable,
  //   email,
  //   employees,
  //   fullName,
  //   hired,
  //   joinDate,
  //   licensed,
  //   location,
  //   moreContactInformation,
  //   offersRemoteServices,
  //   paymentMethods,
  //   phoneNumber,
  //   introduction,
  //   reviews,
  //   role,
  //   specialties,
  //   email_verified,
  //   socialContact,
  //   topPro,
  // } = userProfile;
  // useEffect(() => {
  //   setEditProfile({
  //     accountInformation: [],
  //     avatar: avatar,
  //     backgroundChecked: backgroundChecked,
  //     categories: ["artisans"],
  //     discountsAvailable: false,
  //     email: email,
  //     email_verified: email_verified,
  //     employees: employees,
  //     fullName: fullName,
  //     hired: hired,
  //     joinDate: joinDate,
  //     licensed: licensed,
  //     // location: { city: location.city, state: location.state },
  //     moreContactInformation: [],
  //     offersRemoteServices: false,
  //     paymentMethods: ["Bank transfer", "Cash"],
  //     phoneNumber: phoneNumber,
  //     introduction: introduction,
  //     reviews: [],
  //     role: 1,
  //     // socialContact: {
  //     //   facebook: socialContact.facebook,
  //     //   instagram: socialContact.instagram,
  //     //   tweeter: socialContact.tweeter,
  //     //   linkedin: socialContact.linkedin,
  //     // },
  //     specialties: [],
  //     topPro: topPro,
  //   });
  // }, [editForm]);

  return (
    <div className="ProfilePage">
      {userProfile.freeAccount ? (
        <div className="alert alert-info d-flex justify-content-between flex-column flex-md-row">
          <span className="my-auto">
            {" "}
            <FaInfoCircle className="my-auto" /> This Account is on Free trials
          </span>
          {/* ============================= open Subcribtion modal button =============================== */}
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            href="#paymentModalToggle"
            role="button"
          >
            Buy Subscription
          </button>
          {/* ===================================== </> ================================================= */}
        </div>
      ) : null}
      <div className="header mt-5 mb-3 d-flex justify-content-between">
        <h3 className=" ms-4"> Profile</h3>
      </div>

      <div className="profile-card mx-5 mb-5">
        <div className="image-div">
          <img
            src="https://production-next-images-cdn.thumbtack.com/i/431288469664604162/width/120/aspect/1-1.webp"
            alt=""
          />
          <button
            className="btn btn-primary mt-3"
            onClick={() => setEditForm(!editForm)}
          >
            {!editForm ? "Update Profile" : "Cancel Edit"}
          </button>
        </div>
        {/* ============================= open Subcribtion modal button =============================== * /} 
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          href="#paymentModalToggle"
          role="button"
        >
          Buy Subscription
        </button>
        {/* ===================================== </> ================================================= */}
        <div className="form-div ">
          <form className=" my-5">
            <div className="d-flex">
              {userProfile.role === 1 ? (
                <label className="w-100 mx-3 my-3" htmlFor="">
                  National Identity Number
                  <input
                    type="text"
                    className="form-control"
                    // placeholder={userProfile.socialId || "Social ID"}
                    placeholder="NIN"
                    disabled={!editForm}
                    // value={editForm.socialId || "Social ID"}
                  />
                </label>
              ) : null}
              <label className="w-100 mx-3 my-3" htmlFor="">
                FullName
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.fullName || "Full Name"}
                  disabled={!editForm}
                  // value={userProfile.fullName || "Full Name"}
                />
              </label>
            </div>
            <div className="d-flex">
              <label className="w-100 mx-3 my-3" htmlFor="">
                Phone number
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.phoneNumber || "Phone Number"}
                  disabled={!editForm}
                  // value={userProfile.phoneNumber || "Phone Number"}
                />
              </label>
              <label className="w-100 mx-3 my-3" htmlFor="">
                Email
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.email}
                  disabled={!editForm}
                  // value={userProfile.email}
                />
              </label>
            </div>

            {userProfile.role === 1 ? (
              <>
                <b>Location</b>
                <div className="d-flex">
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    City
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.location.city}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    State
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.location.state}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                </div>
                {/* <b>Social media  link</b>
                <div className="d-flex">
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    Facebook
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.socialContact.facebook}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    Instagram
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.socialContact.instagram}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                </div> */}
                {/* <div className="d-flex">
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    Twitter
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.socialContact.tweeter}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    Linkedin
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.socialContact.linkedin}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                </div>*/}
              </>
            ) : null}
            <div className="d-flex">
              <label className="w-100 mx-3 my-3" htmlFor="">
                Account Type
                <input
                  type="text"
                  className="form-control"
                  placeholder={getAccountType(userProfile.role)}
                  disabled={true}
                  // value={userProfile.role}
                />
              </label>
              <label className="w-100 mx-3 my-3" htmlFor="">
                Joined Date
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.joinDate}
                  disabled={true}
                  // value={userProfile.joinDate}
                />
              </label>
            </div>
            {editForm ? (
              <button className="w-50 m-auto mt-4 btn-primary btn">Save</button>
            ) : null}
          </form>
        </div>
      </div>
      {userProfile.role === 1 ? (
        <>
          <div className="header mt-5 mb-3 d-flex flex-column flex-md-row justify-content-between">
            <h3 className=" ms-4"> Business Info</h3>{" "}
            <button
              className="btn btn-primary mt-3"
              onClick={() => setEditForm(!editForm)}
            >
              {!editForm ? "Update Profile" : "Cancel Edit"}
            </button>
          </div>
          <div className="profile-card mx-5 mb-5">
            <div className=" w-100 py-2">
              <form className=" my-5 px-3">
                {/* <div className="d-flex"> */}
                <label htmlFor="" className="w-100">
                  Tell us about the service you render
                  <textarea
                    name="introduction"
                    id=""
                    className="form-control"
                    cols="15"
                    rows="3"
                    // value={userProfile.introduction}
                    placeholder={userProfile.introduction}
                    disabled={!editForm}

                    // onChange={(e) => handleChange(e)}
                  ></textarea>
                </label>

                <div className="d-flex flex-column flex-md-row">
                  <label className="w-100 mx-0 mx-md-3 my-3">
                    office address
                    <input
                      type="text"
                      className="form-control"
                      disabled={!editForm}
                    />
                  </label>
                  {/* <label className="w-100 mx-3 my-3" htmlFor="">
                    Referee Name
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.location.city}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label> */}
                  <label className="w-100  mx-0 mx-md-3 my-3">
                    Year of experience
                    <input
                      type="text"
                      className="form-control"
                      disabled={!editForm}
                    />
                  </label>
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <label className="w-100  mx-0 mx-md-3 my-3" htmlFor="">
                    Referee Name
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.location.city}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                  <label className="w-100  mx-0 mx-md-3 my-3" htmlFor="">
                    Referee Number
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.location.state}
                      disabled={!editForm}
                      // value={userProfile.joinDate}
                    />
                  </label>
                </div>

                {editForm ? (
                  <button className="w-50 m-auto mt-4 btn-primary btn">
                    Save
                  </button>
                ) : null}
              </form>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ProfilePage;
