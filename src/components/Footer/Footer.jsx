import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-div">
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              Grinders
            </a>
            <span className="text-muted">© 2021 Company, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="#">
                <FaFacebook />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#">
                <FaInstagram />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#">
                <FaTwitter />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
