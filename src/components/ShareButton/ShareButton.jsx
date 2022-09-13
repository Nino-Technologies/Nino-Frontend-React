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

function ShareButton({ id }) {
  const [visibility, setVisibility] = useState(false);
  function toggleVisibility() {
    setVisibility(!visibility);
  }
  const profileUrl = "https://nino-tech.netlify.app/artisans-profile/" + id;
  async function copyURL(id) {
    try {
      await navigator.clipboard.writeText(profileUrl);
      alert("Copied");
    } catch {
      alert("Cannot copy");
    }
  }
  return (
    <div className="ShareButton">
      <div
        className="Share-icons"
        style={!visibility ? { display: "none" } : null}
      >
        <a
          title="Share on facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`}
          target="_blank"
          rel="noopener"
        >
          {/* <i class="fab fa-2x fa-facebook-square"></i> */}
          <FaFacebook />
        </a>
        {/* <a href="#">
        </a> */}
        {/* <a href="#">
          <FaInstagram />
        </a> */}
        <a
          title="Share on facebook"
          href={`
https://twitter.com/intent/tweet?text=Artisan%20profile ${profileUrl}&original_referer=${profileUrl}&related=clicktotweet
`}
          target="_blank"
          rel="noopener"
        >
          <FaTwitter />
        </a>
        <FaRegClipboard onClick={() => copyURL(id)} className="my-auto" />
      </div>
      <button for="toggle-share" onClick={() => toggleVisibility()}>
        <FaShareSquare /> Share
      </button>
    </div>
  );
}

export default ShareButton;
