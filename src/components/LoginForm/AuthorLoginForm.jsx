import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";

function AuthorLoginForm() {
  const [loading, setLoading] = useState(false);
  const { setLoggedIn, setUserProfile, apiUrl } = useContext(UserContext);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  async function loginUserFunction(e) {
    e.preventDefault();

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

    setLoading(true);
    const data = {
      email: formElement[0].value,
      password: formElement[1].value,
    };
    // console.log(data);
    // axios POST request
    const options = {
      // url: `http://localhost:5000/api/auth/admin/login`,
      url: `${apiUrl}/auth/author/login`,
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
        const userProfile = response.data.author;
        const cookies = {
          profile: userProfile,
          token: userToken,
        };
        // console.log(userProfile);
        setUserProfile(userProfile);
        let expiresDate = "86400000"; // A day after
        setCookie("grinderUser", cookies, {
          path: "/",
          maxAge: expiresDate,
        });
        toast.success("Welcome Back Author");

        navigate("/dashboard/author");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }
  return (
    <form className="form-layout px-5" onSubmit={(e) => loginUserFunction(e)}>
      <h3 className="login-name">Author only</h3>
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

      <div className="">
        <label htmlFor="exampleInputPassword1" className="form-label"></label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
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
      <sup className="mt-4 d-block">
        If you have a login issue contact the admin
      </sup>
    </form>
  );
}

export default AuthorLoginForm;
