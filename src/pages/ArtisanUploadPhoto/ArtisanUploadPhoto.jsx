// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import "./ArtisanUploadPhoto.scss";
import ModalImage from "../../components/ModalImage/ModalImage";
import altImg from "../../assets/images/hero-design.png";
import { toast } from "react-toastify";
import {UserContext} from "./../../context/UserContext";
import axios from "axios";
import { useCookies } from "react-cookie";

function ArtisanUploadPhoto() {
  const [photoList, setPhotoList] = useState([]);
  const [about, setAbout] = useState("");

  const [img_url, setImg_url] = useState("");
  const [imageFile, setImageFile] = useState("");

  const { apiUrl } = useContext(UserContext);
  const [cookies] = useCookies();

  function uploadImage(newPhoto) {
    console.log(newPhoto);
    // axios POST request
    const options = {
      // url: `http://localhost:5000/api/auth/user/login`,
      url: `${apiUrl}/upload/workImage`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: newPhoto,
    };

    axios(options)
      .then((response) => {
        if (response.data.ok) {
          toast.success("Uploaded successfully");
          setAbout("");
          setImg_url("");
          setImageFile("");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        toast.error(error.message);
      });
  }

  const handelSubmit = () => {
    if (img_url === "") {
      return toast.info("Select an image");
    }
    if (about === "") {
      return toast.info("fill fields before submit");
    }

    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("upload_preset", "oyieaesl");
    imageData.append("cloud_name", "dhvacnvek");

    console.log(imageFile);
    return;
    fetch("  https://api.cloudinary.com/v1_1/dhvacnvek/image/upload", {
      method: "post",
      body: imageData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        const newPhoto = {
          about,
          image: data.url,
        };
        uploadImage(newPhoto);
      })
      .catch((err) => console.log(err));
  };
  const imageHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg_url(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setImageFile(e.target.files[0]);
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
