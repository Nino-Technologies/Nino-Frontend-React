import React from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

function CloudinaryUploadProfileButton({
  updateProfilePicture,
  avatar,
  formComplete,
}) {
  // function handelOpenWidget() {}
  function handelOpenWidget() {
    var myCropWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhvacnvek",
        uploadPreset: "profile-picture-upload",
        folder: "ProfileImage",
        cropping: true,
        croppingCoordinatesMode: "face",
      },
      (error, result) => {
        // console.log(error, result);
        if (error) {
          return console.error(error);
        }
        // if (result.event === "success" && result.info.files.length!== 0){
        if (result.event === "success" && result.info) {
          // console.log(result.info.eager[0].url);
          console.log(result.info.url);
          updateProfilePicture(result.info.url);
        }
      }
    );
    myCropWidget.open();
  }
  return (
    <div>
      <>
        <div className="avatar-image">
          <div className="image-div">
            <img
              src={
                avatar
                  ? avatar
                  : "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png"
              }
              alt="Person - Avatar Placeholder"
            />
          </div>
          <label htmlFor="selectImageInput1" className="icon">
            <FaUpload />
          </label>
        </div>
        <input
          type="button"
          id="selectImageInput1"
          // onChange={onFileChange}
          style={{ display: "none" }}
          onClick={() => {
            if (!formComplete) {
              return toast.info("Complete registration form to upload...");
            }

            handelOpenWidget();
          }}
        />
      </>
      {/* <button
        onClick={() => {
          handelOpenWidget();
        }}
      >
        Upload
      </button> */}
    </div>
  );
}

export default CloudinaryUploadProfileButton;
