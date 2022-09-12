import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./ProfilePage.scss";

function ProfilePage() {
  const [editForm, setEditForm] = useState(false);
  const { userProfile } = useContext(UserContext);
  // console.log(userProfile);
  return (
    <div className="ProfilePage">
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
        <div className="form-div ">
          <form className=" my-5">
            <div className="d-flex">
              <label className="w-100 mx-3 my-3" htmlFor="">
                social ID
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.socialId || "Social ID"}
                  disabled={!editForm}
                  // value={userProfile.socialId || "Social ID"}
                />
              </label>
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
            <div className="d-flex">
              <label className="w-100 mx-3 my-3" htmlFor="">
                Role
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.role}
                  disabled={!editForm}
                  // value={userProfile.role}
                />
              </label>
              <label className="w-100 mx-3 my-3" htmlFor="">
                Joined Date
                <input
                  type="text"
                  className="form-control"
                  placeholder={userProfile.joinDate}
                  disabled={!editForm}
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
    </div>
  );
}

export default ProfilePage;
