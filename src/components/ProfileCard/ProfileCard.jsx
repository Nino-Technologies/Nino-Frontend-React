import { Link } from "react-router-dom"
// import SaveButton from "../SaveButton/SaveButton.jsx"

import { FaFacebook, FaRegClipboard, FaShareSquare, FaTrophy, FaTwitter, FaUser, FaUserCheck } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
// import ShareButton from "../ShareButton/ShareButton.jsx"
import { useState } from "react"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

import { FaShare } from "react-icons/fa"
import { toast } from "react-toastify"

function ProfileCard({ artisan }) {
  const {
    fullName,
    introduction,
    service,
    locationCity,
    locationState,
    _id,
    avatar,
    backgroundChecked,
    YearsOfExperience,
  } = artisan;

  const [showFullService, setShowFullService] = useState(false);

  const toggleService = () => setShowFullService(!showFullService);

  const getServicePreview = (text, length = 20) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <div
      className="card shadow-sm border-0 rounded-4 overflow-hidden"
      style={{ maxWidth: "100%", width: "500px", minHeight: "320px" }}
    >
      <div className="row g-0 h-100">
        {/* Profile Image */}
        <div className="col-md-4 position-relative">
          <img
            src={avatar || "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png"}
            alt={`${fullName}'s profile`}
            className="img-fluid h-100 w-100 object-fit-cover"
            style={{ objectFit: "cover" }}
          />
          {backgroundChecked && (
            <span className="position-absolute top-0 end-0 m-2 badge bg-success d-flex align-items-center gap-1 px-2 py-1 rounded-pill">
              <FaUserCheck /> Verified
            </span>
          )}
        </div>

        {/* Content */}
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            {/* Name, stars, actions */}
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="fw-bold mb-1">{fullName}</h5>
                <StarComponent rate="5" />
              </div>
              <div className="d-flex gap-2">
                <ShareButton id={_id} />
                <SaveButton artisan={artisan} />
              </div>
            </div>

            {/* Intro */}
            <div className="mt-3">
              <h6 className="text-muted mb-1 small">Introduction</h6>
              <p className="mb-2 small">
                {/* {introduction} */}
                {showFullService ? introduction : getServicePreview(introduction)}
                {introduction.length > 20 && (
                  <span
                    onClick={toggleService}
                    className="text-primary ms-2"
                    role="button"
                    style={{ cursor: "pointer", fontWeight: "500" }}
                  >
                    {showFullService ? "Read Less" : "Read More"}
                  </span>
                )}
              </p>
            </div>

            {/* Service */}
            <div>
              <h6 className="text-muted mb-1 small">Service</h6>
              <p className="mb-2 small">
                <span>
                  {service}
                </span>

              </p>
            </div>

            {/* Overview */}
            <ul className="list-unstyled mb-3">
              <li className="d-flex align-items-center mb-1 small text-dark">
                <FaTrophy className="me-2 text-warning" />
                {YearsOfExperience} years of experience
              </li>
              <li className="d-flex align-items-center mb-1 small text-dark">
                <GoLocation className="me-2 text-primary" />
                {locationCity}, {locationState}
              </li>
              {backgroundChecked && (
                <li className="d-flex align-items-center mb-1 small text-success">
                  <FaUserCheck className="me-2" />
                  Background checked
                </li>
              )}
            </ul>

            {/* View Profile Button */}
            <div className="mt-auto pt-2 border-top">
              <Link
                to={`/artisans-profile/${_id}`}
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <FaUser /> View Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProfileCard



function SaveButton({ artisan }) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(!saved)
    // Save functionality
    console.log(`${saved ? "Unsaving" : "Saving"} artisan: ${artisan.fullName}`)
  }

  return (
    <button
      onClick={handleSave}
      className={`btn btn-sm ${saved ? "btn-primary" : "btn-outline-primary"}`}
      title={saved ? "Saved to favorites" : "Save to favorites"}
    >
      {saved ? <FaBookmark className="me-1" /> : <FaRegBookmark className="me-1" />}
      {saved ? "Saved" : "Save"}
    </button>
  )
}


function ShareButton({ id }) {
  const [visibility, setVisibility] = useState(false);
  function toggleVisibility() {
    setVisibility(!visibility);
  }
  const profileUrl = "https://www.grinders.ng/artisans-profile/" + id;
  async function copyURL(id) {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.info("Link Copied");
    } catch {
      toast.error("Error copying link");
    }
  }
  const handleShare = () => {
    // Share functionality
    console.log(`Sharing profile with ID: ${id}`)
  }

  return (
    // <button onClick={handleShare} className="btn btn-sm btn-outline-secondary" title="Share profile">
    //   <FaShare className="me-1" /> Share
    // </button>
    <div className="ShareButton ">
      <div
        className="Share-icons"
        style={!visibility ? { display: "none" } : null}
      >
        <a
          title="Share on facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`}
          target="_blank"
          rel="noopener"
        >
          <FaFacebook />
        </a>

        <a
          title="Share on facebook"
          href={`
https://twitter.com/intent/tweet?text=Service Provider%20profile ${profileUrl}&original_referer=${profileUrl}&related=clicktotweet
`}
          target="_blank"
          rel="noopener"
        >
          <FaTwitter />
        </a>
        <FaRegClipboard onClick={() => copyURL(id)} className="my-auto" />
      </div>
      <button htmlFor="toggle-share" onClick={() => toggleVisibility()}>
        <FaShareSquare /> Share
      </button>
    </div>
  )
}


function StarComponent({ rate }) {
  const rating = Number.parseFloat(rate)
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="d-flex align-items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-warning" />
      ))}

      {hasHalfStar && <FaStarHalfAlt className="text-warning" />}

      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-warning" />
      ))}

      <span className="ms-2 text-muted small">(5.0)</span>
    </div>
  )
}

// function ShareButton({ id }) {
//   const [visibility, setVisibility] = useState(false);
//   function toggleVisibility() {
//     setVisibility(!visibility);
//   }
//   const profileUrl = "https://www.grinders.ng/artisans-profile/" + id;
//   async function copyURL(id) {
//     try {
//       await navigator.clipboard.writeText(profileUrl);
//       toast.info("Link Copied");
//     } catch {
//       toast.error("Error copying link");
//     }
//   }
//   return (
//     <div className="ShareButton">
//       <div
//         className="Share-icons"
//         style={!visibility ? { display: "none" } : null}
//       >
//         <a
//           title="Share on facebook"
//           href={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`}
//           target="_blank"
//           rel="noopener"
//         >
//           <FaFacebook />
//         </a>

//         <a
//           title="Share on facebook"
//           href={`
// https://twitter.com/intent/tweet?text=Service Provider%20profile ${profileUrl}&original_referer=${profileUrl}&related=clicktotweet
// `}
//           target="_blank"
//           rel="noopener"
//         >
//           <FaTwitter />
//         </a>
//         <FaRegClipboard onClick={() => copyURL(id)} className="my-auto" />
//       </div>
//       <button htmlFor="toggle-share" onClick={() => toggleVisibility()}>
//         <FaShareSquare /> Share
//       </button>
//     </div>
//   );
// }