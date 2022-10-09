import React from "react";
import "./PasswordResetPage.scss";
import Nav from "../../components/Nav/Nav";
import PasswordReset from "../../components/PasswordResetForm/PasswordResetForm";

function PasswordResetPage() {
  return (
    <div className="reset">
      <Nav />
      <PasswordReset />
    </div>
  );
}

export default PasswordResetPage;
