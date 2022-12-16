import React from "react";
import { Link } from "react-router-dom";
import SaveButton from "../SaveButton/SaveButton";
import StarComponent from "../stars/Stars";
import "./ProfileCard.scss";
import { FaTrophy, FaUser, FaUserCheck } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import ShareButton from "../ShareButton/ShareButton";

function ProfileCard({ artisan }) {
  const {
    fullName,
    introduction,
    service,
    // hired,
    locationCity,
    locationState,
    _id,
    avatar,
    // gender,
    backgroundChecked,
    YearsOfExperience,
  } = artisan;
  // console.log(artisan);
  return (
    <>
      {/* ProfileCard */}
      <div className="ProfileCard">
        <div className="image-div">
          <img
            src={`${
              avatar === ""
                ? "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png"
                : avatar
            }`}
            alt="Profile picture"
          />
        </div>
        <div className="text-div">
          <h3>{fullName}</h3>
          {/* <!-- send {{ review.length}} has pros --> */}
          <StarComponent rate="5" />

          <p className="my-0 introduction">
            <b>Introduction: </b> {introduction}
          </p>
          <p className="m-0">
            <b>Service</b> <br />
            {service}
          </p>
          <div className="mt-0">
            <b> Overview</b>
            <ul className="nav border">
              <li>
                <span className="icon mx-2">
                  <FaTrophy />
                </span>
                Has {YearsOfExperience} years of experience
              </li>

              <li>
                <span className="icon mx-2">
                  <GoLocation />
                </span>
                {locationCity}, {locationState}
              </li>
              {backgroundChecked ? (
                <li>
                  <span className="icon mx-2">
                    <FaUserCheck />
                  </span>
                  Background checked
                </li>
              ) : null}
            </ul>
          </div>

          <div className="extra-button">
            <ShareButton id={`${_id}`} />

            <SaveButton artisan={artisan} />
          </div>
          <p className="d-flex w-100">
            <Link to={`/artisans-profile/${_id}`} className="me-auto mt-2">
              <FaUser />
              <span className="d-none d-md-inline">View </span>
              profile
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
