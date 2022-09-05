import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ArtisansPage from "./pages/ArtisansPage/ArtisansPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about-us" element={<AboutUsPage />} />
        <Route exact path="/artisans" element={<ArtisansPage />} />
        <Route exact path="/contact-us" element={<ContactUsPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
