import React from "react";
import verifiedBadgeImage from "../../assets/images/verified-badge.png";
import "./verifiedBadge.scss";

function VerifiedBadge() {
  return (
    <>
      <img
        className="verifiedBadge
      "
        src={verifiedBadgeImage}
        alt="verifiedBadge"
      />
    </>
  );
}

export default VerifiedBadge;
