import React, { useEffect } from "react";
import "./ProArtisanCard.scss";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Facebook } from "@material-ui/icons";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";

function ProArtisanCard({ profile }) {
  // /*=============== SHOW SOCIAL NETWORKS ===============*/
  // const showSocial = () => {
  //   const toggle = document.getElementById("card-toggle"),
  //     social = document.getElementById("card-social");

  //   toggle.addEventListener("click", () => {
  //     //If animation class exist = down-animaiton class add
  //     if (social.classList.contains("animation")) {
  //       social.classList.add("down-animation");

  //       setTimeout(() => {
  //         social.classList.remove("down-animation");
  //       }, 2000);
  //     }
  //     //Add the animation to the div tag card__social
  //     social.classList.toggle("animation");
  //   });
  // };

  const [toggle, setToggle] = useState(false);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    // showSocial();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (animate) {
        setAnimate(false);
      }
    }, 2000);

    return () => {
      // clears timeout before running the new effect
      clearTimeout(timeout);
    };
  }, [animate]);

  return (
    <div className="ProArtisanCard">
      <div className="container">
        <div className="card">
          <div className="card__border">
            <img src={profile.avatar} alt="card image" className="card__img" />
          </div>

          <h3 className="card__name">{profile.fullName}</h3>
          <span className="card__profession">{profile.service}</span>

          <div
            // className="card__social"
            className={`card__social ${toggle ? "  animation " : ""}  ${
              animate ? "   down-animation " : "up-animation"
            }`}
            id="card-social"
          >
            <div className="card__social-control">
              {/* <!-- Toggle Button --> */}
              <div
                className={`card__social-toggle`}
                onClick={() => {
                  setToggle(!toggle);
                  setAnimate(true);
                }}
                id="card-toggle"
              >
                {/* <i className="ri-add-line"></i> */}
                <BsPlus />
              </div>

              <span className="card__social-text">My social networks</span>

              {/* <!-- Card Social --> */}
              <ul className="card__social-list">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="card__social-link"
                >
                  {/* <i className="ri-facebook-line"></i>
                   */}
                  <Facebook />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="card__social-link"
                >
                  {/* <i className="ri-instagram-line"></i>
                   */}
                  <FaInstagram />
                </a>

                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  className="card__social-link"
                >
                  {/* <i className="ri-twitter-line"></i> */}
                  <FaTwitter />
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProArtisanCard;
