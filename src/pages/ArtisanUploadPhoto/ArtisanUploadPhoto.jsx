// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import "./ArtisanUploadPhoto.scss";
import ModalImage from "../../components/ModalImage/ModalImage";
import altImg from "../../assets/images/hero-design.png";
import { toast } from "react-toastify";

function ArtisanUploadPhoto() {
  const [photoList, setPhotoList] = useState([]);
  const [about, setAbout] = useState("");

  const [img_url, setImg_url] = useState("");
  const handelSubmit = () => {
    if (img_url !== "") {
      if (about !== "") {
        const newPhoto = {
          about,
          imgUrl: img_url,
        };
        console.log(img_url);
        setPhotoList([...photoList, newPhoto]);
      } else {
        toast.info("fill fields before submit");
      }
    } else {
      toast.info("Select an image");
    }
  };
  const imageHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg_url(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <section id="post-photo-form">
      <div className="container">
        <div className="row">
          <div className="img-div">
            {img_url === "" ? (
              "Select image"
            ) : (
              <img className="img" src={img_url} alt="img" />
            )}
          </div>
          <label className="btn btn-primary" htmlFor="img-input">
            select an image
          </label>
        </div>
        <div className="flexbox">
          <div className="item">
            <input
              type="file"
              name=""
              style={{ display: "none" }}
              id="img-input"
              onChange={(e) => imageHandler(e)}
            />
          </div>
          <textarea
            className="form-control my-1"
            rows={5}
            id="dropdownCheck "
            placeholder="About photo"
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        <button
          className="btn btn-secondary  my-4"
          onClick={() => handelSubmit()}
        >
          submit
        </button>
      </div>
      <hr />
      {photoList.map((photo) => (
        <ModalImage
          imgUrl={photo.imgUrl ? photo.imgUrl : { altImg }}
          about={
            about ? about : "Some quick example text to build on the card title"
          }
        />
      ))}
    </section>
  );
}

export default ArtisanUploadPhoto;
