import React from "react";
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

function PaymentForm({ selectedPlane, setSelectedPlane }) {
  function nairaSign() {
    return <> &#8358; </>;
  }

  return (
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
                  <i class="fa fa-institution"></i> <FaIndustry /> City
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
                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                  </div>
                </div>
              </div>
            </div>
            <label>
              <input type="checkbox" checked="checked" name="sameadr" />{" "}
              Shipping address same as billing
            </label>
            <input type="submit" value="Continue to checkout" class="btn" />
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
            <b href="#">Selected Plan</b> <span class="price">Price</span>
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
  );
}

export default PaymentForm;
