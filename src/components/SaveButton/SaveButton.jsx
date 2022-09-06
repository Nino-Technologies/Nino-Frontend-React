import React, { useState } from "react";
import { GiHeartPlus, GiHeartMinus } from "react-icons/gi";
import "./SaveButton.scss";

function SaveButton() {
  const [save, setSave] = useState(false);
  function toggleSave() {
    setSave(!save);
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
