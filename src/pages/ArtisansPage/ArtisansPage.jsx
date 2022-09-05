import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Search from "../../components/Search/Search";

import artisansData from "../../json/artisansDb.json";

function ArtisansPage() {
  const [artisans, setArtisans] = useState(artisansData);

  // console.log(artisans);
  return (
    <>
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

      <Search />

      <div className="container">
        {artisans.map((artisan) => (
          <ProfileCard artisan={artisan} />
        ))}
        {/* <ProfileCard artisans={artisans[1]} /> */}
      </div>
      <Footer />
    </>
  );
}

export default ArtisansPage;
