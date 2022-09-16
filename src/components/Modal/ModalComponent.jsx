import React from "react";
import { useState } from "react";
import {
  FaAddressBook,
  FaAt,
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaDochub,
  FaDotCircle,
  FaIndustry,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
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

  function nairaSign() {
    return <> &#8358; </>;
  }
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
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* ======================================== Hide this modal and show the first with the button below. ================================ */}
              <div class="row">
                <div class="col-75">
                  <div class="container">
                    <form action="">
                      <div class="row">
                        <div class="col-50">
                          <h3>Billing Address</h3>
                          <label for="fname">
                            <FaUser /> Full Name
                          </label>
                          <input
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="John M. Doe"
                          />
                          <label for="email">
                            <FaAt /> Email
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="john@example.com"
                          />
                          <label for="adr">
                            <FaAddressBook /> Address
                          </label>
                          <input
                            type="text"
                            id="adr"
                            name="address"
                            placeholder="542 W. 15th Street"
                          />
                          <label for="city">
                            <i class="fa fa-institution"></i> <FaIndustry />{" "}
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="New York"
                          />

                          <div class="row">
                            <div class="col-50">
                              <label for="state">State</label>
                              <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="NY"
                              />
                            </div>
                            <div class="col-50">
                              <label for="zip">Zip</label>
                              <input
                                type="text"
                                id="zip"
                                name="zip"
                                placeholder="10001"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-50">
                          <h3>Payment</h3>
                          <label for="fname">Accepted Cards</label>
                          <div class="icon-container">
                            <FaCcVisa style={{ color: "navy" }} />

                            <FaCcAmex style={{ color: "blue" }} />

                            <FaCcMastercard style={{ color: "red" }} />

                            <FaCcDiscover style={{ color: "orange" }} />
                          </div>
                          <label for="cname">Name on Card</label>
                          <input
                            type="text"
                            id="cname"
                            name="cardname"
                            placeholder="John More Doe"
                          />
                          <label for="ccnum">Credit card number</label>
                          <input
                            type="text"
                            id="ccnum"
                            name="cardnumber"
                            placeholder="1111-2222-3333-4444"
                          />
                          <label for="expmonth">Exp Month</label>
                          <input
                            type="text"
                            id="expmonth"
                            name="expmonth"
                            placeholder="September"
                          />
                          <div class="row">
                            <div class="col-50">
                              <label for="expyear">Exp Year</label>
                              <input
                                type="text"
                                id="expyear"
                                name="expyear"
                                placeholder="2018"
                              />
                            </div>
                            <div class="col-50">
                              <label for="cvv">CVV</label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                placeholder="352"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <label>
                        <input
                          type="checkbox"
                          checked="checked"
                          name="sameadr"
                        />{" "}
                        Shipping address same as billing
                      </label>
                      <input
                        type="submit"
                        value="Continue to checkout"
                        class="btn"
                      />
                    </form>
                  </div>
                </div>

                <div class="col-25">
                  <div class="container">
                    <h4>
                      Cart{" "}
                      <span class="price" style={{ color: "black" }}>
                        <FaShoppingCart /> <b>1</b>
                      </span>
                    </h4>
                    {/* <p>
                      <a href="#">Product 1</a> <span class="price">$15</span>
                    </p>
                    <p>
                      <a href="#">Product 2</a> <span class="price">$5</span>
                    </p>*/}
                    <p>
                      <b href="#">Selected Plan</b>{" "}
                      <span class="price">Price</span>
                    </p>
                    <p>
                      <a href="#">{selectedPlane.name}</a>{" "}
                      <span class="price">
                        {" "}
                        {nairaSign()}
                        {selectedPlane.price}
                      </span>
                    </p>
                    <ul className="nav">
                      {selectedPlane.offer.map((item, i) => (
                        <li key={i} className="  my-auto d-flex">
                          <FaDotCircle className="me-2 mt-1" />{" "}
                          <span className="my-auto">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <hr />
                    <p>
                      Total{" "}
                      <span class="price" style={{ color: "black" }}>
                        <b>
                          {" "}
                          {nairaSign()} {selectedPlane.price}
                        </b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* ======================================== </> ================================ */}
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-target="#paymentModalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
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
