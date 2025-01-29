import React, { useContext, useEffect, useState } from "react";
import { GiHeartPlus, GiHeartMinus } from "react-icons/gi";
import { toast } from "react-toastify";
import {UserContext} from "../../context/UserContext";
import "./SaveButton.scss";
import { SaveArtisanContext } from "./../../context/saveUserContext";

function SaveButton({ artisan }) {
  const { saveArtisan, removeArtisan, savedArtisanIds } =
    useContext(SaveArtisanContext);
  const [saveLoading, setSaveLoading] = useState(false);
  const { loggedIn, userProfile } = useContext(UserContext);
  useEffect(() => {
    if (saveLoading) {
      setSaveLoading(false);
      return;
    }
  }, [userProfile]);
  function toggleSave() {
    setSaveLoading(true);
    if (!loggedIn) {
      setSaveLoading(false);
      return toast.info("Login to save Artisan");
    }
    if (userProfile.role !== 0) {
      setSaveLoading(false);
      return toast.info("Account type can not save favorite artisan");
    }

    saveArtisan(artisan);
  }
  function toggleRemove() {
    setSaveLoading(true);
    if (!loggedIn) {
      setSaveLoading(false);
      return toast.info("Login to save Artisan");
    }
    if (userProfile.role !== 0) {
      setSaveLoading(false);
      return toast.info("Account type can not save favorite artisan");
    }
    removeArtisan(artisan._id);
  }
  return (
    <div className="SaveButton">
      {savedArtisanIds.includes(artisan._id) ? (
        <>
          {" "}
          {saveLoading ? (
            <>...</>
          ) : (
            <GiHeartMinus
              className="icon remove"
              onClick={() => toggleRemove()}
            />
          )}
        </>
      ) : (
        <>
          {" "}
          {saveLoading ? (
            <>...</>
          ) : (
            <GiHeartPlus className="icon add" onClick={() => toggleSave()} />
          )}
        </>
      )}
    </div>
  );
}

export default SaveButton;
