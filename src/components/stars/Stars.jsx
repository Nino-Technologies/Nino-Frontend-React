import React from "react";
import "./StarComponent.scss";
import { FaStar } from "react-icons/fa";
// import profilePix from "../../assets/profile-pix.jpg";

function StarComponent({ rate }) {
  return (
    <>
      {[...Array(rate)].map((e, i) => (
        <span className="star" key={i}>
          <FaStar />
        </span>
      ))}
    </>
  );
}

export default StarComponent;

// export function StarImageComponent({ rate }) {
//   return (
//     <>
//       {[...Array(rate)].map((e, i) => (
//         <div className="starImage" key={i}>
//           <img src={profilePix} alt="" />
//         </div>
//       ))}
//       <div className="starImage">48</div>
//     </>
//   );
// }
