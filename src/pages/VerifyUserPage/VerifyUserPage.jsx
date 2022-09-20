import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./VerifyUserPage.scss";
import axios from "axios";

function VerifyUserPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [artisans, setArtisans] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getArtisans();
  }, []);
  const { apiUrl, decodeDate } = useContext(UserContext);
  async function getArtisans() {
    const { token } = cookies.grinderUser;
    try {
      const resp = await axios.get(`${apiUrl}/users?role=1`, {
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
              <th scope="col">NIN</th>
              <th scope="col">
                Location <br /> (city, state)
              </th>
              <th scope="col">Subscription</th>
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
                      status,
                      fullName,
                      email,
                      phoneNumber,
                      nin,
                      joinDate,
                    } = artisan;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{fullName}</td>
                        <td>{email}</td>
                        <td>{phoneNumber}</td>
                        <td>{nin ? nin : "-"}</td>
                        <td>
                          {locationCity}, {locationState}
                        </td>
                        <td>{freeAccount ? "none" : "paid"}</td>
                        <td>{decodeDate(joinDate)[0]}</td>
                        <td>
                          <button className="btn btn-primary mx-auto">
                            Action
                          </button>
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
