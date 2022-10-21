import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => console.log(navigate(-1))}>
      <FaArrowLeft /> <span className="d-none d-md-block">Back</span>
    </button>
  );
}

export default BackButton;
