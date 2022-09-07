import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function SocialLogin() {
  return (
    <div className="social-login-div mt-4">
      <div className="divider d-flex flex-col umn justify-content-around">
        <hr className="w-25 my-auto" />
        OR
        <hr className="w-25 my-auto" />
      </div>
      <div className="d-flex justify-content-around mt-2 flex-column flex-md-row">
        <button className="btn btn-primary mx-1 mb-2 mb-md-0">
          <FaFacebook /> FaceBook
        </button>
        <button className="btn btn-primary mx-1 mt-2 mt-md-0">
          <FaGoogle /> Google
        </button>
      </div>
    </div>
  );
}

export default SocialLogin;
