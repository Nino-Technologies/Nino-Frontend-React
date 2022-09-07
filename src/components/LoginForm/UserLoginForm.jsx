import React from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

function UserLoginForm() {
  return (
    <form class="form-layout px-5">
      <h3 class="login-name">Login User</h3>
      <div class="">
        {/* <label for="exampleInputEmail1" class="form-label">
          
        </label> */}
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email address"
        />
      </div>

      <div class="">
        <label for="exampleInputPassword1" class="form-label"></label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>

      <button type="submit" class="btn btn-primary mt-3 w-100">
        Submit
      </button>
      <div class="form-text">
        <div>
          {/* Don't have an account?{" "} */}
          <Link to={"/login?as=artisan"}>Login As An Artisan</Link>
          <br />
          Don't have an account?{" "}
          <Link to={"/register?as=user"}>Register As An User</Link>
        </div>
        {/* 
        <div className="social-login-div mt-4">
          <div className="divider d-flex flex-col umn justify-content-around">
            <hr className="w-25 my-auto" />
            OR
            <hr className="w-25 my-auto" />
          </div>
          <div className="d-flex justify-content-around mt-2">
            <button className="btn btn-primary mx-1">
              <FaFacebook /> FaceBook Login
            </button>
            <button className="btn btn-primary mx-1">
              <FaGoogle /> Google Login
            </button>
          </div>
        </div> */}
        <SocialLogin />
      </div>
    </form>
  );
}

export default UserLoginForm;
