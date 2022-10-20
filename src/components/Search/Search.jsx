import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.scss";
import { SearchContext } from "../../context/SearchContext";

function Search() {
  const {
    artisans,
    formService,
    setFormService,
    formLocationCity,
    setFormLocationCity,
    formLocationState,
    setFormLocationState,
    setSearchArtisans,
    searchArtisans,
  } = useContext(SearchContext);

  return (
    <div className="search-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ServiceSearchInput
          formService={formService}
          setFormService={setFormService}
          artisans={artisans}
          setSearchArtisans={setSearchArtisans}
          searchArtisans={searchArtisans}
        />
        <label>
          <b>
            Location <br />{" "}
          </b>
          <div className="d-flex">
            <CitySearchInput
              formLocationCity={formLocationCity}
              setFormLocationCity={setFormLocationCity}
              artisans={artisans}
              setSearchArtisans={setSearchArtisans}
              searchArtisans={searchArtisans}
            />
            <StateSearchInput
              formLocationState={formLocationState}
              setFormLocationState={setFormLocationState}
              artisans={artisans}
              setSearchArtisans={setSearchArtisans}
              searchArtisans={searchArtisans}
            />
          </div>
        </label>
        <button type="submit">
          <FaSearch className="me-1" />
          search
        </button>

        {/* <div class="dropdown">
          <button onclick="myFunction()" class="dropbtn">
            Dropdown
          </button>
          <div id="myDropdown" class="dropdown-content">
            <input
              type="text"
              placeholder="Search.."
              id="myInput"
              onkeyup="filterFunction()"
            />
            <a href="#about">About</a>
            <a href="#base">Base</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#custom">Custom</a>
            <a href="#support">Support</a>
            <a href="#tools">Tools</a>
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default Search;

export function ServiceSearchInput({
  formService,
  setFormService,
  artisans,
  setSearchArtisans,
  searchArtisans,
}) {
  const [showGesture, setShowGesture] = useState(false);
  const [gestureList, setGestureList] = useState([]);

  let searchResult = [];
  let artisanServiceArrayVar = [];

  function filterDataFunction(search) {
    if (search === "") {
      setShowGesture(false);
    } else {
      setShowGesture(true);
    }
    artisans.map((artisan) => {
      if (
        artisan.service
          .toLowerCase()
          .trim()
          .indexOf(search.toLowerCase().trim()) !== -1
      ) {
        searchResult.push(artisan);
        artisanServiceArrayVar.push(artisan.service.toLowerCase().trim());
      }
    });
    setSearchArtisans(searchResult);
    setGestureList([...new Set(artisanServiceArrayVar)]);
  }

  function selectGesture(e) {
    filterDataFunction(e.target.textContent);
    setFormService(e.target.textContent);
    setShowGesture(false);
  }

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    if (!focused) {
      setShowGesture(false);
    }
  }, [focused]);

  return (
    <label>
      <b>
        Looking for a Service? <br />{" "}
      </b>
      <input
        type="text"
        className="form-control"
        placeholder="Eg. Plumber, carpenter, Etc"
        value={formService}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          setFormService(e.target.value);
          filterDataFunction(e.target.value);
        }}
      />

      {showGesture ? (
        <div className="dropdown-list">
          <ul>
            <li className="search-result-count">
              Found {searchArtisans.length} {formService}`s from Search
            </li>
            {gestureList.length === 0 ? (
              <li className="text-muted fs-5 py-1 px-3">Service Not found</li>
            ) : (
              <>
                {gestureList.map((gesture, i) => {
                  return (
                    <li key={i}>
                      <button
                        onClick={(e) => {
                          selectGesture(e);
                        }}
                      >
                        {gesture}
                      </button>
                    </li>
                  );
                })}{" "}
              </>
            )}
          </ul>
        </div>
      ) : null}
    </label>
  );
}

export function CitySearchInput({
  formLocationCity,
  setFormLocationCity,
  artisans,
  setSearchArtisans,
  searchArtisans,
}) {
  const [showGesture, setShowGesture] = useState(false);

  const [cityGestureList, setCityGestureList] = useState([]);
  let artisanCityArrayVar = [];

  let searchResult = [];
  function filterDataFunction(search) {
    if (search === "") {
      setShowGesture(false);
    } else {
      setShowGesture(true);
    }
    artisans.map((artisan) => {
      if (
        artisan.locationCity
          .toLowerCase()
          .trim()
          .indexOf(search.toLowerCase().trim()) !== -1
      ) {
        searchResult.push(artisan);
        artisanCityArrayVar.push(artisan.locationCity.toLowerCase().trim());
      }
    });
    setSearchArtisans(searchResult);
    setCityGestureList([...new Set(artisanCityArrayVar)]);
  }

  function selectGesture(e) {
    filterDataFunction(e.target.textContent);
    setFormLocationCity(e.target.textContent);
    setShowGesture(false);
  }

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    if (!focused) {
      setShowGesture(false);
    }
  }, [focused]);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="City"
        value={`${formLocationCity}`}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          setFormLocationCity(e.target.value);
          filterDataFunction(e.target.value);
        }}
      />
      {showGesture ? (
        <div className="dropdown-list">
          <ul>
            <li className="search-result-count">
              Found {searchArtisans.length} {formLocationCity}`s from Search
            </li>
            {cityGestureList.length === 0 ? (
              <li className="text-muted fs-5 py-1 px-3">City Not found</li>
            ) : (
              <>
                {cityGestureList.map((gesture, i) => {
                  return (
                    <li key={i}>
                      <button
                        onClick={(e) => {
                          selectGesture(e);
                        }}
                      >
                        {gesture}
                      </button>
                    </li>
                  );
                })}{" "}
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function StateSearchInput({
  formLocationState,
  setFormLocationState,
  artisans,
  setSearchArtisans,
  searchArtisans,
}) {
  const [showGesture, setShowGesture] = useState(false);
  // const [gestureList, setGestureList] = useState([]);

  const [stateGestureList, setStateGestureList] = useState([]);

  let artisanStateArrayVar = [];
  let searchResult = [];
  function filterDataFunction(search) {
    if (search === "") {
      setShowGesture(false);
    } else {
      setShowGesture(true);
    }
    artisans.map((artisan) => {
      if (
        artisan.locationState
          .toLowerCase()
          .trim()
          .indexOf(search.toLowerCase().trim()) !== -1
      ) {
        searchResult.push(artisan);
        artisanStateArrayVar.push(artisan.locationState.toLowerCase().trim());
      }
    });
    setSearchArtisans(searchResult);
    setStateGestureList([...new Set(artisanStateArrayVar)]);
  }

  function selectGesture(e) {
    filterDataFunction(e.target.textContent);
    setFormLocationState(e.target.textContent);
    setShowGesture(false);
  }

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    if (!focused) {
      setShowGesture(false);
    }
  }, [focused]);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="State"
        value={`${formLocationState}`}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          setFormLocationState(e.target.value);
          filterDataFunction(e.target.value);
        }}
      />
      {showGesture ? (
        <div className="dropdown-list">
          <ul>
            <li className="search-result-count">
              Found {searchArtisans.length} {formLocationState}`s from Search
            </li>
            {stateGestureList.length === 0 ? (
              <li className="text-muted fs-5 py-1 px-3">State Not found</li>
            ) : (
              <>
                {stateGestureList.map((gesture, i) => {
                  return (
                    <li key={i}>
                      <button
                        onClick={(e) => {
                          selectGesture(e);
                        }}
                      >
                        {gesture}
                      </button>
                    </li>
                  );
                })}{" "}
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
