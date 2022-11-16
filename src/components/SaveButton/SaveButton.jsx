import React, { useContext } from "react";
import { GiHeartPlus, GiHeartMinus } from "react-icons/gi";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import "./SaveButton.scss";
import { SaveArtisanContext } from "./../../context/saveUserContext";

function SaveButton({ artisan }) {
  const { saveArtisan, savedArtisanIds } = useContext(SaveArtisanContext);
  const { loggedIn, userProfile } = useContext(UserContext);
  function toggleSave() {
    if (!loggedIn) {
      return toast.info("Login to save Artisan");
    }
    if (userProfile.role !== 0) {
      return toast.info("Account type can not save favorite artisan");
    }
    saveArtisan(artisan);
  }
  return (
    <div className="SaveButton">
      {savedArtisanIds.includes(artisan._id) ? (
        <GiHeartMinus className="icon remove" onClick={() => toggleSave()} />
      ) : (
        <GiHeartPlus className="icon add" onClick={() => toggleSave()} />
      )}
    </div>
  );
}

export default SaveButton;
