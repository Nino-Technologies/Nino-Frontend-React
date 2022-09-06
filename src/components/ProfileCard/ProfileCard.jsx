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
    hired,
    location,
    _id,
    avatar,
    gender,
    backgroundChecked,
  } = artisan;
  return (
    <>
      <div className="ProfileCard">
        <div className="image-div">
          <img
            src={`${
              avatar === ""
                ? gender === "male"
                  ? "https://st4.depositphotos.com/9998432/20073/v/1600/depositphotos_200738870-stock-illustration-default-placeholder-businessman-half-length.jpg"
                  : "https://st3.depositphotos.com/9998432/19099/v/1600/depositphotos_190990184-stock-illustration-default-placeholder-businesswoman-half-length.jpg"
                : avatar
            }`}
            alt="Profile picture"
            className="w-100"
          />
        </div>
        <div className="text-div">
          <h1>{fullName}</h1>
          {/* <!-- send {{ review.length}} has pros --> */}
          <StarComponent rate="5" />

          <p className="my-0 introduction">
            <b>Introduction</b>
            {introduction}
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
                Hired {hired} times
              </li>

              <li>
                <span className="icon mx-2">
                  <GoLocation />
                </span>
                {location.city}, {location.state}
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

            <SaveButton />
          </div>
          <p className="d-flex w-100">
            <Link to={`/artisans-profile/${_id}`} className="me-auto mt-2">
              <FaUser />
              <span className="d-none d-md-inline">View</span>
              Profile
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
