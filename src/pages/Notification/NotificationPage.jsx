import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./NotificationPage.css";
import ModalComponent from "../../components/Modal/ModalComponent";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";
function NotificationPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [notification, setNotification] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getNotification();
  }, []);
  const { apiUrl, decodeDate } = useContext(UserContext);

  async function getNotification() {
    // setPageLoading(true);
    const { token } = cookies.grinderUser;
    try {
      const resp = await axios.get(`${apiUrl}/notification`, {
        headers: {
          authorization: token,
        },
      });
      setPageLoading(false);
      // console.log(resp.data);
      setNotification(resp.data.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  return (
    <div className="NotificationPage pt-5">
      <div className="header d-flex justify-content-between">
        <h3>Notification</h3>
      </div>
      <hr />
      <ul>
        {pageLoading ? (
          <li className="loading">Loading....</li>
        ) : (
          <>
            {" "}
            {notification.length === 0 ? (
              <li className="loading">No Notification Found</li>
            ) : (
              notification.map((notification) => {
                const { _id, message, sentDate } = notification;
                return (
                  <li key={_id}>
                    <span className="w-100 me-4">
                      <sup className="d-inline d-md-flex justify-content-between  mt-2 mb-0 flex-wrap">
                        <div className="date ms-md-auto my-2 ">
                          {decodeDate(sentDate)[0]}
                          {/* , {decodeDate(sentDate)[1]} */}
                          {/* {date} */}
                        </div>
                      </sup>
                      <hr className="my-0 mb-2" />
                      {message}
                    </span>
                  </li>
                );
              })
            )}
          </>
        )}
      </ul>
    </div>
  );
}

export default NotificationPage;
