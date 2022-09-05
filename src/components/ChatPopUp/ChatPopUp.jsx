import React, { useState } from "react";

function ChatPopUp() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      {/* <!-- Button to open the modal login form --> */}
      <button
        onclick="document.getElementById('chatPopUp').style.display='block'"
        className="btn btn-primary w-50"
      >
        <font-awesome-icon icon="fas fa-comment-dots" />
        Message
      </button>

      {/* <!-- The Modal --> */}
      <div id="chatPopUp" className="modal">
        <span
          onclick="document.getElementById('chatPopUp').style.display='none'"
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
            <label for="uname">
              <b>Email</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="uname"
              required
            />

            <label for="psw">
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

          <div className="container" style="background-color: #f1f1f1">
            <button
              type="button"
              onclick="document.getElementById('chatPopUp').style.display='none'"
              className="btn btn-danger w-25"
            >
              Cancel
            </button>
            <span className="psw">
              Forgot <a href="#">password?</a>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatPopUp;
