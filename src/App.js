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
import NotificationPage from "./pages/Notification/NotificationPage";
import VerifyUserPage from "./pages/VerifyUserPage/VerifyUserPage";
import UsersPage from "./pages/UserPage/UserPage";
import CreateAdminPage from "./pages/CreateAdminPage/CreateAdminPage";
import ArtisanUploadPhoto from "./pages/ArtisanUploadPhoto/ArtisanUploadPhoto";
import SavedArtisanPage from "./pages/SavedArtisanPage/SavedArtisanPage";

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
          <Route path="notification" element={<NotificationPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="verify-user" element={<VerifyUserPage />} />
          <Route path="verify-user" element={<VerifyUserPage />} />
          <Route path="upload-image" element={<ArtisanUploadPhoto />} />
          <Route path="saved-artisan" element={<SavedArtisanPage />} />
        </Route>
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
