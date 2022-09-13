import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import GroupCard, {
//   DashboardActionCard,
//   DashboardCard,
// } from "../../components/CroupCard/GroupCardComponent";
// import { UserContext } from "../../context/userContext";
import "./HomePage.css";

import {
  BsDoorOpen,
  BsPeople,
  BsPersonBoundingBox,
  BsPersonCheck,
  BsPersonPlus,
  BsWallet,
} from "react-icons/bs";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { PopUpMessage } from "../../components/ChatPopUp/ChatPopUp";
import VerifiedBadge from "../../components/verifiedBadge/verifiedBadge";
import { FaExclamation } from "react-icons/fa";

function HomePage() {
  const [profileProgress, setProfileProgress] = useState(30);
  const {
    logOutFunction,
    userProfile,
    apiUrl,

    token,
  } = useContext(UserContext);
  function checkVerified(verify) {
    if (verify) {
      return <VerifiedBadge />;
    }
    return <FaExclamation className="text-danger" />;
  }
  return (
    <div className="HomePage">
      {/* <PopUpMessage
        show={!userProfile.email_verified}
        message="Profile is not completed"
      /> */}
      <div className="header my-4  d-flex justify-content-between">
        <div className="welcome ms-4">
          {" "}
          Welcome {userProfile.userName || "User"}
        </div>
        <button
          className="btn-danger btn me-4 btn-sm"
          onClick={() => logOutFunction()}
        >
          LogOut
        </button>
      </div>
      <hr />
      <div className="container">
        <div className="d-flex flex-wrap ">
          <div className="px-1">
            {/* <DashboardCard
            label={"Wallet Balance"}
            icon={<BsWallet />}
            figure={<div className="n">{userAccountInformation.amount}</div>}
          /> */}
          </div>
          {/* {getUserPrivilege() > 1 ? (
          <>
            <div className="px-1">
              <DashboardCard
                label={"Total Customers"}
                icon={<BsPersonCheck />}
                figure={"0"}
              />
            </div>
          </>
        ) : null} */}
          {/* {getUserPrivilege() > 2 ? (
          <>
            <div className="px-1">
              <DashboardCard
                label={"Total Users"}
                icon={<BsPeople />}
                figure={users.length}
              />
            </div>
            <div className="px-1">
              <DashboardCard
                label={"Total Resellers"}
                icon={<BsPersonPlus />}
                figure={resellers.length}
              />
            </div>
          </>
        ) : null} */}
          {/* {getUserPrivilege() > 3 ? (
          <>
            <div className="px-1">
              <DashboardCard
                label={"Total Admin"}
                icon={<BsPersonBoundingBox />}
                figure={admins.length}
              />
            </div>
          </>
        ) : null} */}
        </div>
      </div>
      <div className="container">
        {" "}
        <div className="row">
          {/* {actionList.map((link, i) => {
          const { label, icon, path, userPrivilege } = link;
          // console.log("userPrivilege");
          return (
            <>
              {getUserPrivilege() >= userPrivilege ? (
                <div className="col-6 col-md-3 px-1" key={i}>
                  <Link to={path}>
                    <DashboardActionCard label={label} icon={icon} />
                  </Link>
                </div>
              ) : null}
            </>
          );
        })} */}
        </div>
      </div>
      <div className="container">
        {" "}
        <div className="row mt-5">
          <div className="col-sm-6">{/* Space */}</div>
          <div className="col-sm-6">
            <div className="card mx-2">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title tw-1">Profile Completeness</h5>
                <p className="card-text">
                  Update Profile to get our top pro artisans
                </p>
                <div className="progress" style={{ height: "30px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-info "
                    role="progressbar"
                    style={{ width: `${profileProgress}%` }}
                  >
                    {profileProgress}%
                  </div>
                </div>
                {/* <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" >
                Go somewhere
              </a> */}
                <Link
                  to="/dashboard/profile"
                  className="btn btn-primary mt-2 ms-auto"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {" "}
        <div className="row mt-5">
          <div className="col-sm-6">
            <div className="card mx-2 notification">
              <div className="card-header">Notification</div>
              <div className="card-body">
                {/* <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
                <p className="empty">
                  No Notification Yet Check out for later :){" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card mx-2">
              <div className="card-header">Achievements</div>
              <div className="card-body d-flex flex-column">
                <ul className="nav">
                  <li className="achievements-div my-1 w-100">
                    {checkVerified(false)}
                    <div className="text ms-2">
                      <b>Profile Completeness</b>
                      <>time</>
                    </div>
                  </li>
                  <li className="achievements-div my-1 w-100">
                    {checkVerified(userProfile.email_verified)}
                    <div className="text ms-2">
                      <b>email_verified</b>
                      <>time</>
                    </div>
                  </li>
                  <li className="achievements-div my-1 w-100">
                    {checkVerified(userProfile.licensed)}
                    <div className="text ms-2">
                      <b>Licensed</b>
                      <>time</>
                    </div>
                  </li>
                  <li className="achievements-div my-1 w-100">
                    {checkVerified(userProfile.backgroundChecked)}
                    <div className="text ms-2">
                      <b>background Checked</b>
                      <>time</>
                    </div>
                  </li>
                  <li className="achievements-div my-1 w-100">
                    {checkVerified(userProfile.topPro)}
                    <div className="text ms-2">
                      <b>Top Pro</b>
                      <>time</>
                    </div>
                  </li>
                  <li className="achievements-div my-1 w-100">
                    <VerifiedBadge />
                    <div className="text ms-2">
                      <b>Verified Badge</b>
                      <>time</>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className="mt-5">Resent Hairs</h4>
      <div className="container  table-responsive ">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">FullName</th>
              <th scope="col">phoneNumber</th>
              <th scope="col">officeLocation</th>
              <th scope="col">Date</th>
              <th scope="col">Profile Link</th>
            </tr>
          </thead>
          <tbody className="table-primary">
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
