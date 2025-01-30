import axios from "axios";
import React, { useContext } from "react";
import { TermiiSMSContext } from "../../context/TermiiContext.jsx";

export default function SendMessagePage() {
  const { sendMessageFunction } = useContext(TermiiSMSContext);
  // function sendMessageFunction(object) {
  //   const options = {
  //     method: "POST",
  //     url: "https://api.sendchamp.com/api/v1/sms/send",
  //     headers: {
  //       accept: "application/json",
  //       "content-type": "application/json",
  //       Authorization: `Bearer sendchamp_live_$2y$10$.lpAz0y5oNTtuwrvbWqOdevgYa7DRO.2Zn1zM40TsVbU4wkFL09ae`,
  //     },
  //     data: {
  //       to: object.to,
  //       message: object.message,
  //       sender_name: "Grinders",
  //       route: "international",
  //     },
  //   };
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //       // return true;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  return (
    <div className="PaymentPage">
      <div className="header d-flex flex-md-row flex-column justify-content-between">
        <h3>Send Message Page</h3>
        <input
          type="text"
          className="form-control me-4"
          style={{ width: "200px" }}
          placeholder="Search Account"
        />
      </div>
      <hr />

      <button
        onClick={() => {
          sendMessageFunction({
            to: "2348137297150",
            message: "this is a test message from my code",
          });
        }}
      >
        Send test
      </button>
    </div>
  );
}
