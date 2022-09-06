import React from "react";
import "./PageLoading.scss";

function PageLoading({ children, loadingStateError }) {
  return (
    <div className={`PageLoading ${loadingStateError ? "error" : null}`}>
      {children}.
    </div>
  );
}

export default PageLoading;
