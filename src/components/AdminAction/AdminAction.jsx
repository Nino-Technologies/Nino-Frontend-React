import axios from "axios";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

function AdminAction({
  role,
  _id,
  reLoadListFunction,
  account_verified,
  account_active,
  setArtisanProfile,
  artisan,
  setProfileNumber,
  phoneNumber,
}) {
  const [actionLoading, setActionLoading] = useState(false);
  const [cookies] = useCookies();
  const { apiUrl } = useContext(UserContext);

  const { token } = cookies.grinderUser;

  async function adminActionFunction(action, role, id) {
    if (!action || action === "") {
      return toast.info("Require action");
    }
    if (role === "") {
      return toast.info("Require role");
    }
    if (!id || id === "") {
      return toast.info("Require id");
    }
    // console.log(adminToken);
    // console.log(action, role, id);

    setActionLoading(true);

    const data = {
      id: id,
    };
    // axios POST request
    const options = {
      // url: `http://localhost:5000/api/adminAction/${action}/${role}`,
      url: `${apiUrl}/adminAction/${action}/${role}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
      data: data,
    };

    axios(options)
      .then((response) => {
        reLoadListFunction();
        toast.success(`User is now ${action}`);
        setActionLoading(false);
      })
      .catch((error) => {
        setActionLoading(false);
        // console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }

  return (
    <div className="btn-group" role="group">
      {/* // hide button; it will be clicked with js */}
      <button
        type="button"
        id="open_EditProfileModel"
        style={{ display: "none" }}
        data-bs-toggle="modal"
        data-bs-target="#EditProfileModel"
      ></button>
      <button
        type="button"
        id="open_SendMessage"
        style={{ display: "none" }}
        data-bs-toggle="modal"
        data-bs-target="#SendMessage"
      ></button>
      <button
        id="btnGroupDrop1"
        type="button"
        className="btn btn-primary btn-sm dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {actionLoading ? "Loading..." : "Action"}
      </button>
      <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
        <li
          className="dropdown-item"
          onClick={() => {
            setProfileNumber(phoneNumber);

            window.document.getElementById("open_SendMessage").click();
          }}
        >
          Send Message to user
        </li>
        {role == 1 ? (
          <>
            {" "}
            <li
              className="dropdown-item"
              onClick={() => {
                setArtisanProfile(artisan);
                window.document.getElementById("open_EditProfileModel").click();
              }}
            >
              Edit Profile
            </li>
          </>
        ) : null}
        {account_verified ? (
          <>
            <li
              className="dropdown-item"
              onClick={() => {
                adminActionFunction("unVerify", role, _id);
              }}
            >
              UnVerify Account
            </li>
          </>
        ) : (
          <>
            <li
              className="dropdown-item"
              onClick={() => {
                console.log(artisan);
                adminActionFunction("verify", role, _id);
              }}
            >
              Verify Account
            </li>
          </>
        )}
        {account_active ? (
          <>
            <li
              className="dropdown-item"
              onClick={() => {
                adminActionFunction("block", role, _id);
              }}
            >
              Block Account
            </li>
          </>
        ) : (
          <>
            {" "}
            <li
              className="dropdown-item"
              onClick={() => {
                adminActionFunction("activate", role, _id);
              }}
            >
              Activate Account
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default AdminAction;
