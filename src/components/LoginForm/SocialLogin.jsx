import axios from "axios";
import React, { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import {UserContext} from "../../context/UserContext";
import "./SocialLogin.scss";

function SocialLogin() {
  const { apiUrl } = useContext(UserContext);
  // const apiUrl = "http://localhost:5000/api/auth/";

  async function loginWithFacebook(e) {
    e.preventDefault();
    //   const res = await axios({
    //     method: 'post',
    //     url: url,
    //     headers: { Authorization: "<Generated Bearer Token>"},
    //     data: {
    //     }
    // })
    // const res = await axios({
    //   method: "get",
    //   url: `${apiUrl}/google`,
    // });
    // console.log(res);
    toast.info("currently unavailable, use Auth form ");
  }
  async function loginWithGoogle(e) {
    e.preventDefault();
    toast.info("currently unavailable, use Auth form ");
    // console.log("Google Auth ...");
    // const res = await axios({
    //   method: "get",
    //   url: `${apiUrl}/google`,
    // });

    // console.log(res);
  }
  return (
    <div className="social-login-div mt-4">
      <div className="divider d-flex flex-col umn justify-content-around">
        <hr className="w-25 my-auto" />
        {/* Login with */}
        <hr className="w-25 my-auto" />
      </div>
      <div className="d-flex justify-content-around mt-2 flex-column flex-md-row">
        <button
          className="btn btn-primary mx-1 mb-2 mb-md-0"
          onClick={(e) => loginWithFacebook(e)}
        >
          <FaFacebook /> Login with FaceBook
        </button>
        <button
          className="btn btn-primary mx-1 mt-2 mt-md-0"
          onClick={(e) => loginWithGoogle(e)}
        >
          <FaGoogle /> Login with Google
        </button>
      </div>
    </div>
  );
}

export default SocialLogin;
