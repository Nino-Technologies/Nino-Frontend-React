import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./UserPage.scss";
import axios from "axios";
import { toast } from "react-toastify";

function UsersPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getUsers();
  }, []);
  const { apiUrl, decodeDate, checkVerifiedFunction, adminActionFunction } =
    useContext(UserContext);
  const { token } = cookies.grinderUser;
  async function getUsers() {
    setPageLoading(true);
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
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
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
              {users.length === 0 ? (
                <div className="loading">No user record Found</div>
              ) : (
                <tbody>
                  {users.map((user, i) => {
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
                    console.log(account_active);
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
                        <td>{phoneNumber ? phoneNumber : "-"}</td>
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
                        <td>{decodeDate(joinDate)[0]}</td>
                        <td>
                          {/* <button className="btn btn-primary mx-auto">
                            Action
                          </button> */}
                          <div class="btn-group" role="group">
                            <button
                              id="btnGroupDrop1"
                              type="button"
                              class="btn btn-primary btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="btnGroupDrop1"
                            >
                              {account_verified ? (
                                <>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={() => {
                                        // console.log("Verify Account: " + _id);
                                        adminActionFunction(
                                          "unVerify",
                                          role,
                                          _id
                                        );
                                      }}
                                    >
                                      UnVerify Account
                                    </a>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={() => {
                                        // console.log("Verify Account: " + _id);
                                        adminActionFunction(
                                          "verify",
                                          role,
                                          _id
                                        );
                                      }}
                                    >
                                      Verify Account
                                    </a>
                                  </li>
                                </>
                              )}
                              {account_active ? (
                                <>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={() => {
                                        adminActionFunction("block", role, _id);
                                      }}
                                    >
                                      Block Account
                                    </a>
                                  </li>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={() => {
                                        // console.log("Verify Account: " + _id);
                                        adminActionFunction(
                                          "activate",
                                          role,
                                          _id
                                        );
                                      }}
                                    >
                                      Activate Account
                                    </a>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
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

export default UsersPage;
