import React from "react";
import { useState } from "react";
import PaymentForm from "../PaymentForm/PaymentForm.jsx";
import "./ModalComponent.scss";
import { FaCheckCircle } from "react-icons/fa";
// import ImageCropperWithStyle from "../../pages/ImageCropper/ImageCropper.jsx";

function ModalComponent({ btnText, modalTitle, children, modalId }) {
  return (
    <div className="ModalComponent">
      {/* <!-- Button trigger modal --> */}
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`${modalId}`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id={`close${modalId}`}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;

export function PaymentModalComponent() {
  const [selectedPlane, setSelectedPlane] = useState({
    name: "",
    price: "",
    offer: [],
  });

  return (
    <div className="PaymentModalComponent">
      <div
        className="modal fade"
        id="paymentModalToggle"
        aria-hidden="true"
        aria-labelledby="paymentModalToggleLabel"
        tabIndex="-1"
      >
        {/* <div className="modal-dialog modal-dialog-centered"> */}
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="paymentModalToggleLabel">
                Select Subscription
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/*==================================== Show a second modal and hide this one with the button below. ==================================== */}
              {/* <h1 >Select Subscription Plan</h1> */}

              <div className="container subscription-plane">
                <div className="row">
                  {/* <div className="col-md-4">
                    <div className="card shadow">
                      {/* <img src="img.jpg" alt="John" style="width:100%"> * /}
                      <h3 className="pt-3">Starter Plan</h3>
                      <p className="title">Free</p>
                      <p>Give it a try</p>
                      <ul>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">5 hires</span>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                      <p>
                        <button
                          className="select-plan"
                          data-bs-target="#paymentModalToggle2"
                          data-bs-toggle="modal"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            setSelectedPlane({
                              name: "Starter",
                              price: "0",
                              offer: ["5 free hires"],
                            });
                          }}
                        >
                          Select Plan
                        </button>
                      </p>
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="card shadow bg-dark text-white">
                      {/* <img src="img.jpg" alt="John" style="width:100%"> */}
                      <h3 className="pt-3">Grinders</h3>
                      <p className="title">1000/monthly</p>
                      <p>Subscribe for “Grinders” and enjoy:</p>
                      <ul>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">Unlimited Job leads</span>
                        </li>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">Profile Recommendation</span>
                        </li>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">Profile Promotion</span>
                        </li>
                      </ul>
                      <p>
                        <button
                          className="select-plan"
                          data-bs-target="#paymentModalToggle2"
                          data-bs-toggle="modal"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            setSelectedPlane({
                              name: "Grinder",
                              price: "1000",
                              offer: ["Unlimited hires", "Profile Promotion"],
                            });
                          }}
                        >
                          Select Plan
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card shadow">
                      {/* <img src="img.jpg" alt="John" style="width:100%"> */}
                      <h3 className="pt-3">Grinders Unique</h3>
                      <p className="title">4500/6month</p>
                      <p className="text">
                        Subscribe for “Grinders Unique” and enjoy:
                      </p>
                      <ul>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">Unlimited Job leads</span>
                        </li>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">Profile Recommendation</span>
                        </li>
                        <li>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-circle-check" />
                            <FaCheckCircle className="check-icon" />
                          </span>
                          <span className="px-3">Profile Promotion</span>
                        </li>
                      </ul>
                      <p>
                        <button
                          className="select-plan"
                          data-bs-target="#paymentModalToggle2"
                          data-bs-toggle="modal"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            setSelectedPlane({
                              name: "Grinder Unique",
                              price: "4500",
                              offer: ["Unlimited hires", "Profile Promotion"],
                            });
                          }}
                        >
                          Select Plan
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* =========================================== </> =============================================== */}
            </div>
            {/* <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#paymentModalToggle2"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Make Payment
              </button> 
        </div> */}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="paymentModalToggle2"
        aria-hidden="true"
        aria-labelledby="paymentModalToggleLabel2"
        tabIndex="-1"
      >
        {/* <div className="modal-dialog modal-dialog-centered"> */}
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="paymentModalToggleLabel2">
                Pay for Subscription
              </h5>
              <button
                type="button"
                className="btn-close"
                id="closePaymentModal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* ======================================== Hide this modal and show the first with the button below. ================================ */}
              <PaymentForm selectedPlane={selectedPlane} />
              {/* ======================================== </> ================================ */}
            </div>
            <div className="modal-footer p-1">
              <button
                className="btn btn-primary m-0 btn-sm"
                data-bs-target="#paymentModalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                id="selectSubscriptionPlan"
              >
                Select Subscription Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// export function ProfilePictureModalComponent({ currentImage }) {
//   // const [selectedPlane, setSelectedPlane] = useState({
//   //   name: "",
//   //   price: "",
//   //   offer: [],
//   // });

//   return (
//     <div className="ProfilePictureModalComponent w-100">
//       <div
//         className="modal fade p-0"
//         id="profilePictureModalToggle"
//         aria-hidden="true"
//         aria-labelledby="profilePictureModalToggleLabel"
//         tabIndex="-1"
//       >
//         <div className="modal-dialog modal-fullscreen">
//           <div className="modal-content modal-fullscreen">
//             <div className="modal-header">
//               <h5 className="modal-title" id="profilePictureModalToggleLabel">
//                 Edit Picture
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body p-0">
//               <ImageCropperWithStyle currentImage={currentImage} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
