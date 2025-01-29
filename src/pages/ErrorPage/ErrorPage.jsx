import React, { useContext } from "react";
import "./error_page.style.css";
import { Link } from "react-router-dom";
import errorImage from "../../assets/images/page_not_found.svg";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import {UserContext} from "../../context/UserContext";

const ErrorPage = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <>
      <section className="ErrorPage">
        <div className="image-404-div">
          <img src={errorImage} alt="Page not found" />
        </div>
        <div className="error-message">Page Not Found</div>
        <div className="alt-message">Page may be deleted or not Created</div>
        {loggedIn ? (
          <Link to="/dashboard/home">
            <button className=" button btn btn-primary mt-3">
              Go Back To Home
            </button>
          </Link>
        ) : (
          <Link to="/">
            <button className=" button btn btn-primary mt-3">
              Go Back To Landing page
            </button>
          </Link>
        )}
      </section>
    </>
  );
};

export default ErrorPage;

export function UnAuthorizeAccess() {
  return (
    <div className="mt-5 text-center ">
      {/* <GroupCard> */}
      <div className=" fs-1 text-danger">
        <BsFillExclamationTriangleFill />
      </div>
      You dont have Access to this page. <br /> if you thing you should access
      this page try login out and login in aging <br />
      Contact the Admin if it repeats for privilege check <br />
      Thanks. <br />
      Developer
      {/* </GroupCard> */}
    </div>
  );
}
