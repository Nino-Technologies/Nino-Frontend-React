import React, { useContext, useState }, { useContext, useState } from "react";
import "./VerifyCodeSearch.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import VerifyCodeFail from "../../components/VerifyCodeFail/VerifyCodeFail";
import VerifyCodeSuccess from "../../components/VerifyCodeSuccess/VerifyCodeSuccess";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function VerifyCodeSearch() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);

  async function verifyEmailFunction(e) {
    e.preventDefault();

    const formElement = e.target;

    if (
      formElement[0].value === "" ||
      formElement[1].value === "" ||
      formElement[2].value === "" ||
      formElement[3].value === ""
    ) {
      toast.info("Fill verification code");
      return;
    }

    const otp =
      formElement[0].value +
      formElement[1].value +
      formElement[2].value +
      formElement[3].value;
    const data = {
      otp: otp,
      email: "test email",
    };

    console.log(data);
    // axios POST request
    const options = {
      url: `${apiUrl}/auth/user/register`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: data,
    };

    // axios(options)
    //   .then((response) => {
    //     console.log(response.data);
    //     toast.success("Registration Successful");
    //     // navigate("/login?as=user");
    //     navigate("/verify-code");
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 400) {
    //       return toast.error(error.response.data.message);
    //     }
    //     toast.error(error.message);
    //   });
  }
  return (
    <div className="verify">
      <form
        className="container"
        onSubmit={(e) => {
          verifyEmailFunction(e);
        }}
      >
        <div className="form">
          <input type="number" className="form-control" />
          <input type="number" className="form-control" />
          <input type="number" className="form-control" />
          <input type="number" className="form-control" />
        </div>
        <button type="submit">Verify</button>
        <br />
        <button type="button">Resend code</button>
      </form>
    </div>
  );
}

export default VerifyCodeSearch;

