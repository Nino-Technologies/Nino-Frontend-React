import React from "react";
import Footer from "../../components/Footer/Footer";
import "./ContactUsPage.scss";
import Nav from "../../components/Nav/Nav";
import {
  FaEnvelope,
  FaInstagram,
  FaLocationArrow,
  FaTwitter,
} from "react-icons/fa";
import { GoLocation } from "react-icons/go";

function ContactUsPage() {
  return (
    <div className="contact">
      <Nav />
      <div className="hero">
        <div className="container">
          <h3 className="hero-name">Contact Us</h3>
        </div>
      </div>
      <main className="main">
        <div className="container">
          <div className="contact-box shadow-lg">
            <div className="row">
              <div className="col-lg-7 px-5 py-5 bg-light">
                <form className="form-layout">
                  <h3 className="login-name">Send us a Message</h3>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Leave a Message
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                </form>
              </div>

              <div
                className="col-lg-5 px-5 py-5 text-white"
                style={{ backgroundColor: "#003049" }}
              >
                <div className="content">
                  <div className="container">
                    <h3 className="title mb-4">Contact Information</h3>
                    <ul className="list-group">
                      <li className="list-group-item py-3">
                        <FaLocationArrow className="contact-icon" />
                        <span className="px-4 text-white">Abuja, Nigeria</span>
                      </li>
                      <li className="list-group-item py-3">
                        <GoLocation className="contact-icon" />
                        <span className="px-4 text-white">+234817009713</span>
                      </li>
                      <li className="list-group-item py-3">
                        <FaEnvelope className="contact-icon" />
                        <span className="px-4 text-white">
                          support@grinders.ng
                        </span>
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal py-5">
                      <li className="list-group-item">
                        <a href="https://instagram.com/grinders.ng?igshid=NDRkN2NkYzU=">
                          <FaInstagram className="contact-icon" />
                        </a>
                      </li>
                      <li className="list-group-item">
                        <a href="https://twitter.com/grindersng?s=11&t=SFCC7Y_4_ex06S9A1Bd3TQ">
                          <FaTwitter className="contact-icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContactUsPage;
