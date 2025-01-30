import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import UserProvider from "./context/UserContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";
import SearchProvider from "./context/SearchContext.jsx";
// import { TestProvider } from "./context/ContextTest";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root using the correct API
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <UserProvider>
          <SearchProvider>
            {/* <TestProvider> */}
            <App />
            {/* </TestProvider> */}
          </SearchProvider>
        </UserProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
