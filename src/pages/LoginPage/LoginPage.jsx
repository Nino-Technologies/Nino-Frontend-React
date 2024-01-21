import React, { useEffect, useState } from "react";
import ArtisanRegistrationForm from "../../components/RegistrationForm/ArtisanRegistrationForm";
import "./LoginPage.scss";
import UserRegistrationForm from "../../components/RegistrationForm/UserRegistrationForm";
import { Link, useSearchParams } from "react-router-dom";
import UserLoginForm from "../../components/LoginForm/UserLoginForm";
import ArtisanLoginForm from "../../components/LoginForm/ArtisanLoginForm";
import { FaArrowLeft } from "react-icons/fa";
import AdminLoginForm from "../../components/LoginForm/AdminLoginForm";
import AuthorLoginForm from "../../components/LoginForm/AuthorLoginForm";

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
    if (searchParams.get("as") === "admin") {
      return setDisplayForm(3);
    }
    if (searchParams.get("as") === "author") {
      return setDisplayForm(4);
    }
    console.log("Invalid login request");
  }, [searchParams]);
  return (
    <div className="LoginPage">
      <div className="login">
        <div className="form-section">
          <BackComponent />
          <div className="container">
            {displayForm === 1 ? (
              <UserLoginForm />
            ) : (
              <>
                {" "}
                {displayForm === 2 ? (
                  <ArtisanLoginForm />
                ) : (
                  <>
                    {" "}
                    {displayForm === 3 ? (
                      <AdminLoginForm />
                    ) : (
                      <>
                        {displayForm === 4 ? (
                          <AuthorLoginForm />
                        ) : (
                          <>Invalid Login Request</>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}{" "}
            <br />
            {displayForm === -1 ? (
              <>
                Do You Want To
                <Link to={"/register?as=artisan"}>
                  Register has a Service Provider{" "}
                </Link>
                {/* <Link to={"/register?as=user"}>Register User</Link> */}
                {/* <hr className="w-100" /> */}
                OR
                <Link to={"/login?as=artisan"}>
                  Login has a Service Provider
                </Link>
                {/* <Link to={"/login?as=user"}>Login User</Link> */}
              </>
            ) : null}
          </div>
        </div>
        {/* <div className="image-body" >
          <div className="container">
            <div className="m-box">
              <h1>Welcome Back!</h1>
              <p>Login and let's get connected with your clients</p>
            </div>
          </div>
        </div> */}
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
