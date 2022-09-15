import React from "react";
import "./VerifyUserPage.scss";

function VerifyUserPage() {
  return (
    <div className="VerifyUserPage">
      <div className="header d-flex flex-md-row flex-column justify-content-between">
        <h3>Verify Accounts</h3>
        <input
          type="text"
          className="form-control me-4"
          style={{ width: "200px" }}
          placeholder="Search Account"
        />
      </div>
      <hr />

      <div class="table-responsive-sm">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th scope="col">NIN</th>
              <th scope="col">Location (city, state)</th>
              <th scope="col">Account type</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerifyUserPage;
