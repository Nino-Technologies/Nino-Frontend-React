import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { FaAt, FaDotCircle, FaShoppingCart, FaUser } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import "./PaymentForm.scss";

function PaymentForm({ selectedPlane }) {
  function nairaSign() {
    return <> &#8358; </>;
  }

  const [formInputFullName, setFormInputFullName] = useState("");
  const [formInputEmail, setFormInputEmail] = useState("");
  const [cookies] = useCookies();
  const { apiUrl } = useContext(UserContext);

  const config = {
    reference: new Date().getTime().toString(),
    email: formInputEmail,
    amount: selectedPlane.price * 100,
    //save key in .env
    publicKey: "pk_test_92b1b7eb4252a8e07614c90360e4412902ff8de4",
  };
  const initializePayment = usePaystackPayment(config);

  async function savePayment(paymentData) {
    const { token } = cookies.grinderUser;
    try {
      const options = {
        // url: `http://localhost:5000/api/payments`,
        url: `${apiUrl}/payments`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: token,
        },
        data: paymentData,
      };

      axios(options)
        .then((response) => {
          // console.log(response);

          // console.log(paymentObject);
          document.getElementById("closePaymentModal").click();
          toast.success("Payment successful");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status || error.response.status === 400) {
            return toast.error(error.response.data.message);
          }
          toast.error(error.message);
        });
    } catch (error) {}
  }

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
    const { status, redirecturl, trxref, transaction } = reference;
    const paymentObject = {
      email: formInputEmail,
      fullName: formInputFullName,
      status: status,
      redirectUrl: redirecturl,
      reference: trxref,
      transaction: transaction,
      amount: selectedPlane.price,
      payment_verified: true,
    };
    // console.log(paymentObject);

    savePayment(paymentObject);
  };

  // you can call this function anything
  // ================================= send mail to the user =================================================
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.info("Payment Canceled");
  };
  function handelSubmit(e) {
    e.preventDefault();
    if (
      selectedPlane.price === "" ||
      !selectedPlane.price ||
      selectedPlane.price <= 0
    ) {
      toast.info("Invalid request; select a subscription plan");
      return document.getElementById("selectSubscriptionPlan").click();
    }
    if (formInputFullName === "") {
      toast.info("Fill form fullname");
    }
    if (formInputEmail === "") {
      toast.info("Fill form email");
    }
    if (formInputFullName === "" || formInputEmail === "") {
      return;
    }
    initializePayment(onSuccess, onClose);
  }
  return (
    <div className="row">
      <div className="col-75">
        <div className="container">
          <form
            onSubmit={(e) => {
              handelSubmit(e);
            }}
          >
            <div className="row">
              <div className="col-50 pt-4">
                <h3>Billing Address</h3>
                <label htmlFor="fname">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="John M. Doe"
                  value={formInputFullName}
                  onChange={(e) => setFormInputFullName(e.target.value)}
                />
                <label htmlFor="email">
                  <FaAt /> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formInputEmail}
                  onChange={(e) => setFormInputEmail(e.target.value)}
                />
              </div>
            </div>

            <button className="btn" type="submit">
              Pay with Paystack
            </button>
          </form>
        </div>
      </div>

      <div className="col-25">
        <div className="container pt-4">
          <h4>
            Cart{" "}
            <span className="price" style={{ color: "black" }}>
              <FaShoppingCart /> <b>1</b>
            </span>
          </h4>
          <p>
            <b href="#">Selected Plan</b> <span className="price">Price</span>
          </p>
          <p>
            <a href="#">{selectedPlane.name}</a>{" "}
            <span className="price">
              {nairaSign()}
              {selectedPlane.price}
            </span>
          </p>
          <ul className="nav flex-column">
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
            <span className="price" style={{ color: "black" }}>
              <b>
                {nairaSign()} {selectedPlane.price}
              </b>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
