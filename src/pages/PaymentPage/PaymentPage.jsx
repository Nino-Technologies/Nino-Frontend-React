import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./PaymentPage.scss";

function PaymentPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getPayments();
  }, []);
  const { apiUrl, decodeDate } = useContext(UserContext);
  async function getPayments() {
    const { token } = cookies.grinderUser;
    try {
      const resp = await axios.get(`${apiUrl}/payments`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      // console.log(resp.data);
      setPayments(resp.data.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  return (
    <div className="PaymentPage">
      <div className="header d-flex flex-md-row flex-column justify-content-between">
        <h3>Subscribers</h3>
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
              <th scope="col">Amount</th>
              <th scope="col">Receipt No</th>
              <th scope="col">Artisan Id </th>
              <th scope="col">Account type</th>
              <th scope="col">Payment status </th>
              <th scope="col">Date paid</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {pageLoading ? (
            <div className="loading">Loading....</div>
          ) : (
            <>
              {" "}
              {payments.length === 0 ? (
                <div className="loading">No payments record Found</div>
              ) : (
                <tbody>
                  {payments.map((payment, i) => {
                    const {
                      _id,
                      uId,
                      uRole,
                      status,
                      fullName,
                      email,
                      reference,
                      amount,
                      paidDate,
                    } = payment;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{fullName}</td>
                        <td>{email}</td>
                        <td>{amount}</td>
                        <td>{reference}</td>
                        <td>{uId}</td>
                        <td>{uRole === 1 ? "Artisan" : ""}</td>
                        <td>{status}</td>
                        <td>{decodeDate(paidDate)[0]}</td>
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

export default PaymentPage;
