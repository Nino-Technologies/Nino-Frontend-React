import React from "react";
import { Link } from "react-router-dom";

function ArtisanLoginForm() {
  return (
    <form class="form-layout px-5">
      <h3 class="login-name">Login Artisan</h3>
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
          Don't have an account? <br />
          <div className="d-flex justify-content-around mt-3">
            <Link
              to={"/register?as=artisan"}
              className="btn btn-outline-primary"
            >
              Register As An Artisan
            </Link>
            <span class="my-auto">OR</span>
            <Link to={"/login?as=user"} className="btn btn-outline-primary">
              Login As An User
            </Link>{" "}
          </div>
        </div>
      </div>
    </form>
  );
}

export default ArtisanLoginForm;
