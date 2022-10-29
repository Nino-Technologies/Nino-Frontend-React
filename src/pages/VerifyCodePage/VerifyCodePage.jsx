import React, { useContext, useState } from "react";
import "./VerifyCodePage.scss";
import Nav from "../../components/Nav/Nav";
import VerifyCodeSearch from "../../components/VerifyCodeSearch/VerifyCodeSearch";
// import { Link } from "react-router-dom";
import { UserContext } from "./../../context/UserContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyCodePage() {
  const { loggedIn, apiUrl } = useContext(UserContext);
  const { email } = useParams();
  const [confirmEmail, setConfirmEmail] = useState(false);

  function sendOtp() {
    setConfirmEmail(true);
    const options = {
      url: `${apiUrl}/sendMail/otp`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { to: email },
    };

    axios(options)
      .then((response) => {
        console.log(response.data);
        if (response.data.ok) {
          toast.success("OTP Successful sent");
        }
        // navigate("/login?as=user");
        // navigate("/verify-code");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  //   console.log(email);
  return (
    <div className="verify-section">
      <Nav />
      <div className="container">
        <div className="search-text">
          <h1 className="verify-name">Verification Code</h1>
          {confirmEmail ? (
            <>
              <VerifyCodeSearch email={email} />
              <button
                className="mt-2 btn btn-primary"
                onClick={() => sendOtp()}
              >
                resend
              </button>
            </>
          ) : (
            <>
              Verification Code will be sent <b>{email}</b>, confirm if it is
              correct <br />
              <button
                onClick={() => sendOtp()}
                className="mt-3 btn btn-primary"
              >
                Confirm
              </button>
            </>
          )}
          <div className="mt-5">
            {loggedIn ? (
              <Link to={"/dashboard/profile"}>Cancel</Link>
            ) : (
              <Link to={"/login?as=artisan"}>Skip</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCodePage;
