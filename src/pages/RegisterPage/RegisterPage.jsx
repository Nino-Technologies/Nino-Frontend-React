import React, { useEffect, useState } from "react";
import ArtisanRegistrationForm from "../../components/RegistrationForm/ArtisanRegistrationForm";
import "./RegisterPage.scss";
import UserRegistrationForm from "../../components/RegistrationForm/UserRegistrationForm";
import { Link, useSearchParams } from "react-router-dom";
import { BackComponent } from "../LoginPage/LoginPage";
import { toast } from "react-toastify";

function RegisterPage() {
  const [displayForm, setDisplayForm] = useState(-1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("as") === "user") {
      return setDisplayForm(1);
    }
    if (searchParams.get("as") === "artisan") {
      return setDisplayForm(2);
    }
    toast.info("Invalid login request");
  }, [searchParams]);
  return (
    <div className="RegisterPage">
      <div className="login">
        <div className="form-section">
          <BackComponent />
          <div className="container ">
            {displayForm === 1 ? (
              <UserRegistrationForm />
            ) : (
              <>
                {" "}
                {displayForm === 2 ? (
                  <ArtisanRegistrationForm />
                ) : (
                  <>Invalid Login Request</>
                )}
              </>
            )}
            <hr className="w-100" />
            {displayForm === -1 ? (
              <>
                Do You Want To
                <Link to={"/register?as=artisan"}>Register Artisan</Link>
                <Link to={"/register?as=user"}>Register User</Link>
                OR
                <Link to={"/login?as=artisan"}>Login Artisan</Link>
                <Link to={"/login?as=user"}>Login User</Link>
              </>
            ) : null}
          </div>
        </div>

        <div className="image-body">
          <div className="container">
            <div className="m-box">
              <h1>Welcome Back!</h1>
              <p>Login and let's get connected with your clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
