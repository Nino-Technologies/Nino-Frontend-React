import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {UserContext} from "../../context/UserContext";
import "./VerifyAdminsPage.scss";
import axios from "axios";
import { toast } from "react-toastify";
import AdminAction from "../../components/AdminAction/AdminAction";
import { SendMessageModalForm } from "../VerifyUserPage/VerifyUserPage";

function VerifyAdminsPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [profileNumber, setProfileNumber] = useState("");
  const [admins, setAdmins] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getAdmins();
  }, []);
  const { apiUrl, decodeDate, checkVerifiedFunction } = useContext(UserContext);
  const { token } = cookies.grinderUser;
  async function getAdmins() {
    // setPageLoading(true);
    try {
      const resp = await axios.get(`${apiUrl}/users?role=3`, {
        // const resp = await axios.get(`http://localhost:5000/api/users?role=3`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      // console.log(resp.data);
      setAdmins(resp.data.data.reverse());
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
        <h3>Verify Admins Accounts</h3>
        <input
          type="text"
          className="form-control me-4"
          style={{ width: "200px" }}
          placeholder="Search Account"
        />
      </div>
      <hr />
      <div className="table-responsive-sm" style={{ minHeight: "200px" }}>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th
                scope="col"
                style={{
                  width: "50px",
                  minWidth: "fit-content",
                }}
              >
                #
              </th>
              <th scope="col">Full name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col">Account verified</th>
              <th scope="col">Account Active</th>
              <th scope="col">Location</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {pageLoading ? (
            <div className="loading">Loading....</div>
          ) : (
            <>
              {" "}
              {admins.length === 0 ? (
                <div className="loading">No user record Found</div>
              ) : (
                <tbody>
                  {admins.map((user, i) => {
                    const {
                      _id,
                      fullName,
                      location,
                      email,
                      joinDate,
                      email_verified,
                      account_verified,
                      account_active,
                      number,
                      role,
                    } = user;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{fullName ? fullName : "-"}</td>
                        <td>
                          <div className="check-verify-div">
                            <div className="check-verify-icon">
                              {checkVerifiedFunction(email_verified)}
                            </div>
                            {email}
                          </div>
                        </td>
                        <td>{number ? number : "-"}</td>
                        <td>
                          {/* {account_verified
                            ?  */}
                          {checkVerifiedFunction(account_verified)}
                          {/* : "-"} */}
                        </td>
                        <td>
                          {/* {account_active
                            ? */}
                          {checkVerifiedFunction(account_active)}
                          {/* : "-"} */}
                        </td>
                        <td>{location ? location : "-"}</td>
                        <td>{decodeDate(joinDate)[0]}</td>
                        <td>
                          <AdminAction
                            phoneNumber={number}
                            role={role}
                            _id={_id}
                            reLoadListFunction={getAdmins}
                            setProfileNumber={setProfileNumber}
                            account_verified={account_verified}
                            account_active={account_active}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </>
          )}
        </table>
      </div>
    </div>
  );
}

export default VerifyAdminsPage;
