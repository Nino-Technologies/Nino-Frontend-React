import React, { useContext } from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./PasswordResetForm.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function PasswordReset() {
  const [passwordTab, setPasswordTab] = useState(1);
  const [email, setEmail] = useState("");
  const [Otp, setOtp] = useState("");

  return (
    <div className="reset">
      <div className="container house-div">
        {passwordTab === 1 ? (
          <PasswordResetEmailForm
            setPasswordTab={setPasswordTab}
            email={email}
            setEmail={setEmail}
          />
        ) : null}
        {passwordTab === 2 ? (
          <PasswordResetOTPForm
            setPasswordTab={setPasswordTab}
            Otp={Otp}
            setOtp={setOtp}
            email={email}
          />
        ) : null}
        {passwordTab === 3 ? (
          <PasswordResetForm setPasswordTab={setPasswordTab} email={email} />
        ) : null}
      </div>
    </div>
  );
}

export function PasswordResetEmailForm({ setPasswordTab, email, setEmail }) {
  const { apiUrl } = useContext(UserContext);
  function sendPasswordOTP() {
    if (email === "") {
      return toast.info("Email is required");
    }
    const options = {
      url: `${apiUrl}/sendMail/otp`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { to: email },
    };
    // console.log(email);
    // return;
    axios(options)
      .then((response) => {
        console.log(response);
        if (response.data.ok) {
          toast.success("OTP Successful sent");
          setPasswordTab(2);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  return (
    <div className="py-5 px-5 shadow">
      <h3 className="pb-4">Enter Account Email</h3>
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <sup className="text-info">Make sure it is the email on your account</sup>
      <button
        className="rounded btn btn-primary w-100"
        onClick={() => {
          sendPasswordOTP();
        }}
      >
        Send OTP
      </button>
    </div>
  );
}
export function PasswordResetOTPForm({ setPasswordTab, Otp, setOtp, email }) {
  const { apiUrl } = useContext(UserContext);
  async function verifyEmailFunction() {
    if (Otp === "") {
      toast.info("Fill verification code");
      return;
    }

    const otp = Otp;
    const data = {
      otp: otp,
      to: email,
    };

    // console.log(data);
    // return;
    // console.log(data);
    // axios POST request
    const options = {
      url: `${apiUrl}/verifyOtp/email/password`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: data,
    };

    axios(options)
      .then((response) => {
        console.log(response.data);
        toast.success("Verification Successful");
        setPasswordTab(3);
      })
      .catch((error) => {
        return toast.error(error.response.data.message);
      });
  }
  return (
    <div className="py-5 px-5 shadow">
      <button className=" rounded py-1" onClick={() => setPasswordTab(1)}>
        <FaArrowLeft /> Back
      </button>
      <h3 className="py-4">Enter OTP</h3>
      <input
        type="number"
        class="form-control mb-4"
        placeholder="OTP"
        value={Otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className=" w-100 rounded btn btn-primary"
        onClick={() => {
          verifyEmailFunction();
        }}
      >
        Verify OTP
      </button>
    </div>
  );
}
export function PasswordResetForm({ setPasswordTab, email }) {
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  function updatePassword() {
    if (password === "") {
      return toast.info("fill New password");
    }
    if (cPassword === "") {
      return toast.info("fill confirm New password");
    }
    if (cPassword !== password) {
      return toast.info("Password not match");
    }

    const options = {
      url: `${apiUrl}/verifyOtp/email/password/reset`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        email: email,
        password: password,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.ok) {
          toast.success("Password updated");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  return (
    <div className="py-5 px-5 shadow">
      <button className=" rounded py-1" onClick={() => setPasswordTab(1)}>
        <FaArrowLeft /> Back
      </button>
      <h3 className="py-4">Reset Password</h3>
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        class="form-control mb-4"
        placeholder="Confirm Password"
        value={cPassword}
        onChange={(e) => setCPassword(e.target.value)}
      />
      <button
        className=" w-100 rounded btn btn-primary"
        onClick={() => updatePassword()}
      >
        Change
      </button>
    </div>
  );
}
