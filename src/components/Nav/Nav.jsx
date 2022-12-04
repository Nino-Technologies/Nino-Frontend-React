import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import navImage from "../../assets/images/grinders.png";
import { BsCaretDownFill, BsHeart, BsHouse } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";
import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  // BsCaretDownFill,
  BsFillDoorOpenFill,
  // BsHouse,
} from "react-icons/bs";
import { userNavLinkObject } from "./dashboradNavList";

function Nav() {
  const { loggedIn } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container container-fluid px-4">
        <Link className="navbar-brand" to={"/"}>
          <img src={navImage} alt="working-man" className="logo-image" />
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

        <div
          className="collapse navbar-collapse justify-content-center text-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item effect px-3 ">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item effect px-3 ">
              <Link to="/artisans" className="nav-link">
                Service Providers
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
          {loggedIn ? (
            <NavMenuComponent />
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item m-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-success signin px-3 w-100 dropdown-toggle"
                    type="button"
                    id="loginAccountButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Login Account
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="loginAccountButton"
                  >
                    <li>
                      <Link to="/login?as=user" className="dropdown-item">
                        Login as a User
                      </Link>
                    </li>
                    <li>
                      <Link to="/login?as=artisan" className="dropdown-item">
                        Login as a Service Provider
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item m-2 ">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-success signin px-3 w-100 dropdown-toggle"
                    type="button"
                    id="registerAccountButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Register new Account
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="registerAccountButton"
                  >
                    <li>
                      <Link to="/register?as=user" className="dropdown-item">
                        Register as a User
                      </Link>
                    </li>
                    <li>
                      <Link to="/register?as=artisan" className="dropdown-item">
                        Register as a Service Provider
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;

export const NavProfilePicture = () => {
  const { userProfile } = useContext(UserContext);

  return (
    <div className="ms-au to my-auto">
      {/* <b> {userInformation.userName}</b> */}
      <img
        // src="https://production-next-images-cdn.thumbtack.com/i/431288469664604162/width/120/aspect/1-1.webp"
        src={userProfile.avatar}
        className="NavProfilePicture ms-2"
        alt="NavProfilePicture"
      />
    </div>
  );
};

export const NavMenuComponent = ({ setLoggedIn }) => {
  const [navMenuComponent, setNavMenuComponent] = useState(false);
  const { logOutFunction, getUserProfile } = useContext(UserContext);

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      {/* <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>{" "} */}
      <div
        className="NavMenuComponent"
        onClick={() => {
          navMenuComponent
            ? setNavMenuComponent(false)
            : setNavMenuComponent(true);
        }}
      >
        <NavProfilePicture
          navMenuComponent={navMenuComponent}
          setNavMenuComponent={setNavMenuComponent}
        />{" "}
        <BsCaretDownFill className="my-auto" />
        <ul
          className="dropdown-menu-ul"
          style={
            navMenuComponent ? { display: "inline-block" } : { display: "none" }
          }
        >
          <li>
            <Link to={"/dashboard/home"}>
              <span className="me-2">
                <BsHouse />
              </span>
              Dashboard
            </Link>
          </li>
          <hr />
          <li onClick={() => logOutFunction()} className="logout text-danger">
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export const DashboardSideNav = ({ sideNavOpen, setSideNavOpen }) => {
  const { userProfile } = useContext(UserContext);
  // const [sideNavOpen, setSideNavOpen] = useState(false);
  function navToggle() {
    setSideNavOpen(!sideNavOpen);
  }

  const { logOutFunction } = useContext(UserContext);
  const { role } = userProfile;
  // console.log(userProfile);
  return (
    <>
      <div
        className="
        
        side-nav-icon toggle"
        onClick={() => {
          navToggle();
        }}
      >
        {sideNavOpen ? <BsArrowLeftSquareFill /> : <BsArrowRightSquareFill />}
      </div>
      <ul>
        {userNavLinkObject.map((link, i) => {
          const { name, icon, path, userPrivilege } = link;
          return (
            <React.Fragment key={i}>
              {role >= userPrivilege ? (
                <li>
                  <Link to={path}>
                    <div className="side-nav-icon">{icon}</div>
                    <span className="nav-link-name">{name}</span>
                  </Link>
                </li>
              ) : null}
            </React.Fragment>
          );
        })}
        {role === 0 ? (
          <li>
            <Link to="saved-artisan">
              <div className="side-nav-icon">
                <BsHeart />
              </div>
              <span className="nav-link-name">Saved Service Provider</span>
            </Link>
          </li>
        ) : null}
        <li
          onClick={() => {
            logOutFunction();
          }}
        >
          <div className="side-nav-icon text-danger">
            {" "}
            <BsFillDoorOpenFill />
          </div>
          <span className="nav-link-name text-danger">LogOut</span>
        </li>
      </ul>
    </>
  );
};
