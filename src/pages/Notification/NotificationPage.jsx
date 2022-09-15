import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./NotificationPage.css";
import ModalComponent from "../../components/Modal/ModalComponent";
function NotificationPage() {
  const [notification, setNotification] = useState([
    {
      _id: "324ertfgh",
      message: "Notification test1",
      privilege: "*",
      date: "date",
    },
    {
      _id: "324ertfgh",
      message: "Notification test1",
      privilege: "*",
      date: "date",
    },
    {
      _id: "324ertfgh",
      message: "Notification test1",
      privilege: "*",
      date: "date",
    },
  ]);
  // useEffect(() => {
  //   getNotification();
  // }, []);
  // const token = localStorage.getItem("telecomMerchantToken");
  // const { apiUrl, getUserPrivilege, decodeDate } = useContext(UserContext);

  // async function getNotification() {
  //   try {
  //     const resp = await axios.get(`${apiUrl}/notification`, {
  //       headers: {
  //         authorization: token,
  //       },
  //     });

  //     // console.log(resp.data);
  //     setNotification(resp.data.data.reverse());
  //   } catch (err) {
  //     // Handle Error Here
  //     console.error(err);
  //   }
  // }
  // async function markHasSeen(id) {
  //   // e.preventDefault();
  //   // const historyId = e.target.parentElement.getAttribute("data-id");
  //   const historyId = id;
  //   let confirmMessage;

  //   if (id === "*") {
  //     confirmMessage = "All Notification Will be Marked has seen!!!";
  //   } else {
  //     confirmMessage = "This Notification Will be Marked has seen!!!";
  //   }

  //   if (!window.confirm(confirmMessage)) {
  //     return;
  //   }
  //   // console.log(historyId);
  //   try {
  //     // console.log(resp.data);
  //   } catch (err) {
  //     // Handle Error Here
  //     console.error(err);
  //   }
  // }
  // console.log(notification);

  return (
    <div className="NotificationPage pt-5">
      <div className="header d-flex justify-content-between">
        <h3>Notification</h3>
      </div>
      <hr />
      <ul>
        {notification.length === 0 ? (
          <div className="notFound">No Notification Found</div>
        ) : (
          notification.map((notification) => {
            const { _id, aId, message, privilege, date, adminName } =
              notification;
            return (
              <li key={_id} data-id={_id}>
                <span className="w-100 me-4">
                  <sup className="d-inline d-md-flex justify-content-between  mt-2 mb-0 flex-wrap">
                    <div className="date ms-md-auto my-2 ">
                      {/* {decodeDate(date)[0]}, {decodeDate(date)[1]} */}
                      {date}
                    </div>
                  </sup>
                  <hr className="my-0 mb-2" />
                  {message}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default NotificationPage;
