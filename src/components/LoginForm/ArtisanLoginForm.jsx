import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function ArtisanLoginForm() {
  const [loading, setLoading] = useState(false);
  const { setLoggedIn, setUserProfile, apiUrl } = useContext(UserContext);
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  async function loginUserFunction(e) {
    e.preventDefault();

    const formElement = e.target;

    if (formElement[0].value === "") {
      toast.info("Email is Required");
    }
    if (formElement[1].value === "") {
      toast.info("Password is Required");
    }
    if (formElement[1].value === "" || formElement[0].value === "") {
      return;
    }

    setLoading(true);
    const data = {
      email: formElement[0].value,
      password: formElement[1].value,
    };
    // axios POST request
    const options = {
      url: `${apiUrl}/auth/artisan/login`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: data,
    };

    axios(options)
      .then((response) => {
        setLoading(false);

        setLoggedIn(true);
        const userToken = response.data.token;
        const userProfile = response.data.user;
        const cookies = {
          profile: userProfile,
          token: userToken,
        };
        setUserProfile(userProfile);
        let expiresDate = "86400000"; // A day after
        setCookie("grinderUser", cookies, {
          path: "/",
          maxAge: expiresDate,
        });
        toast.success("Welcome Back Artisan");

        navigate("/dashboard/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  return (
    <form className="form-layout px-5" onSubmit={(e) => loginUserFunction(e)}>
      <h3 className="login-name">Login as a Service Provider</h3>
      <div className="">
        {/* <label htmlFor="exampleInputEmail1" className="form-label">
          
        </label> */}
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email address"
        />
      </div>

      <div className="mt-3">
        {/* <label htmlFor="exampleInputPassword1" className="form-label">
          
        </label> */}
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <Link to={"/password-reset"} className="m-2 d-block">
        Forgot Password?
      </Link>

      <button
        type="submit"
        className="btn btn-primary mt-3 w-100"
        disabled={loading}
      >
        {!loading ? <> Submit</> : <>Loading...</>}
      </button>
      <div className="form-text mt-3">
        <div>
          {/* Don't have an account? <br /> */}
          <div className="d-flex justify-content-around mt-3">
            <Link
              to={"/register?as=artisan"}
              className="btn btn-outline-primary"
            >
              Register as a Service Provider
            </Link>
            <span className="my-auto">OR</span>
            <Link to={"/login?as=user"} className="btn btn-outline-primary">
              Login User
            </Link>{" "}
          </div>
        </div>
      </div>
    </form>
  );
}

export default ArtisanLoginForm;
