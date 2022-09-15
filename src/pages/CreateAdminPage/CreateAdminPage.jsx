import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import "./CreateAdminPage.scss";
import AdminRegistrationForm from "../../components/RegistrationForm/AdminRegistrationForm";

function CreateAdminPage() {
  return (
    <div className="CreateAdminPage pt-5">
      <div className="header d-flex justify-content-between">
        <h3>Create Admin</h3>
      </div>
      <hr />
      <AdminRegistrationForm />
    </div>
  );
}

export default CreateAdminPage;
