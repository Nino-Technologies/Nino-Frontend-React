import { Link } from "react-router-dom"
// import SaveButton from "../SaveButton/SaveButton.jsx"

import { FaTrophy, FaUser, FaUserCheck } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
// import ShareButton from "../ShareButton/ShareButton.jsx"
import { useState } from "react"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

import { FaShare } from "react-icons/fa"

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
  } = artisan

  return (
    <div className=" card border-0 shadow-sm mb-4 overflow-hidden" style={{}}>
      <div className="row g-0">
        {/* Profile Image Column */}
        <div className="col-md-4 position-relative">
          <img
            src={avatar === "" ? "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png" : avatar}
            alt={`${fullName}'s profile`}
            className="img-fluid h-100 w-100 object-fit-cover"
            style={{ minHeight: "250px" }}
          />
          {backgroundChecked && (
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-success d-flex align-items-center p-2">
                <FaUserCheck className="me-1" /> Verified
              </span>
            </div>
          )}
        </div>

        {/* Profile Info Column */}
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            {/* Header with name and rating */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h3 className="card-title fw-bold mb-1">{fullName}</h3>
                <div className="mb-2">
                  <StarComponent rate="5" />
                </div>
              </div>
              <div className="d-flex gap-2">
                <ShareButton id={`${_id}`} />
                <SaveButton artisan={artisan} />
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-3">
              <h6 className="text-secondary mb-1">Introduction</h6>
              <p className="card-text">{introduction}</p>
            </div>

            {/* Service */}
            <div className="mb-3">
              <h6 className="text-secondary mb-1">Service</h6>
              <p className="card-text">{service}</p>
            </div>

            {/* Overview */}
            <div className="mb-3">
              <h6 className="text-secondary mb-1">Overview</h6>
              <ul className="list-group list-group-flush border-0">
                <li className="list-group-item px-0 py-1 d-flex align-items-center border-0">
                  <FaTrophy className="text-warning me-2" />
                  <span>{YearsOfExperience} years of experience</span>
                </li>
                <li className="list-group-item px-0 py-1 d-flex align-items-center border-0">
                  <GoLocation className="text-primary me-2" />
                  <span>
                    {locationCity}, {locationState}
                  </span>
                </li>
                {backgroundChecked && (
                  <li className="list-group-item px-0 py-1 d-flex align-items-center border-0">
                    <FaUserCheck className="text-success me-2" />
                    <span>Background checked</span>
                  </li>
                )}
              </ul>
            </div>

            {/* View Profile Link */}
            <div className="mt-auto pt-2 border-top">
              <Link
                to={`/artisans-profile/${_id}`}
                className="btn btn-outline-primary d-flex align-items-center gap-2 w-100 justify-content-center"
              >
                <FaUser /> View Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
  const handleShare = () => {
    // Share functionality
    console.log(`Sharing profile with ID: ${id}`)
  }

  return (
    <button onClick={handleShare} className="btn btn-sm btn-outline-secondary" title="Share profile">
      <FaShare className="me-1" /> Share
    </button>
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