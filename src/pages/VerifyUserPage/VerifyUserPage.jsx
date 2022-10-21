import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./VerifyUserPage.scss";
import axios from "axios";
import VerifiedBadge from "../../components/verifiedBadge/verifiedBadge";
import { FaExclamation } from "react-icons/fa";
import { toast } from "react-toastify";
import AdminAction from "../../components/AdminAction/AdminAction";
import ModalComponent from "../../components/Modal/ModalComponent";

function VerifyUserPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [artisans, setArtisans] = useState([]);
  const [artisanProfile, setArtisanProfile] = useState({});
  const [cookies] = useCookies();
  useEffect(() => {
    getArtisans();
  }, []);
  const { apiUrl, decodeDate, checkVerifiedFunction } = useContext(UserContext);
  const { token } = cookies.grinderUser;

  const [editArtisanProfileFormData, setEditArtisanProfileFormData] = useState({
    locationState: "",
    locationCity: "",
    service: "",
    introduction: "",
  });

  useEffect(() => {
    setEditArtisanProfileFormData({
      locationCity: artisanProfile.locationCity,
      locationState: artisanProfile.locationState,
      service: artisanProfile.service,
      introduction: artisanProfile.introduction,
    });
  }, [artisanProfile]);
  async function getArtisans() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditArtisanProfileFormData({
      ...editArtisanProfileFormData,
      [name]: value,
    });
  };

  function updateChanges(data) {
    const options = {
      url: `${apiUrl}/users/admin/${artisanProfile._id}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: data,
    };
    axios(options)
      .then((response) => {
        getArtisans();
        toast.success("Successful");
        window.document.getElementById("closeEditProfileModel").click();
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error);
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        if (!error.response.data.ok) {
          toast.error(error.response.data.message);
        }
      });
  }

  return (
    <div className="VerifyUserPage">
      <ModalComponent modalId={"EditProfileModel"} modalTitle="Edit Profile">
        <div className="text-info">
          Change only the Fields you want to Update
        </div>
        <div className="row">
          {" "}
          <div className="mb-3 col-xl-6 col-md-6 px-1">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              value={editArtisanProfileFormData.locationState}
              onChange={(e) => handleChange(e)}
              // placeholder={userProfile.locationState}
              name="locationState"
            />
          </div>
          <div className="mb-3 col-xl-6 col-md-6 px-1">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={editArtisanProfileFormData.locationCity}
              onChange={(e) => handleChange(e)}
              // placeholder={userProfile.locationCity}
              name="locationCity"
            />
          </div>
        </div>
        <div className="mb-3 col-12 px-1">
          <label className="form-label">Service</label>
          <input
            type="text"
            className="form-control"
            value={editArtisanProfileFormData.service}
            onChange={(e) => handleChange(e)}
            // placeholder={userProfile.locationState}
            name="service"
          />
        </div>
        <div>
          <label className="form-label">Introduction</label>
          <textarea
            name="introduction"
            className="form-control"
            cols="5"
            rows="3"
            value={editArtisanProfileFormData.introduction}
            placeholder={editArtisanProfileFormData.introduction}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            updateChanges(editArtisanProfileFormData);
          }}
        >
          Update
        </button>
      </ModalComponent>
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
      <div class="tableFixHead">
        <table>
          <thead className="thead-dark table-head">
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
              <th scope="col">Referee Name</th>
              <th scope="col">Referee Number</th>

              <th scope="col">Subscription</th>
              <th scope="col">Account verified</th>
              <th scope="col">Account Active</th>
              <th
                scope="col"
                style={{
                  minWidth: "200px",
                }}
              >
                Date Joined
              </th>
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
                      refereeName,
                      refereeNumber,
                      email_verified,
                      phoneNumber,
                      service,
                      Nin,
                      account_verified,
                      account_active,
                      role,
                      joinDate,
                    } = artisan;
                    return (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{fullName}</td>
                        <td>+{phoneNumber}</td>
                        <td>
                          <div className="check-verify-div">
                            <div className="check-verify-icon">
                              {checkVerifiedFunction(email_verified)}
                            </div>
                            {email}
                          </div>
                        </td>
                        <td>{service}</td>
                        <td>{Nin ? Nin : "-"}</td>
                        <td>
                          {locationCity}, {locationState}
                        </td>
                        <td>{refereeName}</td>
                        <td>{refereeNumber}</td>
                        <td>{freeAccount ? "none" : "paid"}</td>
                        <td>{checkVerifiedFunction(account_verified)}</td>
                        <td>{checkVerifiedFunction(account_active)}</td>
                        <td>{decodeDate(joinDate)[0]}</td>
                        <td>
                          <AdminAction
                            role={role}
                            _id={_id}
                            artisan={artisan}
                            setArtisanProfile={setArtisanProfile}
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
