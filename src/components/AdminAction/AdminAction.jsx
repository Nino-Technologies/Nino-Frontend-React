import axios from "axios";
import React, { useContext } from "react";
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
    console.log(action, role, id);

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
      })
      .catch((error) => {
        // setLoading(false);
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
        Action
      </button>
      <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
        {account_verified ? (
          <>
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => {
                  // console.log("Verify Account: " + _id);
                  adminActionFunction("unVerify", role, _id);
                }}
              >
                UnVerify Account
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => {
                  // console.log("Verify Account: " + _id);
                  adminActionFunction("verify", role, _id);
                }}
              >
                Verify Account
              </a>
            </li>
          </>
        )}
        {account_active ? (
          <>
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => {
                  adminActionFunction("block", role, _id);
                }}
              >
                Block Account
              </a>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => {
                  // console.log("Verify Account: " + _id);
                  adminActionFunction("activate", role, _id);
                }}
              >
                Activate Account
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default AdminAction;
