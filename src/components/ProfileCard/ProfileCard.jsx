import React from "react";
import { Link } from "react-router-dom";
import SaveButton from "../SaveButton/SaveButton";
import StarComponent from "../stars/Stars";
import "./ProfileCard.scss";
// import ShareButton from "../ShareButton/ShareButton";
import { FaTrophy, FaUser, FaUserCheck } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

function ProfileCard({ artisan }) {
  const { fullName, review, introduction, service, hired, location, _id } =
    artisan;
  // console.log(fullName);

  //   function Navegar(id) {
  //     navigate('/products/id')
  // }
  return (
    <>
      <div className="ProfileCard">
        <div className="image-div">
          <img
            src="https://st4.depositphotos.com/9998432/20073/v/1600/depositphotos_200738870-stock-illustration-default-placeholder-businessman-half-length.jpg"
            alt="John"
            className="w-100"
            // style="width: 100%"
            // v-if=" gender == 'male'"
          />
          {/* <img
            src="https://st3.depositphotos.com/9998432/19099/v/1600/depositphotos_190990184-stock-illustration-default-placeholder-businesswoman-half-length.jpg"
            alt="John"
            style="width: 100%"
            // v-else
          /> */}
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
            {/* <!-- <ul className="nav">
          <li v-for="service in  service" :key="service">
            - {{ service }}
          </li>
        </ul> --> */}
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

              <li
              // v-if=" backgroundChecked"
              >
                <span className="icon mx-2">
                  <FaUserCheck />
                </span>
                Background checked
              </li>
            </ul>
          </div>

          <div className="extra-button">
            {/* <ShareButton profileUrlId="882ywbb" /> */}

            <SaveButton />
          </div>
          {/* <!-- </div> --> */}
          <p className="d-flex w-100">
            {/* <router-link
          :to="{ name: 'Artisans-profile', params: { id:  _id } }"
          className="me-auto mt-2"
        >
      </router-link> */}

            <Link to={`/artisans/${_id}`} className="me-auto mt-2">
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
