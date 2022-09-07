import React from "react";
import heroImage from "../../assets/images/undraw_coffee_break_h3uu.svg";
import smallHeroImage from "../../assets/images/hero-section-image-design-small.png";
import "./LandingPage.scss";
import Search from "../../components/Search/Search";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Nav />
      <div className="hero-section">
        <div className="text-div">
          {/* <!-- <div className="box"> --> */}
          <div className="mobile-background"></div>
          <h1 className="hero-name">Hire Artisans With Grinders</h1>
          <p className="sub">Connecting people to trusted local services.</p>
          <Search />
          <Link to={"/login?as=artisan"} className="text-end py-2">
            {" "}
            Became a service provider
          </Link>
          <img src={smallHeroImage} alt="" className="" />
        </div>
        <div className="image-div">
          <div className="image-container">
            <img src={heroImage} alt="working-man" className="working-man" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
