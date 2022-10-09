import React, { useContext, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ChatPopUp.scss";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function ChatPopUpForm({ artisan }) {
  const [isVisible, setIsVisible] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  // console.log(artisan);
  const { loggedIn, userProfile, apiUrl } = useContext(UserContext);
  function openChatPopUpFormFunction() {
    if (!loggedIn) {
      toast.info("you have to login to message an artisan");
      return;
    }

    setIsVisible(true);
  }

  async function handelSubmit(e) {
    e.preventDefault();

    const sendMessage = {
      senderEmail: userProfile.email,
      name: userProfile.fullName,
      // receiver: "oladipupomayowa@gmail.com",
      receiver: artisan.email,
      message: popUpMessage,
    };

    // axios POST request
    const options = {
      url: `${apiUrl}/sendMail/message`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: sendMessage,
    };

    axios(options)
      .then((response) => {
        // console.log(response.data);
        toast.success("Message sent Successfully");
      })
      .catch((error) => {
        // if (error.response.status === 400) {
        // }
        if (!error.response.data.ok) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });

    // console.log(sendMessage);
  }
  return (
    <div className="ChatPopUp">
      {/* <!-- Button to open the modal login form --> */}
      <button
        onClick={() => openChatPopUpFormFunction()}
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
        <form
          className="modal-content animate"
          onSubmit={(e) => {
            handelSubmit(e);
          }}
        >
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={artisan.email}
              disabled={true}
            />

            <label htmlFor="popUpMessage">
              <b>Message</b>
            </label>
            <textarea
              cols="5"
              rows="3"
              id="popUpMessage"
              className="form-control"
              value={popUpMessage}
              onChange={(e) => setPopUpMessage(e.target.value)}
            ></textarea>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Send
            </button>
          </div>

          <div className="container">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="btn btn-danger w-25"
            >
              Cancel
            </button>
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
