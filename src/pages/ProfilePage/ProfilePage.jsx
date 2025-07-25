import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCogs, FaInfoCircle, FaUser, FaUserCheck } from "react-icons/fa";
// import { PaymentModalComponent } from "../../components/Modal/ModalComponent.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import "./ProfilePage.scss";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import VerifiedBadge from "../../components/verifiedBadge/verifiedBadge.jsx";
import { Link } from "react-router-dom";
import CloudinaryUploadProfileButton from "../../components/CloudnaryUploadButton/CloudnaryUploadButton.jsx";
{
  /*!!!!!!!!!!!!!!!!!!!!!!!!! do not remove any commented code on this page !!!!!!!!!!!!!!!!!!!!! */
}
// clouldnary
// oyieaesl
// dhvacnvek

function ProfilePage() {
  // const [editForm, setEditForm] = useState(false);
  const { userProfile, decodeDate, apiUrl, getUserProfile } =
    useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(1);
  // useEffect(() => {
  //   getUserProfile();
  // }, [getUserProfile]);
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
    if (role === -1) return "Author";
    if (role === 0) return "User";
    if (role === 1) return "Artisan";
    if (role === 3) return "Admin";
    return "Unknown";
  }
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row align-items-center mb-4">
                <img
                  src={userProfile.avatar || "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png"}
                  alt="Profile Avatar"
                  className="rounded-circle border shadow"
                  style={{ width: 120, height: 120, objectFit: 'cover', marginRight: 32 }}
                />
                <div className="flex-grow-1 text-center text-md-start mt-3 mt-md-0">
                  <h2 className="fw-bold mb-1">{userProfile.fullName}</h2>
                  <div className="mb-2">
                    <span className="badge bg-primary me-2">{getAccountType(userProfile.role)}</span>
                    {userProfile.account_verified ? (
                      <span className="badge bg-success">Verified</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Not Verified</span>
                    )}
                  </div>
                  <div className="text-muted small">
                    Joined: {decodeDate(userProfile.joinDate)}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-envelope me-2"></i>
                    <span className="fw-bold">Email:</span>
                    <span className="ms-2">{userProfile.email}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone me-2"></i>
                    <span className="fw-bold">Phone:</span>
                    <span className="ms-2">+{userProfile.phoneNumber}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-geo-alt me-2"></i>
                    <span className="fw-bold">Location:</span>
                    <span className="ms-2">{userProfile.locationCity}, {userProfile.locationState}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-wallet2 me-2"></i>
                    <span className="fw-bold">Wallet:</span>
                    <span className="ms-2 text-success">₦{userProfile.wallet?.toLocaleString() || 0}</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-building me-2"></i>
                    <span className="fw-bold">Office:</span>
                    <span className="ms-2">{userProfile.officeLocation || 'N/A'}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-person-badge me-2"></i>
                    <span className="fw-bold">Gender:</span>
                    <span className="ms-2">{userProfile.gender}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-award me-2"></i>
                    <span className="fw-bold">Subscription:</span>
                    <span className="ms-2">
                      {userProfile.freeAccount ? (
                        <span className="badge bg-secondary">Free Trial</span>
                      ) : (
                        <span className="badge bg-info text-dark">{userProfile.accountPlan?.name || 'N/A'}</span>
                      )}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-calendar-check me-2"></i>
                    <span className="fw-bold">Account Active:</span>
                    <span className="ms-2">
                      {userProfile.account_active ? (
                        <span className="text-success">Active</span>
                      ) : (
                        <span className="text-danger">Inactive</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mb-4">
                <h5 className="fw-bold mb-2">About</h5>
                <p className="mb-1">{userProfile.introduction}</p>
                <div className="mb-2">
                  <span className="fw-bold">Service(s):</span> {userProfile.service}
                </div>
              </div>
              {userProfile.workImage && userProfile.workImage.length > 0 && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-2">Portfolio</h5>
                  <div className="row g-2">
                    {userProfile.workImage.map((img, idx) => (
                      <div className="col-6 col-md-4 col-lg-3" key={idx}>
                        <img
                          src={typeof img === 'string' ? img : img.image}
                          alt={`work-${idx}`}
                          className="img-fluid rounded shadow-sm border"
                          style={{ width: '100%', height: 120, objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-end">
                <Link to="/dashboard/profile?edit=true" className="btn btn-outline-primary">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export function ProfileCompletenessProgressBar() {
  const { profileProgress } = useContext(UserContext);
  return (
    <div className="progress" style={{ height: "30px" }}>
      <div
        className="progress-bar progress-bar-striped bg-info "
        role="progressbar"
        style={{ width: `${profileProgress}%` }}
      >
        {profileProgress}%
      </div>
    </div>
  );
}

export function ProfileCompletenessWhatLeftDropdown() {
  const { profileProgress, nonCompleted } = useContext(UserContext);
  return (
    <>
      {" "}
      {profileProgress !== 100 ? (
        <div className="dropdown mt-2">
          <button
            className="btn btn-outline-primary px-3 w-100 dropdown-toggle"
            type="button"
            id="whatLeftDropdownId"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            What is left?
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="whatLeftDropdownId"
            style={{ width: "200px" }}
          >
            {nonCompleted.map((item, index) => (
              <li className="ps-3" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}