import React, { useState } from "react";
import SocialLogin from "../LoginForm/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function registerUserFunction(e) {
    e.preventDefault();
    const apiUrl = "http://localhost:5000/api/auth/user/register";

    const formElement = e.target;

    if (formElement[0].value === "") {
      toast.info("Email is Required");
    }
    if (formElement[1].value === "") {
      toast.info("Password is Required");
    }
    if (formElement[1].value === "" || formElement[0] === "") {
      return;
    }

    const data = {
      email: formElement[0].value,
      password: formElement[1].value,
    };

    // axios POST request
    const options = {
      url: apiUrl,
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
        navigate("/login?as=user");
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
      <div className="">
        {/* <label htmlFor="exampleInputEmail1" className="form-label">
      
        </label> */}
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
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
          <div className="d-flex justify-content-around mt-3">
            <Link to={"/login?as=user"} className="btn btn-outline-primary">
              Login As An User
            </Link>{" "}
            <span className="my-auto">OR</span>
            <Link
              to={"/register?as=artisan"}
              className="btn btn-outline-primary"
            >
              Register As An Artisan
            </Link>
          </div>
        </div>
        {/* <div>
          <Link to={"/register?as=artisan"}>Register As An Artisan</Link>
          <br />
          have an account? <Link to={"/login?as=user"}>Login As An User</Link>
        </div> */}
      </div>

      <SocialLogin />
    </form>
  );
}

export default UserRegistrationForm;
