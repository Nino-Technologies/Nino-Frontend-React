import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";

import "./SavedArtisanPage.scss";
import { SaveArtisanContext } from "../../context/saveUserContext.jsx";
import { GiHeartMinus } from "react-icons/gi";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

function SavedArtisanPage() {
  const { userProfile } = useContext(UserContext);
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedArtisans, setSavedArtisans] = useState({
    loading: true,
    data: [],
  });
  function toggleRemove(id) {
    removeArtisan(id);
  }
  const { removeArtisan } = useContext(SaveArtisanContext);
  useEffect(() => {
    if (userProfile.saved_artisans) {
      setSavedArtisans({ loading: false, data: userProfile.saved_artisans });
    }
  }, [userProfile]);
  console.log();
  return (
    <div className="SavedArtisanPage pt-5">
      <div className="header d-flex justify-content-between">
        <h3>Saved Artisan</h3>
      </div>
      <hr />
      <div className="main-div mt-3">
        {savedArtisans.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {savedArtisans.data.length === 0 ? (
              <>No saved artisan found</>
            ) : (
              <>
                {savedArtisans.data.map((artisan) => (
                  <div className="row border p-2 my-3" key={artisan.artisanId}>
                    <div className="col-md-2">
                      <Link to={`/artisans-profile/${artisan.artisanId}`}>
                        <div className="image-div">
                          <img
                            src={`${
                              artisan.avatar === ""
                              ? "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png"
                                : artisan.avatar
                            }`}
                            alt="Profile picture"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-10 ">
                      <div className="d-flex justify-content-between flex-column flex-md-row">
                        <Link
                          className="col w-75  w-100 p-3"
                          to={`/artisans-profile/${artisan.artisanId}`}
                        >
                          {" "}
                          <b className="d-block  ">{artisan.artisanName}</b>
                          <span className="d-block ">
                            <b>Service:</b> {artisan.artisanService}
                          </span>
                          <b>City:</b> {artisan.artisanLocation.city},{" "}
                          <b>State: </b>
                          {artisan.artisanLocation.state}
                        </Link>
                        <div className="col my-auto social-div d-flex justify-content-end">
                          {" "}
                          <div className="SaveButton">
                            {saveLoading ? (
                              <>...</>
                            ) : (
                              <GiHeartMinus
                                className="icon remove ms-3"
                                onClick={() => toggleRemove(artisan.artisanId)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SavedArtisanPage;
