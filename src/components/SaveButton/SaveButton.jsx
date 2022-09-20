import React, { useContext, useState } from "react";
import { GiHeartPlus, GiHeartMinus } from "react-icons/gi";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import "./SaveButton.scss";

function SaveButton() {
  const [save, setSave] = useState(false);
  const { loggedIn, setUserProfile } = useContext(UserContext);
  function toggleSave() {
    if (!loggedIn) {
      return toast.info("Login to save Artisan");
    }
    if (setUserProfile.role !== 0) {
      return toast.info("Account type can not save favorite artisan");
    }
    let msg;

    if (save) {
      msg = "Artisan removed from favorite";
    } else {
      msg = "Artisan saved to favorite";
    }
    setSave(!save);
    toast.info(msg);
  }
  return (
    <div className="SaveButton">
      {save ? (
        <GiHeartMinus className="icon remove" onClick={() => toggleSave()} />
      ) : (
        <GiHeartPlus className="icon add" onClick={() => toggleSave()} />
      )}
    </div>
  );
}

export default SaveButton;
