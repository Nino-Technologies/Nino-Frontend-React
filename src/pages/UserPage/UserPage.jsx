import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./UserPage.scss";
import axios from "axios";

function UsersPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getUsers();
  }, []);
  const { apiUrl, decodeDate } = useContext(UserContext);
  async function getUsers() {
    const { token } = cookies.grinderUser;
    try {
      const resp = await axios.get(`${apiUrl}/users?role=0`, {
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
      <div class="table-responsive-sm">
        <table class="table">
          <thead class="thead-dark">
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
                    const { _id, fullName, email, phoneNumber, joinDate } =
                      user;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{fullName ? fullName : "-"}</td>
                        <td>{email}</td>
                        <td>{phoneNumber ? phoneNumber : "-"}</td>
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

export default UsersPage;
