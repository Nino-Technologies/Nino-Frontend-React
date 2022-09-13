import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.scss";

function Search() {
  return (
    <div className="search-form">
      <form action="">
        <label>
          <b>
            Looking for a Service? <br />{" "}
          </b>
          <input
            type="text"
            className="form-control"
            placeholder="Eg. Plumber, carpenter, Etc"
            v-model="serviceInput"
          />
        </label>
        <label>
          <b>
            Location <br />{" "}
          </b>
          <input
            type="text"
            className="form-control"
            placeholder="City, State"
            v-model="locationInput"
          />
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
