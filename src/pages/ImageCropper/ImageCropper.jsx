import React, { useState, useCallback } from "react";
// import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";  // Import `styled` from @mui/system
import { getOrientation } from "get-orientation/browser";
// import ImgDialog from "./imgDialog.js";
import { /*createImage,*/ getCroppedImg, getRotatedImage } from "./canvasUtils";
import "./imageCropper.scss";
// import BackButton from "../../components/BackButton/BackButton.jsx";
import { FaUpload } from "react-icons/fa";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

// Style your components using styled
const CropContainer = styled('div')({
  position: 'absolute',
  top: '20px',
  zIndex: '20',
});

const SliderContainer = styled('div')({
  // Add any specific styles for the slider container
});

const ImageCropper = ({ updateProfilePicture, profileImage }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      console.log("donee", { croppedImage });
      updateProfilePicture(croppedImage);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
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
          <CropContainer>
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
          </CropContainer>
          <div className="ImageCropper-controls-div">
            <SliderContainer>
              <b variant="overline">Zoom</b>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </SliderContainer>
            <SliderContainer>
              <b variant="overline">Rotation</b>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </SliderContainer>
            <div className="d-flex">
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
              >
                Show Result
              </Button>
              <Button variant="contained" color="primary">
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
        </React.Fragment>
      ) : (
        <>
          <div className="avatar-image">
            <div className="image-div">
              <img
                  src={profileImage || "https://i.ibb.co/DHhj1TSL/avatar-1577909-1280.png"}
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
};

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

export default ImageCropper;
