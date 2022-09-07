import React from "react";
import SocialLogin from "../LoginForm/SocialLogin";
import { Link } from "react-router-dom";

function UserRegistrationForm() {
  return (
    <form class="form-layout px-5">
      <h3 class="login-name">Register User</h3>
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

      <div class="mt-3">
        {/* <label for="exampleInputPassword1" class="form-label">
          
        </label> */}
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
      <div class="form-text mt-3">
        <div>
          {/* Don't have an account?{" "} */}
          <Link to={"/register?as=artisan"}>Register As An Artisan</Link>
          <br />
          have an account? <Link to={"/login?as=user"}>Login As An User</Link>
        </div>
      </div>

      <SocialLogin />
    </form>
  );
}

export default UserRegistrationForm;
