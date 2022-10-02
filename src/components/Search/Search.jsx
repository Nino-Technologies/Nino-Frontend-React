import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.scss";
import { SearchContext } from "../../context/SearchContext";

function Search() {
  const {
    handleSearchFunction,
    formService,
    setFormService,
    formLocationCity,
    setFormLocationCity,
    formLocationState,
    setFormLocationState,
  } = useContext(SearchContext);

  return (
    <div className="search-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchFunction();
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