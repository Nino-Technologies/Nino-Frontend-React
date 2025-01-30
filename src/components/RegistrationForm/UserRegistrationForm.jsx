import React, { useContext, useState } from "react";
// import SocialLogin from "../LoginForm/SocialLogin.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext.jsx";

function UserRegistrationForm({ saveAccountType }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);

  async function registerUserFunction(e) {
    e.preventDefault();

    const formElement = e.target;

    if (formElement[0].value === "") {
      return toast.info("Full Name is Required");
    }
    if (formElement[1].value === "") {
      return toast.info("Email is Required");
    }
    if (formElement[2].value === "") {
      return toast.info("Phone Number is Required");
    }
    if (formElement[3].value === "") {
      return toast.info("Password is Required");
    }
    // if (formElement[1].value === "" || formElement[0].value === "") {
    //   return;
    // }

    const data = {
      fullName: formElement[0].value,
      email: formElement[1].value,
      phoneNumber: formElement[2].value,
      password: formElement[3].value,
    };

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

    axios(options)
      .then((response) => {
        console.log(response.data);
        toast.success("Registration Successful");
        // navigate("/login?as=user");
        saveAccountType();
        navigate(`/verify-code/${data.email}`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });

    // const rawResponse = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const content = await rawResponse.json();

    // console.log(content);
  }
  return (
    <form
      className="form-layout px-5"
      onSubmit={(e) => registerUserFunction(e)}
    >
      <h3 className="login-name">Register User</h3>
      <div className="pt-3">
        <input type="textx" className="form-control" placeholder="Full name" />
      </div>
      <div className=" mt-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
        />
      </div>
      <div className=" mt-3">
        <input
          type="number"
          className="form-control"
          placeholder="Phone Number"
        />
      </div>

      <div className="mt-3">
        {/* <label htmlFor="exampleInputPassword1" className="form-label">
          
        </label> */}
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-3 w-100"
        disabled={loading}
      >
        {!loading ? <> Submit</> : <>Loading...</>}
      </button>
      <div className="form-text mt-3">
        <div>
          have an account? <br />
          <div className="d-flex justify-content-around mt-3 flex-colum n">
            <Link to={"/login?as=user"} className="btn btn-outline-primary">
              Login User
            </Link>{" "}
            <span className="my-auto">OR</span>
            <Link
              to={"/register?as=artisan"}
              className="btn btn-outline-primary"
            >
              Register as a service provider
            </Link>
          </div>
        </div>
      </div>

      {/* <SocialLogin /> */}
    </form>
  );
}

export default UserRegistrationForm;
