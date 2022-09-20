import React, { useContext, useState } from "react";
import SocialLogin from "../LoginForm/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";

function AdminRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);
  const [cookies, setCookie] = useCookies();

  async function registerUserFunction(e) {
    e.preventDefault();

    const token = cookies.grinderUser.token;
    const formElement = e.target;

    if (formElement[0].value === "") {
      toast.info("FullName is Required");
    }
    if (formElement[1].value === "") {
      toast.info("Email is Required");
    }
    if (formElement[2].value === "") {
      toast.info("Number is Required");
    }
    if (formElement[3].value === "") {
      toast.info("Password is Required");
    }
    if (
      formElement[1].value === "" ||
      formElement[0].value === "" ||
      formElement[3].value === "" ||
      formElement[2].value === ""
    ) {
      return;
    }
    setLoading(true);
    const data = {
      fullName: formElement[0].value,
      email: formElement[1].value,
      number: formElement[2].value,
      password: formElement[3].value,
    };

    // axios POST request
    const options = {
      // url: `http://localhost:5000/api/auth/admin/register/${token}`,
      url: `${apiUrl}/auth/admin/register/${token}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: data,
    };

    axios(options)
      .then((response) => {
        setLoading(false);
        // console.log(response.data);
        toast.success("Registration Successful");
        // navigate("/login?as=user");
      })
      .catch((error) => {
        setLoading(false);
        // if (error.response.status === 400) {
        toast.error(error.message);
        toast.error(error.response.data.message);
        // return
        // }
      });

    // const rawResponse = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const content = await rawResponse.json();

    // console.log(content);
  }
  return (
    <form
      className="form-layout px-2"
      onSubmit={(e) => registerUserFunction(e)}
    >
      <h3 className="login-name">Register Admin</h3>
      <div className="">
        {/* <label htmlFor="exampleInputEmail1" className="form-label">
      
        </label> */}
        <input type="text" className="form-control" placeholder="Fullname" />
      </div>
      <div className="mt-3">
        {/* <label htmlFor="exampleInputEmail1" className="form-label">
      
        </label> */}
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
        />
      </div>
      <div className="mt-3">
        {/* <label htmlFor="exampleInputEmail1" className="form-label">
      
        </label> */}
        <input type="number" className="form-control" placeholder="Number" />
      </div>

      <div className="mt-3">
        {/* <label htmlFor="exampleInputPassword1" className="form-label">
          
        </label> */}
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-3 w-100"
        disabled={loading}
      >
        {!loading ? <> Submit</> : <>Loading...</>}
      </button>
    </form>
  );
}

export default AdminRegistrationForm;
