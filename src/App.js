import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ArtisansPage from "./pages/ArtisansPage/ArtisansPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ArtisansProfile from "./pages/artisansProfile/ArtisansProfile";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ToastContainer } from "react-toastify";
// import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  // check network
  // const [networkConnected, setNetworkConnected] = useState(true);

  // useEffect(() => {
  //   if (navigator.onLine) {
  //     setNetworkConnected(true);
  //     return;
  //   }
  //   setNetworkConnected(false);
  // });
  // useEffect(() => {
  //   if (networkConnected) {
  //     toast.info("Welcome Back Connected");
  //     return;
  //   }
  //   toast.info("you lost Connection ");
  //   // console.log("  navigator.onLine");
  // }, [networkConnected]);
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about-us" element={<AboutUsPage />} />
        <Route exact path="/artisans/" element={<ArtisansPage />} />
        <Route
          exact
          path="/artisans-profile/:id"
          element={<ArtisansProfile />}
        />
        <Route exact path="/contact-us" element={<ContactUsPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
