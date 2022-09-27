import React, { useContext } from "react";
import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Search from "../../components/Search/Search";
import ReactGa from "react-ga";

import "./ArtisansPage.scss";
// import { UserContext } from "../../context/UserContext";
import { SearchContext } from "../../context/SearchContext";

function ArtisansPage() {
  const { pageLoading, artisans, getArtisansFunction } =
    useContext(SearchContext);

  useEffect(() => {
    getArtisansFunction();
  }, []);
  useEffect(() => {
    ReactGa.pageview(window.location.pathname);
  }, []);

  return (
    <div className="ArtisansPage">
      <Nav />

      <div className="hero">
        <div className="container">
          <h3 className="hero-name">Artisans</h3>
        </div>
      </div>
      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#003049"
          fill-opacity="1"
          d="M0,96L80,128C160,160,320,224,480,213.3C640,203,800,117,960,96C1120,75,1280,117,1360,138.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>

      <Search
      // setPageLoading={setPageLoading}
      // setArtisans={setArtisans}
      // apiUrl={apiUrl}
      />
      {pageLoading ? (
        <div className="container loading">Loading...</div>
      ) : (
        <div className="container">
          {artisans.map((artisan) => (
            <ProfileCard artisan={artisan} />
          ))}
        </div>
      )}
      {!pageLoading && artisans.length === 0 ? (
        <div className="container loading">No Artisan Found</div>
      ) : null}
      <div style={{ width: "100%", margin: 0 }}>
        <Footer />
      </div>
    </div>
  );
}

export default ArtisansPage;
