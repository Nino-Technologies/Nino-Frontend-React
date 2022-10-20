import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import ReactGa from "react-ga";
import { toast } from "react-toastify";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { apiUrl } = useContext(UserContext);
  const [pageLoading, setPageLoading] = useState(true);
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

  let filterData = {
    search: formService.toLowerCase().trim(),
    state: formLocationCity.toLowerCase().trim(),
    city: formLocationState.toLowerCase().trim(),
  };
  // Example POST method implementation:
  // async function handelSearchFunction(
  //   url = `http://localhost:5000/api/search`
  // ) {
  // async function handleSearchFunction(url = `${apiUrl}/search`) {
  //   setPageLoading(true);
  //   navigate(`/artisans`);
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(filterSearch), // body data type must match "Content-Type" header
  //   });
  //   const responseData = await response.json(); // parses JSON response into native JavaScript objects
  //   setPageLoading(false);
  //   setArtisans(responseData);
  //   // console.log(responseData);
  //   return;
  // }

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
