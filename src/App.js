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
import PasswordResetPage from "./pages/PasswordResetPage/PasswordResetPage";
import { ToastContainer } from "react-toastify";
// import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotificationPage from "./pages/Notification/NotificationPage";
import VerifyUserPage from "./pages/VerifyUserPage/VerifyUserPage";
import VerifyCodePage from "./pages/VerifyCodePage/VerifyCodePage";
import UsersPage from "./pages/UserPage/UserPage";
import CreateAdminPage from "./pages/CreateAdminPage/CreateAdminPage";
import ArtisanUploadPhoto from "./pages/ArtisanUploadPhoto/ArtisanUploadPhoto";
import SavedArtisanPage from "./pages/SavedArtisanPage/SavedArtisanPage";
import { PaymentModalComponent } from "./components/Modal/ModalComponent";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import VerifyAdminsPage from "./pages/VerifyAdminsPage/VerifyAdminsPage";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import ImageCropper from "./pages/ImageCropper/ImageCropper";
import ImageCropperWithStyle from "./pages/ImageCropper/ImageCropper";
import SendMessagePage from "./components/SendMessages/SendMessagePage";
import { TestProvider } from "./context/ContextTest";
import { SaveArtisanProvider } from "./context/saveUserContext";
import { TermiiSMSProvider } from "./context/TermiiContext";
import QuickRequestPage from "./pages/QuickRequestPage/QuickRequestPage";
import ReactGa from "react-ga";

const TRACKING_ID = "G-C3G25DKRJC";
ReactGa.initialize(TRACKING_ID);

function App() {
  const { getUserProfile, loggedIn } = useContext(UserContext);

  // useEffect(() => {
  //   if (loggedIn) {
  //     getUserProfile();
  //   }
  // }, []);
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
      <TermiiSMSProvider>
        <PaymentModalComponent />
      </TermiiSMSProvider>
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <TermiiSMSProvider>
              <LandingPage />
            </TermiiSMSProvider>
          }
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route
          path="/artisans"
          element={
            <SaveArtisanProvider>
              <ArtisansPage />
            </SaveArtisanProvider>
          }
        />
        <Route
          path="/artisans-profile/:id"
          element={
            <SaveArtisanProvider>
              <TermiiSMSProvider>
                <ArtisansProfile />
              </TermiiSMSProvider>
            </SaveArtisanProvider>
          }
        />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/verify-code/:email" element={<VerifyCodePage />} />
        <Route path="/image-cropper" element={<ImageCropperWithStyle />} />
        <Route
          path="/dashboard"
          element={
            <TermiiSMSProvider>
              <Dashboard />
            </TermiiSMSProvider>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="verify-user" element={<VerifyUserPage />} />
          <Route path="verify-admins" element={<VerifyAdminsPage />} />
          <Route path="sendMessage" element={<SendMessagePage />} />
          <Route path="upload-image" element={<ArtisanUploadPhoto />} />
          <Route
            path="saved-artisan"
            element={
              <SaveArtisanProvider>
                <SavedArtisanPage />
              </SaveArtisanProvider>
            }
          />
          <Route path="create-admin" element={<CreateAdminPage />} />
          <Route path="payments" element={<PaymentPage />} />
          <Route path="requests" element={<QuickRequestPage />} />
        </Route>

        <Route
          exact
          path="/"
          element={<Navigate to="/home" replace />} //this is a way to redirect
        />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
