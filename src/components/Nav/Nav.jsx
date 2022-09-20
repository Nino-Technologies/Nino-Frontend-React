import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
<<<<<<< HEAD
import navImage from "../../assets/images/grinders.png";
import { BsCaretDownFill, BsHouse } from "react-icons/bs";
=======
import { BsCaretDownFill, BsHeart, BsHouse } from "react-icons/bs";
>>>>>>> 1764e2b919ea6704b3e579ebb4e5388e2772ef3b
import { UserContext } from "../../context/UserContext";
import navImage from "../../assets/images/grinders.png";
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

        <div className="collapse navbar-collapse justify-content-center text-center" id="navbarNav">
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
          {loggedIn ? (
            <NavMenuComponent />
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <Link
                  to="/login?as=user"
                  className="btn btn-outline-success px-3 mb-2 mb-md-0  w-100"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  to="/login?as=user"
                  className="btn btn-outline-success signin px-3 w-100"
                >
                  Sign up
                </Link>
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
  // const { userInformation } = useContext(UserContext);

  return (
    <div className="ms-au to my-auto">
      {/* <b> {userInformation.userName}</b> */}
      <img
        src="https://production-next-images-cdn.thumbtack.com/i/431288469664604162/width/120/aspect/1-1.webp"
        // src={profilePicture}
        className="NavProfilePicture ms-2"
        alt="NavProfilePicture"
      />
    </div>
  );
};

export const NavMenuComponent = ({ setLoggedIn }) => {
  const [navMenuComponent, setNavMenuComponent] = useState(false);
  const { logOutFunction } = useContext(UserContext);

  // const navigate = useNavigate();
  // function logout() {
  //   window.confirm("logout?") && setLoggedIn(false);
  //   navigate("/");
  // }

  // const { logOut } = useContext(UserContext);
  return (
    <>
      {" "}
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
            <>
              {role >= userPrivilege ? (
                <li key={i}>
                  <Link to={path}>
                    <div className="side-nav-icon">{icon}</div>
                    <span className="nav-link-name">{name}</span>
                  </Link>
                </li>
              ) : null}
            </>
          );
        })}
        {role === 0 ? (
          <li>
            <Link to="saved-artisan">
              <div className="side-nav-icon">
                <BsHeart />
              </div>
              <span className="nav-link-name">Saved Artisan</span>
            </Link>
          </li>
        ) : null}
        <li>
          <Link
            to="#"
            onClick={() => {
              logOutFunction();
            }}
          >
            <div className="side-nav-icon text-danger">
              {" "}
              <BsFillDoorOpenFill />
            </div>
            <span className="nav-link-name text-danger">LogOut</span>
          </Link>
        </li>
      </ul>
    </>
  );
};
