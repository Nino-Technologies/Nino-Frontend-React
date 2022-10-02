import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Nav, { DashboardSideNav } from "../../components/Nav/Nav";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";

function Dashboard() {
  const { loggedIn, getUserProfile } = useContext(UserContext);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  if (loggedIn === false) {
    navigate("/404");
  }
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="Dashboard">
      <input
        type="checkbox"
        className="sideBarCheck"
        checked={sideNavOpen ? true : false}
        style={{ display: "none" }}
        onChange={() => null}
      />
      <div className="dashboardNav">
        <Nav />
      </div>
      <div className="page-body-wrapper">
        <div className="side-nav">
          <DashboardSideNav
            sideNavOpen={sideNavOpen}
            setSideNavOpen={setSideNavOpen}
          />
        </div>
        <main className="main-dashboard-page ps-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
