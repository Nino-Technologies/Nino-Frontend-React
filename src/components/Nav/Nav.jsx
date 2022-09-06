import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container container-fluid p-0">
        <Link className="navbar-brand" to={"/"}>
          Grinders
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item effect px-3 ">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item effect px-3 ">
              <Link to="/artisans" className="nav-link">
                Artisans
              </Link>
            </li>
            <li className="nav-item effect px-3 ">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item effect px-3 ">
              <Link to="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="collapse navbar-collapse justify-content-end text-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <Link
                to="#"
                className="btn btn-outline-success px-3 mb-2 mb-md-0  w-100"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                to="#"
                className="btn btn-outline-success signin px-3 w-100"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
