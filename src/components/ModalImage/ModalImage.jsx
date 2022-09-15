import React, { Fragment, useState } from "react";
import "./modalImage.scss";

const ModalImage = ({ imgUrl, about }) => {
  const [showModel, setShowModel] = useState({ display: "none" });
  const show = () => {
    setShowModel((prevState) => ({
      ...prevState,
      display: "block",
    }));
  };
  const close = () =>
    setShowModel((prevState) => ({
      ...prevState,
      display: "none",
    }));
  return (
    <Fragment>
      {/* <!-- Trigger the Modal --> */}
      {/* {console.log(about)} */}
      <img
        id="myImg"
        src={imgUrl}
        alt="Ads_Image"
        style={{ width: "100%", maxWidth: "350px" }}
        onClick={show}
      />

      {/* <!-- The Modal --> */}
      <div id="myModal" style={showModel} class="modal">
        {/* <!-- The Close Button --> */}
        <span class="close" onClick={close}>
          &times;
        </span>

        {/* <!-- Modal Content (The Image) --> */}

        <img
          src={imgUrl}
          className="modal-content"
          alt="Ads Model_Image"
          id="img01"
        />

        {/* <!-- Modal Caption (Image Text) --> */}
        <div className="caption">
          <b>About: </b>
          {about ? about : "Some quick example text to build on the card title"}
        </div>
      </div>
    </Fragment>
  );
};

export default ModalImage;
