import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCogs, FaInfoCircle, FaUser, FaUserCheck } from "react-icons/fa";
// import { PaymentModalComponent } from "../../components/Modal/ModalComponent";
import { UserContext } from "../../context/UserContext";
import "./ProfilePage.scss";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import VerifiedBadge from "../../components/verifiedBadge/verifiedBadge";
import { Link } from "react-router-dom";
import CloudinaryUploadProfileButton from "../../components/CloudnaryUploadButton/CloudnaryUploadButton";
{
  /*!!!!!!!!!!!!!!!!!!!!!!!!! do not remove any commented code on this page !!!!!!!!!!!!!!!!!!!!! */
}
// clouldnary
// oyieaesl
// dhvacnvek

function ProfilePage() {
  const [editForm, setEditForm] = useState(false);
  const { userProfile, decodeDate, apiUrl, getUserProfile } =
    useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(1);
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="content-body">
      <div className="container">
        <div className="row">
          <>
            <ProfileSubNav setCurrentTab={setCurrentTab} />
          </>
          {currentTab === 1 ? (
            <ShowProfile userProfile={userProfile} decodeDate={decodeDate} />
          ) : null}
          {currentTab === 2 ? (
            <EditProfile
              userProfile={userProfile}
              apiUrl={apiUrl}
              getUserProfile={getUserProfile}
            />
          ) : null}
          {currentTab === 3 ? (
            <VerifyProfile userProfile={userProfile} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

export function ProfileSubNav({ setCurrentTab }) {
  return (
    <div className="col-xl-12 mt-5 mb-3">
      <div className="card sub-menu">
        <div className="card-body active">
          <ul className="d-flex show nav">
            <li
              className="nav-item active nav-link"
              onClick={() => setCurrentTab(1)}
            >
              <FaUser />
              <span>Profile</span>
            </li>
            <li className="nav-item nav-link" onClick={() => setCurrentTab(2)}>
              <FaCogs />
              <span>Edit Profile</span>
            </li>
            <li className="nav-item nav-link" onClick={() => setCurrentTab(3)}>
              <FaUserCheck />
              <span>Verify Profile</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export function ShowProfile({ userProfile, decodeDate }) {
  function getAccountType(role) {
    if (role === 0) {
      return "User";
    }
    if (role === 1) {
      return "Artisan";
    }
    if (role === 3) {
      return "Admin";
    }
  }
  return (
    <div className="ProfilePage">
      <ProfileSubscriptionAlertCard userProfile={userProfile} />
      <div className="card d-flex ">
        <div className="card-header py-3 fw-bold">Profile</div>
        <div className="card-body">
          <div className="image-div d-flex">
            <img
              src={userProfile.avatar}
              alt="profilePix"
              className="mx-auto"
            />
          </div>
          {/* ============================= open Subscription modal button =============================== * /}
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          href="#paymentModalToggle"
          role="button"
        >
          Buy Subscription
        </button>
        {/* ===================================== </> ================================================= */}
          <div className="form-div ">
            <form className="my-5">
              <div className="d-flex flex-column flex-md-row">
                {/* <label className="w-100 mx-3 my-3" htmlFor="">
                  <b> National Identity Number</b>
                  <br />
                  {userProfile.Nin}
                </label> */}
                <label className="w-100 mx-3 my-3" htmlFor="">
                  <b> FullName:</b> <br />
                  {userProfile.fullName || "Full Name"}
                </label>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <label className="w-100 mx-3 my-3" htmlFor="">
                  <b> Phone number</b> <br />+{userProfile.phoneNumber}
                </label>
                <label className="w-100 mx-3 my-3" htmlFor="">
                  <b> Email</b>
                  <br />
                  {userProfile.email}
                </label>
              </div>

              <>
                <div className="d-flex flex-column flex-md-row">
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    <b> City</b> <br />
                    {userProfile.locationCity}
                  </label>
                  <label className="w-100 mx-3 my-3" htmlFor="">
                    <b> State</b> <br />
                    {userProfile.locationState}
                  </label>
                </div>
              </>
              <div className="d-flex flex-column flex-md-row">
                <label className="w-100 mx-3 my-3" htmlFor="">
                  <b> Account Type</b> <br />
                  {getAccountType(userProfile.role)}
                </label>
                <label className="w-100 mx-3 my-3" htmlFor="">
                  <b> Joined Date</b> <br />
                  {decodeDate(userProfile.joinDate)}
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      {userProfile.role === 1 ? (
        <>
          <div className="card  my-5">
            <div className="card-header py-3 fw-bold"> Business Info</div>
            <div className="card-body">
              <div className=" w-100 py-2">
                <form className=" my-5 px-3">
                  <p>
                    <b>Introduction</b> <br />
                    {userProfile.introduction}
                  </p>

                  <div className="d-flex flex-column flex-md-row">
                    <p className="w-100 mx-0 me-md-3 my-3">
                      <b> office address</b> <br />
                      {/* {console.log(userProfile)} */}
                      {userProfile.officeLocation}
                    </p>
                    <p className="w-100 mx-0 ms-md-3 my-3">
                      <b> Year of experience</b> <br />
                      {/* {console.log(userProfile)} */}
                      {userProfile.YearsOfExperience} Years
                    </p>
                  </div>
                  <div className="d-flex flex-column flex-md-row">
                    <p className="w-100 mx-0 me-md-3 my-3">
                      <b> Referee Name</b> <br />
                      {/* {console.log(userProfile)} */}
                      {userProfile.refereeName}
                    </p>
                    <p className="w-100 mx-0 ms-md-3 my-3">
                      <b> Referee Number</b> <br />
                      {/* {console.log(userProfile)} */}
                      {userProfile.refereeNumber}
                    </p>
                  </div>

                  {/* {editForm ? (
                  <button className="w-50 m-auto mt-4 btn-primary btn">
                    Save
                  </button>
                ) : null} */}
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
export function VerifyProfile({ userProfile }) {
  return (
    <>
      <div className="col-xl-12 mt-3 mb-3">
        <div className="card sub-menu">
          <div className="card-header">Verify Account</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 d-flex justify-content-between my-2">
                Email Verification
                {userProfile.email_verified ? (
                  <VerifiedBadge />
                ) : (
                  <Link
                    to={`/verify-code/${userProfile.email}`}
                    className="btn btn-primary"
                  >
                    Verify
                  </Link>
                )}
              </div>
              <div className="col-12 d-flex justify-content-between my-2">
                Account Verified
                {userProfile.account_verified ? (
                  <VerifiedBadge />
                ) : (
                  <div>Not Verified</div>
                )}
              </div>
              <div className="col-12 d-flex justify-content-between my-2">
                Account Active
                {userProfile.account_active ? (
                  <VerifiedBadge />
                ) : (
                  <button>Verify</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function EditProfile({ userProfile, apiUrl, getUserProfile }) {
  const [editProfileFormData, setEditProfileFormDate] = useState({
    avatar: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    userName: "",
    officeLocation: "",
    refereeNumber: "",
    locationState: "",
    locationCity: "",
    service: "",
    gender: "",
    introduction: "",
    // Nin: "",
    YearsOfExperience: "",
    refereeName: "",
    companyName: "",
  });
  const [img_url, setImg_url] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [cookies] = useCookies();

  const [editPasswordPrev, setEditPasswordPrev] = useState("");
  const [editPasswordNew, setEditPasswordNew] = useState("");
  const [editPasswordConNew, setEditPasswordConNew] = useState("");
  const [editIntroduction, setEditIntroduction] = useState("");

  useEffect(() => {
    setEditIntroduction(userProfile.introduction);
  }, []);
  useEffect(() => {
    setImg_url(userProfile.avatar);
  }, []);
  // function

  // const imageHandler = (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImg_url(reader.result);
  //     }
  //   };

  //   reader.readAsDataURL(e.target.files[0]);
  //   setImageFile(e.target.files[0]);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfileFormDate({ ...editProfileFormData, [name]: value });
  };

  function updateChanges(data) {
    // console.log("Data", data);
    // axios PUT request
    const options = {
      url: `${apiUrl}/users`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: data,
    };
    // console.log(data);
    // return;
    axios(options)
      .then((response) => {
        getUserProfile();
        toast.success("Successful");
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        if (!error.response.data.ok) {
          toast.error(error.response.data.message);
        }
      });
  }
  // use cloudinary Widget
  // function uploadImageToCloudinary() {
  //   if (imageFile === "") return toast.info("No image selected");

  //   const imageData = new FormData();
  //   imageData.append("file", imageFile);
  //   imageData.append("upload_preset", "oyieaesl");
  //   imageData.append("cloud_name", "dhvacnvek");

  //   console.log(imageData.append("file", imageFile));
  //   return;
  //   // console.log(imageFile);
  //   // return;
  //   fetch("  https://api.cloudinary.com/v1_1/dhvacnvek/image/upload", {
  //     method: "post",
  //     body: imageData,
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       updatePicture(data.url);
  //       // return;
  //     })
  //     .catch((err) => console.log(err));
  // }

  async function updatePicture(imgURL) {
    let updateData = { avatar: imgURL };
    updateChanges(updateData);
  }

  function updatePersonalInformation(e) {
    e.preventDefault();

    let /*Nin, */ fullName, phoneNumber, email, locationCity, locationState;

    // if (editProfileFormData.Nin === "") {
    //   Nin = e.target[0].placeholder;
    // } else {
    //   Nin = editProfileFormData.Nin;
    // }
    if (editProfileFormData.fullName === "") {
      fullName = e.target[1].placeholder;
    } else {
      fullName = editProfileFormData.fullName;
    }
    if (editProfileFormData.phoneNumber === "") {
      phoneNumber = e.target[2].placeholder;
    } else {
      phoneNumber = editProfileFormData.phoneNumber;
    }
    if (editProfileFormData.email === "") {
      email = e.target[3].placeholder;
    } else {
      email = editProfileFormData.email;
    }
    if (editProfileFormData.locationCity === "") {
      locationCity = e.target[4].placeholder;
    } else {
      locationCity = editProfileFormData.locationCity;
    }
    if (editProfileFormData.locationState === "") {
      locationState = e.target[5].placeholder;
    } else {
      locationState = editProfileFormData.locationState;
    }
    let changeNumber = `+234${Number(phoneNumber)}`;
    let updateData = {
      // Nin,
      fullName,
      phoneNumber: changeNumber,
      email,
      locationCity,
      locationState,
    };

    console.log(updateData);
    // return;
    updateChanges(updateData);
  }
  function updateBusinessInformation(e) {
    e.preventDefault();

    if (userProfile.role !== 1) {
      return toast.info("Account don`t have access to this profile section");
    }

    let introduction,
      companyName,
      officeLocation,
      YearsOfExperience,
      refereeName,
      refereeNumber;

    introduction = e.target[0].value;

    if (editProfileFormData.companyName === "") {
      companyName = e.target[1].placeholder;
    } else {
      companyName = editProfileFormData.companyName;
    }
    if (editProfileFormData.officeLocation === "") {
      officeLocation = e.target[2].placeholder;
    } else {
      officeLocation = editProfileFormData.officeLocation;
    }
    if (editProfileFormData.YearsOfExperience === "") {
      YearsOfExperience = e.target[3].placeholder;
    } else {
      YearsOfExperience = editProfileFormData.YearsOfExperience;
    }
    if (editProfileFormData.refereeName === "") {
      refereeName = e.target[4].placeholder;
    } else {
      refereeName = editProfileFormData.refereeName;
    }
    if (editProfileFormData.refereeNumber === "") {
      refereeNumber = e.target[4].placeholder;
    } else {
      refereeNumber = editProfileFormData.refereeNumber;
    }

    let updateData = {
      introduction,
      companyName,
      officeLocation,
      YearsOfExperience,
      refereeName,
      refereeNumber,
    };
    // console.log(updateData);
    // return;
    // console.log(updateData);
    updateChanges(updateData);
  }

  function updatePassword(e) {
    e.preventDefault();

    if (editPasswordPrev === "") {
      return toast.info("fill Previous password");
    }
    if (editPasswordNew === "") {
      return toast.info("fill New password");
    }
    if (editPasswordConNew === "") {
      return toast.info("fill confirm New password");
    }
    if (editPasswordNew !== editPasswordConNew) {
      return toast.error(
        "New Password and Confirm New Password not co-responding"
      );
    }

    // console.log("Data", data);
    // axios PUT request
    const options = {
      // url: `http://localhost:5000/api/auth/user/login`,
      url: `${apiUrl}/users/password`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: {
        oldPassword: editPasswordPrev,
        newPassword: editPasswordNew,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.ok) {
          toast.success("Successful");
          getUserProfile();
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

  function updateProfilePicture(img) {
    setImg_url(img);
    updatePicture(img);
  }
  return (
    <div className="col-xl-12 ">
      <div className="row">
        <div className="col-xl-6 col-md-6 px-1">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">User Profile</h4>
            </div>
            <div className="card-body">
              {/* <form method="post"> */}
              {/* <div className="row">
                <div className="mb-3 col-xl-12">
                  <div className="d-flex align-items-center mb-3">
                    {/* image preview * /}
                    <img
                      className="me-3 rounded-circle me-0 me-sm-3"
                      src={
                        img_url === ""
                          ? "https://assets.darbtoken.com/backend/images/profile/2.png"
                          : img_url
                      }
                      width="50"
                      height="50"
                      alt=""
                    />
                    <div className="flex-grow-1">
                      {/* <h5 className="mb-0">Josiah Victor</h5> * /}
                      <sup className="mb-0">Max file size is 20mb</sup>
                    </div>
                  </div>
                  <div className="file-upload-wrapper" data-text="Change Photo">
                    <input
                      name="file-upload-field"
                      type="file"
                      className="file-upload-field"
                      onChange={(e) => imageHandler(e)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-success px-4"
                    onClick={() => uploadImageToCloudinary()}
                  >
                    Upload Picture
                  </button>

                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    href="#profilePictureModalToggle"
                    role="button"
                  >
                    Upload Picture
                  </button>
                </div>
              </div> */}

              <CloudinaryUploadProfileButton
                formComplete={true}
                avatar={img_url}
                updateProfilePicture={updateProfilePicture}
              />
              {/* <!-- </form> --> */}
              {/* </form> */}
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 px-1">
          <div className="card mt-3 mt-md-0">
            <div className="card-header">
              <h4 className="card-title">Change Password</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => updatePassword(e)}>
                <div className="row">
                  <div className="mb-3 col-xl-12">
                    <label className="form-label">Previous Password</label>
                    <input
                      type="password"
                      name="prevPassword"
                      value={editPasswordPrev}
                      onChange={(e) => setEditPasswordPrev(e.target.value)}
                      className="form-control"
                      placeholder="**********"
                    />
                    {/* <!-- <p className="mt-2 mb-0">Enable two factor authencation on the securitypage</p> --> */}
                  </div>
                  {editPasswordPrev === "" ? null : (
                    <>
                      {" "}
                      <div className="mb-3 col-xl-12">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={editPasswordNew}
                          onChange={(e) => setEditPasswordNew(e.target.value)}
                          className="form-control"
                          placeholder="**********"
                        />
                        {/* <!-- <p className="mt-2 mb-0">Enable two factor authencation on the securitypage</p> --> */}
                      </div>
                      {editPasswordNew === "" ? null : (
                        <div className="mb-3 col-xl-12">
                          <label className="form-label">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirm_password"
                            value={editPasswordConNew}
                            onChange={(e) =>
                              setEditPasswordConNew(e.target.value)
                            }
                            className="form-control"
                            placeholder="**********"
                          />
                          {/* <!-- <p className="mt-2 mb-0">Enable two factor authencation on the securitypage</p> --> */}
                        </div>
                      )}
                    </>
                  )}
                  <div className="col-12">
                    <button
                      className="btn btn-success px-4"
                      type="submit"
                      name="update_pass"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-12 my-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Personal Information</h4>
            </div>
            <div className="card-body">
              <form
                method="post"
                onSubmit={(e) => updatePersonalInformation(e)}
              >
                <div className="row">
                  <div className="text-info">
                    FIll only the Fields you want to Update
                  </div>
                  {/* <div className="mb-3 col-xl-6 col-md-6 px-1">
                    <label className="form-label">
                      National Identity Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={userProfile.Nin}
                      value={editProfileFormData.Nin}
                      onChange={(e) => handleChange(e)}
                      name="Nin"
                    />
                  </div> */}
                  <div className="mb-3 col-xl-6 col-md-6 px-1">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editProfileFormData.fullName}
                      onChange={(e) => handleChange(e)}
                      placeholder={userProfile.fullName}
                      name="fullName"
                    />
                  </div>
                  <div className="mb-3 col-xl-6 col-md-6 px-1">
                    <label className="form-label">Phone Number</label>
                    <div className="d-flex">
                      <input
                        className="form-control w-25 ps-1 px-0"
                        type={"text"}
                        value="+234"
                        readOnly
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={editProfileFormData.phoneNumber}
                        onChange={(e) => handleChange(e)}
                        name="phoneNumber"
                        placeholder={`+${userProfile.phoneNumber}`}
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-xl-6 col-md-6 px-1">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editProfileFormData.email}
                      onChange={(e) => handleChange(e)}
                      placeholder={userProfile.email}
                      name="email"
                    />
                  </div>
                  <div className="mb-3 col-xl-6 col-md-6 px-1">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editProfileFormData.locationCity}
                      onChange={(e) => handleChange(e)}
                      placeholder={userProfile.locationCity}
                      name="locationCity"
                    />
                  </div>
                  <div className="mb-3 col-xl-6 col-md-6 px-1">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editProfileFormData.locationState}
                      onChange={(e) => handleChange(e)}
                      placeholder={userProfile.locationState}
                      name="locationState"
                    />
                  </div>
                  <div className="mb-3 col-12">
                    <button
                      className="btn btn-success px-4"
                      type="submit"
                      name="update_data"
                      // onClick={() => updatePersonalInformation()}
                    >
                      Update Information
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {userProfile.role === 1 ? (
          <>
            <div className="card  my-3">
              <div className="card-header py-3 fw-bold"> Business Info</div>
              <div className="card-body">
                <div className=" w-100 py-2">
                  <form
                    className=" my-5 px-0"
                    onSubmit={(e) => updateBusinessInformation(e)}
                  >
                    {/* <div className="d-flex"> */}
                    <label htmlFor="" className="w-100">
                      Tell us about the service you render
                      <textarea
                        name="introduction"
                        className="form-control"
                        cols="15"
                        rows="3"
                        value={editIntroduction}
                        placeholder={userProfile.introduction}
                        onChange={(e) => setEditIntroduction(e.target.value)}
                      ></textarea>
                    </label>

                    <div className="d-flex flex-column flex-md-row">
                      <label className="w-100  mx-0 mx-md-1 my-3">
                        Company Name
                        <input
                          type="text"
                          className="form-control"
                          name="companyName"
                          placeholder={userProfile.companyName}
                          value={editProfileFormData.companyName}
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                      <label className="w-100 mx-0 mx-md-1 my-3">
                        office address
                        <input
                          type="text"
                          className="form-control"
                          name="officeLocation"
                          placeholder={userProfile.officeLocation}
                          value={editProfileFormData.officeLocation}
                          onChange={(e) => handleChange(e)}
                        />
                      </label>

                      <label className="w-50 w-md-100  mx-0 mx-md-1 my-3">
                        Year of experience
                        <input
                          type="number"
                          className="form-control"
                          name="YearsOfExperience"
                          placeholder={userProfile.YearsOfExperience}
                          value={editProfileFormData.YearsOfExperience}
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>
                    <div className="d-flex flex-column flex-md-row">
                      <label className="w-100  mx-0 mx-md-1 my-3" htmlFor="">
                        Referee Name
                        <input
                          type="text"
                          className="form-control"
                          name="refereeName"
                          placeholder={userProfile.refereeName}
                          value={editProfileFormData.refereeName}
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                      <label className="w-100  mx-0 mx-md-1 my-3" htmlFor="">
                        Referee Number
                        <input
                          type="number"
                          className="form-control"
                          name="refereeNumber"
                          placeholder={userProfile.refereeNumber}
                          value={editProfileFormData.refereeNumber}
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>
                    <button className="btn btn-success">
                      Update Business Information
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function ProfileSubscriptionAlertCard({ userProfile }) {
  return (
    <>
      {" "}
      {userProfile.role === 1 ? (
        <>
          <div className="alert alert-info d-flex justify-content-between flex-column flex-md-row">
            <span className="my-auto">
              <FaInfoCircle className="my-auto" />{" "}
              {userProfile.subscriptionExpired ? (
                <>Your Account Subscription has expired</>
              ) : (
                <>
                  This account is on
                  {userProfile.freeAccount ? (
                    <> free trial (You can only be hired 5 times)</>
                  ) : (
                    <>
                      <b> {userProfile.accountPlan.name}</b> Subscription
                    </>
                  )}
                </>
              )}{" "}
            </span>
            {/* ============================= open Subscription modal button =============================== */}
            {userProfile.freeAccount || userProfile.subscriptionExpired ? (
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                href="#paymentModalToggle"
                role="button"
              >
                Buy Subscription
              </button>
            ) : null}
            {/* ===================================== </> ================================================= */}
          </div>
        </>
      ) : null}
    </>
  );
}
export function ProfileSVerificationAlertCard({ userProfile }) {
  return (
    <>
      {!userProfile.account_verified ? (
        <div className="alert alert-info d-flex justify-content-between flex-column flex-md-row">
          <span
            className="
          my-auto w-100 w-md-75"
          >
            <FaInfoCircle className="my-auto" /> Account Has not been verified,
            if verification is taking more than 24 - 48 Hrs contact an admin
          </span>
          <Link to={"/contact-us"} className="btn btn-primary  mt-3 my-md-auto">
            Contact Us
          </Link>
        </div>
      ) : null}
    </>
  );
}