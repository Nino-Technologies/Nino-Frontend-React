import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="BackButton">
      <button className="btn btn-sm p-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
      </button>
    </div>
  );
}

export default BackButton;
export function SkipButton() {
  const navigate = useNavigate();
  return (
    <div className="SkipButton">
      <button
        className="btn btn-outline-primary btn-sm p-3"
        onClick={() => {
          let accountType = sessionStorage.getItem("accountType");
          navigate(`/login?as=${accountType}`);
        }}
      >
        Skip Verification
      </button>
    </div>
  );
}
export function ForgotPasswordLink() {
  return (
    <div className="ForgotPasswordLink">
      <Link to={"/password-reset"} className="m-2 d-block">
        Forgot Password?
      </Link>
    </div>
  );
}

