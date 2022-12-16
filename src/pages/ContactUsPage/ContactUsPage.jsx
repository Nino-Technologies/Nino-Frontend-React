import React, { useRef } from "react";
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

import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

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
                <ContactUsForm />
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
                        <span className="px-4 text-white">+2348037009713</span>
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
                        <a
                          href="https://instagram.com/grinders.ng?igshid=NDRkN2NkYzU="
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <font-awesome-icon
                            icon="fa-brands fa-instagram"
                            className="contact-icon"
                          />
                          <FaInstagram className="contact-icon" />
                        </a>
                      </li>
                      <li className="list-group-item">
                        <a
                          href="https://twitter.com/grindersng?s=11&t=SFCC7Y_4_ex06S9A1Bd3TQ"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <font-awesome-icon
                            icon="fa-brands fa-twitter"
                            className="contact-icon"
                          />
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

export function ContactUsForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4xoj8n8", // "YOUR_SERVICE_ID",
        "template_do8d6pa", // "YOUR_TEMPLATE_ID",
        form.current,
        "HWU7Rd-qnGwJVtzBN" // "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("mail sent !!!");
        },
        (error) => {
          toast.error("error sending message");
          console.log(error.text);
        }
      );
  };
  return (
    <form className="form-layout" ref={form} onSubmit={sendEmail}>
      <h5 className="login-name">Send us a Message</h5>
      <div className="line"></div>
      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="sender_name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="sender_email"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Number
        </label>
        <input
          type="text"
          className="form-control"
          id="number"
          placeholder="Optional"
          name="sender_number"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Leave a Message
        </label>
        <textarea
          className="form-control"
          id="message"
          rows="3"
          name="sender_message"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
}