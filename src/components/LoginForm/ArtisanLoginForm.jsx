import React from "react";
import { Link } from "react-router-dom";

function ArtisanLoginForm() {
  return (
    <form className="form-layout px-5">
      <h3 className="login-name">Login Artisan</h3>
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

      <button type="submit" className="btn btn-primary mt-3 w-100">
        Submit
      </button>
      <div className="form-text mt-3">
        <div>
          Don't have an account? <br />
          <div className="d-flex justify-content-around mt-3">
            <Link
              to={"/register?as=artisan"}
              className="btn btn-outline-primary"
            >
              Register Artisan
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
