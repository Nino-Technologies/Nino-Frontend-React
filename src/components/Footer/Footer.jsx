import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContactUsForm } from "../../pages/ContactUsPage/ContactUsPage";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer-div">
      <div className="container text-white">
        <footer className="pt-5">
          <div className="footer-nav">
            <div className="link-div">
              {" "}
              <h5>Navigation</h5>
              <div className="line"></div>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link
                    to="/"
                    className="nav-link text-muted active"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/artisans" className="nav-link text-muted">
                    Service Providers
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/about-us" className="nav-link text-muted">
                    About Us
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/contact-us" className="nav-link text-muted">
                    Contact Us
                  </Link>
                </li>
                {/* <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    About
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="link-div">
              {" "}
              <h5>Important Links</h5>
              <div className="line"></div>
              <ul className="nav flex-column">
                {/* <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    Pricing
                  </a>
                </li> */}
                <li className="nav-item mb-2">
                  <Link
                    to="/register?as=artisan"
                    className="nav-link text-muted"
                  >
                    Register as a service provider
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/login?as=artisan" className="nav-link text-muted">
                    service provider login
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/register?as=user" className="nav-link text-muted">
                    Register as a user
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/login?as=user" className="nav-link text-muted">
                    user login
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted p-3">
                    Site map
                  </a>
                </li>
                {/* <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    About
                  </a>
                </li>  */}
              </ul>
            </div>
            <div className="form-div">
              <ContactUsForm />
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 mt-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <a
                href="/"
                className="me-2 mb-md-0 text-muted text-decoration-none lh-1"
              >
                Grinders
              </a>
              <span className="text-muted">© 2021 Company, Inc</span>
            </div>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a
                  className="text-muted"
                  href="https://www.linkedin.com/company/grinders-technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="text-muted"
                  href="https://instagram.com/grinders.ng?igshid=NDRkN2NkYzU="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="text-muted"
                  href="https://twitter.com/grindersng?s=11&t=SFCC7Y_4_ex06S9A1Bd3TQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
