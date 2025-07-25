import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { SaveArtisanProvider } from "./context/saveUserContext.jsx";
import TermiiSMSProvider from "./context/TermiiContext.jsx";
import ReactGa from "react-ga";
import { BlogProvider } from "./context/BlogContext.jsx";
import {
  LandingPage,
  ArtisansPage,
  ErrorPage,
  AboutUsPage,
  ContactUsPage,
  ArtisansProfile,
  LoginPage,
  RegisterPage,
  PasswordResetPage,
  Dashboard,
  HomePage,
  ProfilePage,
  NotificationPage,
  VerifyUserPage,
  VerifyCodePage,
  UsersPage,
  CreateAdminPage,
  ArtisanUploadPhoto,
  SavedArtisanPage,
  PaymentPage,
  VerifyAdminsPage,
  BlogPage,
  BlogEditor,
  BlogPost,
  AuthorPage,
  ImageCropperWithStyle,
  QuickRequestPage,
  SendMessagePage,

} from "./pages/index.jsx";
import JobOfferPage from "./pages/JobOfferPage/JobOfferPage.jsx";
import { PaymentModalComponent } from "./components/Modal/ModalComponent.jsx";
import SingleJobPage from "./pages/NewJobsPage/SingleJobPage.jsx";
import CreateNewJobPage from "./pages/CreateNewJobPage/CreateNewJobPage.jsx";
import JobRecord from "./pages/JobRecord/JobRecord.jsx";
import BidPage from "./pages/BidPage/BidPage.jsx";
import OngoingJobs from "./pages/OngoingJobs/OngoingJobs.jsx";
import DisputeManagement from "./pages/dispute/DisputePage.jsx";
import WalletPage from "./pages/WalletPage/WalletPage.jsx";

const TRACKING_ID = "G-C3G25DKRJC";
ReactGa.initialize(TRACKING_ID);

export default function App() {
  const { loggedIn } = useContext(UserContext);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

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
          path="/blog"
          element={
            <BlogProvider>
              <BlogPage />
            </BlogProvider>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <BlogProvider>
              <BlogPost />
            </BlogProvider>
          }
        />
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
        <Route path="/job-offer" element={<JobOfferPage />} />

        <Route path="/single-job/:id" element={<SingleJobPage />} />
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
          <Route path="create-offer" element={<CreateNewJobPage />} />
          <Route path="create-offer/:id" element={<CreateNewJobPage />} />
          <Route path="job-record" element={<JobRecord />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="ongoing-jobs" element={<OngoingJobs />} />
          <Route path="bids" element={<BidPage />} />
          <Route path="dispute" element={<DisputeManagement />} />
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
          <Route
            path="author"
            element={
              <BlogProvider>
                <AuthorPage />
              </BlogProvider>
            }
          />
          <Route
            path="editor"
            element={
              <BlogProvider>
                <BlogEditor />
              </BlogProvider>
            }
          />
        </Route>

        <Route
          exact
          path="/"
          element={<Navigate to="/home" replace />} //this is a way to redirect
        />

        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <ScrollToTop />
    </div>
  );
}