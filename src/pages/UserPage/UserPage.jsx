import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext.jsx";
import "./UserPage.scss";
import axios from "axios";
// import { toast } from "react-toastify";
import AdminAction from "../../components/AdminAction/AdminAction.jsx";
import { SendMessageModalForm } from "../VerifyUserPage/VerifyUserPage.jsx";

function UsersPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [profileNumber, setProfileNumber] = useState("");
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getUsers();
  }, []);
  const { apiUrl, decodeDate, checkVerifiedFunction } = useContext(UserContext);
  const { token } = cookies.grinderUser;
  async function getUsers() {
    // setPageLoading(true);
    try {
      const resp = await axios.get(`${apiUrl}/users?role=0`, {
        // const resp = await axios.get(`http://localhost:5000/api/users?role=0`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      // console.log(resp.data);
      setUsers(resp.data.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  return (
    <div className="VerifyUserPage">
      <SendMessageModalForm
        profileNumber={profileNumber}
        setProfileNumber={setProfileNumber}
      />
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
      <div className="table-responsive-sm">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ width: "50px", minWidth: "fit-content" }}>#</th>
              <th scope="col">Full name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col">Account verified</th>
              <th scope="col">Account Active</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>

          <tbody>
            {pageLoading ? (
              <tr>
                <td colSpan="8" className="loading">Loading...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="8" className="loading">No user record found</td>
              </tr>
            ) : (
                  users.map((user, i) => {
                    const {
                      _id,
                      fullName,
                      email,
                      phoneNumber,
                      joinDate,
                      email_verified,
                      account_verified,
                      account_active,
                      role,
                    } = user;

                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                    <td>{fullName || "-"}</td>
                    <td>
                      <div className="check-verify-div">
                        <div className="check-verify-icon">
                          {checkVerifiedFunction(email_verified)}
                        </div>
                        {email}
                      </div>
                    </td>
                    <td>{phoneNumber || "-"}</td>
                    <td>{checkVerifiedFunction(account_verified)}</td>
                    <td>{checkVerifiedFunction(account_active)}</td>
                    <td>{decodeDate(joinDate)[0]}</td>
                    <td>
                      <AdminAction
                        role={role}
                        _id={_id}
                        phoneNumber={phoneNumber}
                        setProfileNumber={setProfileNumber}
                        reLoadListFunction={getUsers}
                        account_verified={account_verified}
                        account_active={account_active}
                      />
                    </td>
                  </tr>
                );
                  })
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default UsersPage;
