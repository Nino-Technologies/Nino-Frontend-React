import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@mui/material//Slider";
import Button from "@mui/material//Button";
import Typography from "@mui/material//Typography";
import { withStyles } from "@mui/material/styles";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./imgDialog";
import { createImage, getCroppedImg, getRotatedImage } from "./canvasUtils";
import { styles } from "./styles";
import "./imageCropper.scss";
import BackButton from "../../components/BackButton/BackButton";
import { FaFileImage, FaImage, FaUpload } from "react-icons/fa";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

function ImageCropper({
  classes,
  updateProfilePicture,
  profileImage,
  // setProfileImageFile,
}) {
  // console.log(currentImage);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const onClose = useCallback(() => {
  //   setCroppedImage(null);
  // }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      updateProfilePicture(croppedImage);
      // setCroppedImage(croppedImage);
      // setCroppedImage(null);
      setImageSrc(null);
      // this.onClose();
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  // ------------------------------- check size of image before push --------------------------------------
  // useEffect(
  //   function () {
  //     // document
  //     //   .querySelector("#selectImageInput1")
  //     //   .addEventListener("change", function (event) {
  //         var _size = this.files[0].size;
  //         var fSExt = new Array("Bytes", "KB", "MB", "GB"),
  //           i = 0;
  //         while (_size > 900) {
  //           _size /= 1024;
  //           i++;
  //         }
  //         var exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
  //         console.log("FILE SIZE = ", exactSize);
  //         alert(exactSize);
  //       // });
  //   },
  //   [imageSrc]
  // );
  // ------------------------------- < check size of image before push /> --------------------------------------

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      // setProfileImageFile(file);
      // console.log(blobToFile(profileImage));
      // console.log(profileImage);
      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          {/* <div className={classes.cropContainer}> */}

          <div style={{ position: "absolute", top: "20px", zIndex: "20" }}>
            {/* <BackButton /> */}
          </div>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={`ImageCropper-controls-div ${classes.controls}`}>
            <div className={classes.sliderContainer}>
              <b variant="overline" classes={{ root: classes.sliderLabel }}>
                Zoom
              </b>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <b variant="overline" classes={{ root: classes.sliderLabel }}>
                Rotation
              </b>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                classes={{ root: classes.slider }}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <div className="d-flex">
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
                className={`ImageCropper-controls-button`}
              >
                Show Result
              </Button>
              <Button
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
                className={`ImageCropper-controls-button ms-3`}
              >
                <label htmlFor="selectImageInput">Change</label>
              </Button>
            </div>
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            onChange={onFileChange}
            id="selectImageInput"
            accept="image/*"
          />

          {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
        </React.Fragment>
      ) : (
        <>
          <div className="avatar-image">
            <div className="image-div">
              <img
                src={
                  profileImage
                    ? profileImage
                    : // : "blob:http://localhost:3000/023c05de-6d17-4bf2-bc75-8de3499dfb1c"
                      "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png"
                }
                // src=
                alt="Person - Avatar Placeholder"
              />
            </div>
            <label htmlFor="selectImageInput1" className="icon">
              <FaUpload />
            </label>
          </div>
          <input
            type="file"
            id="selectImageInput1"
            onChange={onFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </>
      )}
    </div>
  );
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsDataURL(file);
  });
}

const ImageCropperWithStyle = withStyles(styles)(ImageCropper);
export default ImageCropperWithStyle;
