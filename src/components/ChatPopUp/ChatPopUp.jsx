import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ChatPopUp.scss";

function ChatPopUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="ChatPopUp">
      {/* <!-- Button to open the modal login form --> */}
      <button
        onClick={() => setIsVisible(true)}
        // onclick="document.getElementById('chatPopUp').style.display='block'"
        className="contact-button ChatPopUpButton"
      >
        <FaCommentDots />
        Message
      </button>

      {/* <!-- The Modal --> */}
      <div
        id="chatPopUp"
        style={isVisible ? { display: "block" } : { display: "none" }}
        className="modal"
      >
        <span
          onClick={() => setIsVisible(false)}
          className="close"
          title="Close Modal"
        >
          &times;
        </span>

        {/* <!-- Modal Content --> */}
        <form className="modal-content animate" action="/action_page.php">
          {/* <!-- <div className="imgcontainer">
        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
      </div> --> */}

          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="uname"
              required
            />

            <label htmlFor="psw">
              <b>Message</b>
            </label>
            <textarea cols="5" rows="3" className="form-control"></textarea>
            {/* <!-- <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        /> --> */}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Send
            </button>
            <label>
              {/* <!-- <input type="checkbox" checked="checked" name="remember" /> Remember -->
          <!-- me --> */}
            </label>
          </div>

          <div
            className="container"
            //  style="background-color: #f1f1f1"
          >
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              // onclick="document.getElementById('chatPopUp').style.display='none'"
              className="btn btn-danger w-25"
            >
              Cancel
            </button>
            {/* <span className="psw">
              Forgot <a href="#">password?</a>
            </span> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPopUpForm;

export function PopUpMessage({ show, message }) {
  const [isVisible, setIsVisible] = useState(show);
  return (
    <div className="ChatPopUp PopUpMessage">
      {/* <!-- The Modal --> */}
      <div
        id="chatPopUp"
        style={isVisible ? { display: "block" } : { display: "none" }}
        className="modal"
      >
        <span
          onClick={() => setIsVisible(false)}
          className="close"
          title="Close Modal"
        >
          &times;
        </span>

        {/* <!-- Modal Content --> */}
        <div className="modal-content animate">
          {message}
          <div className="footer">
            <Link to={"/dashboard/profile"}>Complete Profile</Link>
            <button className="close" onClick={() => setIsVisible(false)}>
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
