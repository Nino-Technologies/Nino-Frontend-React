import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="btn p-3" onClick={() => navigate(-1)}>
      <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
    </button>
  ); 
}

export default BackButton;
