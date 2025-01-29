import React from "react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

function CloudinaryUploadProfileButton({
  updateProfilePicture,
  avatar,
  formComplete,
}) {
  // const [widgetLoading, setWidgetLoading] = useState(false);
  function handelOpenWidget() {
    // setWidgetLoading(true);
    var myCropWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhvacnvek",
        uploadPreset: "profile-picture-upload",
        folder: "ProfileImage",
        cropping: true,
        croppingCoordinatesMode: "face",
        sources: ["local", "camera"],
        croppingShowDimensions: true,
      },
      (error, result) => {
        // console.log(error, result);
        if (error) {
          return console.error(error);
        }
        // if (result.event === "success" && result.info.files.length!== 0){
        if (result.event === "success" && result.info) {
          // console.log(result.info.eager[0].url);
          toast.success("image uploaded successfully");
          // console.log(result.info.url);
          updateProfilePicture(result.info.url);
          // setWidgetLoading(false);
          myCropWidget.hide();
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
                  : "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png"
              }
              alt="Person - Avatar Placeholder"
            />
          </div>
          <label htmlFor="selectImageInput1" className="icon">
            {/* {widgetLoading ? <span className="fs-5">...</span> :  */}
            <FaUpload />
            {/*  } */}
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
