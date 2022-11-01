import axios from "axios";
import React from "react";

export default function SendMessagePage() {
  function sendMessageFunction(object) {
    const options = {
      method: "POST",
      url: "https://api.sendchamp.com/api/v1/sms/send",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer sendchamp_live_$2y$10$.lpAz0y5oNTtuwrvbWqOdevgYa7DRO.2Zn1zM40TsVbU4wkFL09ae`,
      },
      data: {
        to: object.to,
        message: object.message,
        sender_name: "Grinders",
        route: "international",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        // return true;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div>
      <button
        onClick={() => {
          sendMessageFunction({
            to: ["2348137297150"],
            message: "this is a test message from my code",
          });
        }}
      >
        Send test
      </button>
    </div>
  );
}
