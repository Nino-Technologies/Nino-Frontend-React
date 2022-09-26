import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./VerifyUserPage.scss";
import axios from "axios";
import VerifiedBadge from "../../components/verifiedBadge/verifiedBadge";
import { FaExclamation } from "react-icons/fa";
import { toast } from "react-toastify";
import AdminAction from "../../components/AdminAction/AdminAction";

function VerifyUserPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [artisans, setArtisans] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getArtisans();
  }, []);
  const { apiUrl, decodeDate, checkVerifiedFunction } = useContext(UserContext);
  const { token } = cookies.grinderUser;
  async function getArtisans() {
    try {
      const resp = await axios.get(`${apiUrl}/users?role=1`, {
        // const resp = await axios.get(`http://localhost:5000/users?role=1`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      // console.log(resp.data);
      setArtisans(resp.data.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

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
      <div className="table-responsive-sm">
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
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th scope="col">Service</th>
              <th scope="col">NIN</th>
              <th scope="col">
                Location <br /> (city, state)
              </th>
              <th scope="col">Subscription</th>
              <th scope="col">Account verified</th>
              <th scope="col">Account Active</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {pageLoading ? (
            <div className="loading">Loading....</div>
          ) : (
            <>
              {" "}
              {artisans.length === 0 ? (
                <div className="loading">No payments record Found</div>
              ) : (
                <tbody>
                  {artisans.map((artisan, i) => {
                    const {
                      _id,
                      freeAccount,
                      locationState,
                      locationCity,
                      fullName,
                      email,
                      email_verified,
                      phoneNumber,
                      service,
                      nin,
                      account_verified,
                      account_active,
                      role,
                      joinDate,
                    } = artisan;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{fullName}</td>
                        <td>+234{phoneNumber}</td>
                        <td>
                          <div className="check-verify-div">
                            <div className="check-verify-icon">
                              {checkVerifiedFunction(email_verified)}
                            </div>
                            {email}
                          </div>
                        </td>
                        <td>{service}</td>
                        <td>{nin ? nin : "-"}</td>
                        <td>
                          {locationCity}, {locationState}
                        </td>
                        <td>{freeAccount ? "none" : "paid"}</td>
                        <td>{checkVerifiedFunction(account_verified)}</td>
                        <td>{checkVerifiedFunction(account_active)}</td>
                        <td>{decodeDate(joinDate)[0]}</td>
                        <td>
                          <AdminAction
                            role={role}
                            _id={_id}
                            reLoadListFunction={getArtisans}
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

export default VerifyUserPage;
