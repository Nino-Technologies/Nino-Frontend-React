import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
// import artisanDB from"../json/artisans.json"

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const { apiUrl } = useContext(UserContext);
  const [pageLoading, setPageLoading] = useState(true);
  // const [copyArtisans, setCopyArtisans] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [searchArtisans, setSearchArtisans] = useState([]);

  const [formService, setFormService] = useState("");
  const [formLocationCity, setFormLocationCity] = useState("");
  const [formLocationState, setFormLocationState] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    getArtisansFunction();
    // console.log({artisanDB})
  }, []);

  async function getArtisansFunction() {
    setPageLoading(true);

    fetch(`${apiUrl}/search`, { method: "POST" })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setArtisans([...data]);
        setSearchArtisans([...data,]);
        setPageLoading(false);
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

export default SearchProvider;