import React, { useEffect, useState } from "react";
import ArtisanRegistrationForm from "../../components/RegistrationForm/ArtisanRegistrationForm";
import "./LoginPage.scss";
import UserRegistrationForm from "../../components/RegistrationForm/UserRegistrationForm";
import { Link, useSearchParams } from "react-router-dom";
import UserLoginForm from "../../components/LoginForm/UserLoginForm";
import ArtisanLoginForm from "../../components/LoginForm/ArtisanLoginForm";
import { FaArrowLeft } from "react-icons/fa";

function LoginPage() {
  const [displayForm, setDisplayForm] = useState(-1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("as") === "user") {
      return setDisplayForm(1);
    }
    if (searchParams.get("as") === "artisan") {
      return setDisplayForm(2);
    }
    console.log("Invalid login request");
  }, [searchParams]);
  return (
    <div className="LoginPage">
      <div class="login">
        <div class="form-section">
          <BackComponent />
          <div class="container">
            {displayForm === 1 ? (
              <UserLoginForm />
            ) : (
              <>
                {" "}
                {displayForm === 2 ? (
                  <ArtisanLoginForm />
                ) : (
                  <>Invalid Login Request</>
                )}
              </>
            )}{" "}
            <br />
            {displayForm === -1 ? (
              <>
                Do You Want To
                <Link to={"/register?as=artisan"}>Register As An Artisan</Link>
                <Link to={"/register?as=user"}>Register As An User</Link>
                {/* <hr className="w-100" /> */}
                OR
                <Link to={"/login?as=artisan"}>Login As An Artisan</Link>
                <Link to={"/login?as=user"}>Login As An User</Link>
              </>
            ) : null}
          </div>
        </div>
        <div class="image-body">
          {/* <!-- <img src="https://images.unsplash.com/photo-1550147760-44c9966d6bc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80" alt=""> --> */}
          <div class="container">
            <div class="m-box">
              <h1>Welcome Back!</h1>
              <p>Login and let's get connected with your clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

export function BackComponent() {
  return (
    <Link to={"/"} className="BackComponent">
      <FaArrowLeft />
    </Link>
  );
}
