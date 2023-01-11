import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./QuickRequestPage.scss";
import { toast } from "react-toastify";

function QuickRequestPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [quickRequests, setQuickRequests] = useState([]);

  const [cookies] = useCookies();
  useEffect(() => {
    getQuickRequests();
  }, []);
  const { apiUrl, decodeDate } = useContext(UserContext);
  async function getQuickRequests() {
    const { token } = cookies.grinderUser;
    try {
      const resp = await axios.get(`${apiUrl}/request`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      setQuickRequests(resp.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  return (
    <div className="QuickRequestPage">
      <div className="header d-flex flex-md-row flex-column justify-content-between">
        <h3>Quick Request</h3>
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
              <th scope="col">Sender</th>
              <th scope="col">Number</th>
              <th scope="col">Service Requested</th>
              <th scope="col">State</th>
              <th scope="col">City</th>
              <th scope="col">status </th>
              <th scope="col">Request Date </th>
              <th scope="col">Request Time </th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {pageLoading ? (
            <div className="loading">Loading....</div>
          ) : (
            <>
              {" "}
              {quickRequests.length === 0 ? (
                <div className="loading">No quick requests record Found</div>
              ) : (
                <tbody>
                  {quickRequests.map((payment, i) => {
                    const {
                      _id,
                      attendedTo,
                      locationCity,
                      locationState,
                      number,
                      requestedAt,
                      sender,
                      service,
                    } = payment;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{sender}</td>
                        <td>0{number}</td>
                        <td>{service}</td>
                        <td>{locationState}</td>
                        <td>{locationCity}</td>
                        <td>{attendedTo ? "Attended" : "Pending"}</td>
                        <td>{decodeDate(requestedAt)[0]}</td>
                        <td>{decodeDate(requestedAt)[1]}</td>
                        <td>
                          <ActionButton
                            _id={_id}
                            attendedTo={attendedTo}
                            getQuickRequests={getQuickRequests}
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

function ActionButton({ _id, attendedTo, getQuickRequests }) {
  const [actionLoading, setActionLoading] = useState(false);
  const [cookies] = useCookies();
  const { apiUrl } = useContext(UserContext);

  async function takeQuickRequestAction(data) {
    setActionLoading(true);
    const { token } = cookies.grinderUser;
    try {
      const resp = await axios.put(`${apiUrl}/request/action`, data, {
        headers: {
          authorization: token,
        },
      });
      getQuickRequests();
      setActionLoading(false);
      toast.success("Action taken successfully");
    } catch (err) {
      setActionLoading(false);
      toast.error("Action was not taken, try again"); // Handle Error Here
      console.error(err);
    }
  }
  return (
    <>
      {attendedTo ? (
        <button
          className="btn btn-danger btn-sm mx-auto"
          onClick={() =>
            takeQuickRequestAction({
              id: _id,
              attendedTo: false,
            })
          }
          disabled={actionLoading}
        >
          {actionLoading ? "Taking action..." : " not Attended"}
        </button>
      ) : (
        <button
          className="btn btn-primary btn-sm mx-auto"
          onClick={() =>
            takeQuickRequestAction({
              id: _id,
              attendedTo: true,
            })
          }
          disabled={actionLoading}
        >
          {actionLoading ? "Taking action..." : "  Attend to"}
        </button>
      )}
    </>
  );
}

export default QuickRequestPage;
