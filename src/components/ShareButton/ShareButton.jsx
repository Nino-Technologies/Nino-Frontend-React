import React from "react";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaRegClipboard,
  FaShareSquare,
  FaTwitter,
} from "react-icons/fa";
import "./ShareButton.scss";

function ShareButton({ profileUrlId }) {
  const [visibility, setVisibility] = useState(false);
  function toggleVisibility() {
    setVisibility(!visibility);
  }
  async function copyURL(id) {
    try {
      await navigator.clipboard.writeText(
        "https://nino-tech.netlify.app/artisans-profile/" + id
      );
      alert("Copied");
    } catch ($e) {
      alert("Cannot copy");
    }
  }
  return (
    <div className="ShareButton">
      <div
        className="Share-icons"
        style={!visibility ? { display: "none" } : null}
      >
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <FaRegClipboard
          onClick={() => copyURL(profileUrlId)}
          className="my-auto"
        />
      </div>
      <button for="toggle-share" onClick={toggleVisibility()}>
        <FaShareSquare /> Share
      </button>
    </div>
  );
}

export default ShareButton;
