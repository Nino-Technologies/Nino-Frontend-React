import { useContext, useState } from "react";
import "./VerifyCodeSearch.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import VerifyCodeFail from "../../components/VerifyCodeFail/VerifyCodeFail";
import VerifyCodeSuccess from "../../components/VerifyCodeSuccess/VerifyCodeSuccess";
// import { toast } from "react-toastify";

function VerifyCodeSearch({ email }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { apiUrl, loggedIn } = useContext(UserContext);

  async function verifyEmailFunction(e) {
    e.preventDefault();

    const formElement = e.target;

    if (formElement[0].value === "") {
      toast.info("Fill verification code");
      return;
    }

    const otp = formElement[0].value;
    const data = {
      otp: otp,
      to: email,
    };

    console.log(data);
    // axios POST request
    const options = {
      url: `${apiUrl}/verifyOtp/email`,
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
        {
          loggedIn
            ? navigate("/dashboard/profile")
            : navigate("/login?as=artisan");
        }
        // navigate("/verify-code");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  return (
    <div className="verify">
      <p className="sub">
        Enter Four digit verification code sent to your number or e-mail
      </p>
      <form
        className="container"
        onSubmit={(e) => {
          verifyEmailFunction(e);
        }}
      >
        <div className="form">
          <input
            type="number"
            className="form-control w-100 w-md-50"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <button type="submit">Verify</button>
        <br />
      </form>
    </div>
  );
}

export default VerifyCodeSearch;
