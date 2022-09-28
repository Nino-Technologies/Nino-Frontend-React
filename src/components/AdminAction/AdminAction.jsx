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
    <div class="btn-group" role="group">
      <button
        id="btnGroupDrop1"
        type="button"
        class="btn btn-primary btn-sm dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {actionLoading ? "Loading..." : "Action"}
      </button>
      <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
        {account_verified ? (
          <>
            <li
              class="dropdown-item"
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
              class="dropdown-item"
              onClick={() => {
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
              class="dropdown-item"
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
              class="dropdown-item"
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
