import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.scss";

function Search({ setArtisans, setPageLoading, apiUrl }) {
  const [formService, setFormService] = useState("");
  const [formLocationCity, setFormLocationCity] = useState("");
  const [formLocationState, setFormLocationState] = useState("");

  // function handelSearch() {

  //   // console.log("token", decode);
  // let headers = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   Authorization: cromos_user.token,
  // };
  // let apiUrl=`http://localhost:5000/api/search`;

  // fetch(apiUrl, { headers })
  //   .then((response) => response.json())
  //   .then((data) => {

  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // }
  let filterSearch = {
    search: formService,
    state: formLocationCity,
    city: formLocationState,
  };
  // Example POST method implementation:
  async function handelSearch(url = `${apiUrl}/search`) {
    setPageLoading(true);
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(filterSearch), // body data type must match "Content-Type" header
    });
    const responseData = await response.json(); // parses JSON response into native JavaScript objects
    setPageLoading(false);
    setArtisans(responseData);
    // console.log(responseData);
    return;
  }

  // handelSearch("", filterSearch).then(
  //   (data) => {

  //     // console.log(data); // JSON data parsed by `data.json()` call
  //   }
  // );
  return (
    <div className="search-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handelSearch();
        }}
      >
        <label>
          <b>
            Looking for a Service? <br />{" "}
          </b>
          <input
            type="text"
            className="form-control"
            placeholder="Eg. Plumber, carpenter, Etc"
            value={formService}
            onChange={(e) => setFormService(e.target.value)}
          />
        </label>
        <label>
          <b>
            Location <br />{" "}
          </b>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={`${formLocationCity}`}
              onChange={(e) => setFormLocationCity(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="State"
              value={`${formLocationState}`}
              onChange={(e) => setFormLocationState(e.target.value)}
            />
          </div>
        </label>
        <button>
          <FaSearch className="me-1" />
          search
        </button>
      </form>
    </div>
  );
}

export default Search;
