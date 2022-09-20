import React from "react";
import { useState } from "react";
import PaymentForm from "../PaymentForm/PaymentForm";
import "./ModalComponent.scss";

function ModalComponent({ btnText, modalTitle, children, modalId }) {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {/* <button
        type="button"
        className="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {btnText}
      </button> */}

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`${modalId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        // aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                // id={`${modalId}Label`}
              >
                {modalTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id={`close${modalId}`}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-danger btn btn-sm"
                data-bs-dismiss="modal"
                id="closeModalComponent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
        class="modal fade"
        id="paymentModalToggle"
        aria-hidden="true"
        aria-labelledby="paymentModalToggleLabel"
        tabindex="-1"
      >
        {/* <div class="modal-dialog modal-dialog-centered"> */}
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="paymentModalToggleLabel">
                Select Subscription
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/*==================================== Show a second modal and hide this one with the button below. ==================================== */}
              <h1>Select Subscription Plan</h1>

              <div className="container subscription-plane">
                <div className="row">
                  <div className="col-md-4">
                    <div class="card">
                      {/* <img src="img.jpg" alt="John" style="width:100%"> */}
                      <h1>Starter Plan</h1>
                      <p class="title">Free</p>
                      <p>Give it a try</p>
                      <ul>
                        <li>5 hires</li>
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
                  </div>
                  <div className="col-md-4">
                    <div class="card">
                      {/* <img src="img.jpg" alt="John" style="width:100%"> */}
                      <h1>Grinder</h1>
                      <p class="title">1000/monthly</p>
                      <p>Become a Grinder</p>
                      <ul>
                        <li>Unlimited hires</li>
                        <li>Profile Promotion</li>
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
                  <div className="col-md-4">
                    <div class="card">
                      {/* <img src="img.jpg" alt="John" style="width:100%"> */}
                      <h1>Grinder Unique</h1>
                      <p class="title">4500/6month</p>
                      <p>Become Grinder Unique</p>
                      <ul>
                        <li>Unlimited hires</li>
                        <li>Profile Promotion</li>
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
            {/* <div class="modal-footer">
              <button
                class="btn btn-primary"
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
        class="modal fade"
        id="paymentModalToggle2"
        aria-hidden="true"
        aria-labelledby="paymentModalToggleLabel2"
        tabindex="-1"
      >
        {/* <div class="modal-dialog modal-dialog-centered"> */}
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="paymentModalToggleLabel2">
                Pay for Subscription
              </h5>
              <button
                type="button"
                class="btn-close"
                id="closePaymentModal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* ======================================== Hide this modal and show the first with the button below. ================================ */}
              <PaymentForm selectedPlane={selectedPlane} />
              {/* ======================================== </> ================================ */}
            </div>
            <div class="modal-footer p-1">
              <button
                class="btn btn-primary m-0 btn-sm"
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
