import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import ReactGa from "react-ga";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { apiUrl } = useContext(UserContext);
  const [pageLoading, setPageLoading] = useState(true);
  // const [copyArtisans, setCopyArtisans] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [searchArtisans, setSearchArtisans] = useState([]);

  const [formService, setFormService] = useState("");
  const [formLocationCity, setFormLocationCity] = useState("");
  const [formLocationState, setFormLocationState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getArtisansFunction();
  }, []);

  async function getArtisansFunction() {
    setPageLoading(true);

    fetch(`${apiUrl}/search`, { method: "POST" })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setArtisans(data);
        setSearchArtisans(data);
        setPageLoading(false);
        ReactGa.event({
          /** Typically the object that was interacted with (e.g. 'Video') */
          category: "Artisans-search",
          /** The type of interaction (e.g. 'play') */
          action: "search",
          /** Useful for categorizing events (e.g. 'Fall Campaign') */
          label: data.service,
          /** A numeric value associated with the event (e.g. 42) */
          value: data.length,
        });
        // console.log("data", data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <SearchContext.Provider
      value={{
        pageLoading,
        artisans,
        setPageLoading,
        getArtisansFunction,
        setArtisans,
        formService,
        setFormService,
        formLocationCity,
        setFormLocationCity,
        formLocationState,
        setFormLocationState,
        searchArtisans,
        setSearchArtisans,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
