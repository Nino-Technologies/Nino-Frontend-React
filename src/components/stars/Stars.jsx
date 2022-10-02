import React from "react";
import "./StarComponent.scss";
import { FaRegStar, FaStar } from "react-icons/fa";
// import profilePix from "../../assets/profile-pix.jpg";

function StarComponent({ rate }) {
  return (
    <>
      {[...Array(parseInt(rate))].map((e, i) => (
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

export function ReviewStarComponent({ rate, setRate }) {
  return (
    <div className="rating">
      <span className="rating__result">{rate}/5</span>
      {rate < 1 ? (
        <FaRegStar className="rating__star" onClick={() => setRate(1)} />
      ) : (
        <FaStar className="rating__star" onClick={() => setRate(1)} />
      )}
      {rate < 2 ? (
        <FaRegStar className="rating__star" onClick={() => setRate(2)} />
      ) : (
        <FaStar className="rating__star" onClick={() => setRate(2)} />
      )}
      {rate < 3 ? (
        <FaRegStar className="rating__star" onClick={() => setRate(3)} />
      ) : (
        <FaStar className="rating__star" onClick={() => setRate(3)} />
      )}
      {rate < 4 ? (
        <FaRegStar className="rating__star" onClick={() => setRate(4)} />
      ) : (
        <FaStar className="rating__star" onClick={() => setRate(4)} />
      )}
      {rate < 5 ? (
        <FaRegStar className="rating__star" onClick={() => setRate(5)} />
      ) : (
        <FaStar className="rating__star" onClick={() => setRate(5)} />
      )}
    </div>
  );
}
