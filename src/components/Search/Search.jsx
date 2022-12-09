import React, { useContext, useEffect, useState } from "react";
import { FaHistory, FaRegWindowClose, FaSearch } from "react-icons/fa";
import "./Search.scss";
import { SearchContext } from "../../context/SearchContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    pageLoading,
  } = useContext(SearchContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   shuffleArray([3, 4, 6, "f", "s", 2, 4, 6, 9, 1, 1, 1]);

  //   function shuffleArray(array) {
  //     for (let i = array.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [array[i], array[j]] = [array[j], array[i]];
  //       console.log("new ARRAY: " + [array[j], array[i]]);
  //     }
  //   }
  // }, []);

  function filterDataFunction(search) {
    const { service, city, state } = search;

    if (service === null || service === "") {
      return toast.info("Fill in service");
    }
    if (city === "" && state === "") {
      return toast.info("Fill in Location");
    }

    let stateSearchResult = [];
    if (state !== "") {
      searchArtisans.map((artisan) => {
        if (
          artisan.locationState
            .toLowerCase()
            .trim()
            .indexOf(state.toLowerCase().trim()) !== -1
        ) {
          stateSearchResult.push(artisan);
        }
      });
      // console.log("State", stateSearchResult);
    }
    let citySearchResult = [];
    if (city !== "") {
      if (state === "") {
        return toast.info("Fill in Location State");
      }
      stateSearchResult.map((artisan) => {
        if (
          artisan.locationCity
            .toLowerCase()
            .trim()
            .indexOf(city.toLowerCase().trim()) !== -1
        ) {
          citySearchResult.push(artisan);
        }
      });
      // console.log("City", citySearchResult);
    }
    setSearchArtisans([...citySearchResult, ...stateSearchResult]);
    navigate(`/artisans`);
  }

  function clearSearch() {
    setFormService("");
    setFormLocationCity("");
    setFormLocationState("");
    setSearchArtisans(artisans);
  }
  return (
    <div className="search-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterDataFunction({
            service: formService,
            city: formLocationCity,
            state: formLocationState,
          });
        }}
      >
        <ServiceSearchInput
          pageLoading={pageLoading}
          formService={formService}
          setFormService={setFormService}
          artisans={artisans}
          setSearchArtisans={setSearchArtisans}
          searchArtisans={searchArtisans}
          setFormLocationState={setFormLocationState}
          setFormLocationCity={setFormLocationCity}
        />
        <label>
          <b>
            Location <br />{" "}
          </b>
          <div className="d-flex w-100">
            <StateSearchInput
              formService={formService}
              formLocationState={formLocationState}
              setFormLocationState={setFormLocationState}
              artisans={artisans}
              setSearchArtisans={setSearchArtisans}
              searchArtisans={searchArtisans}
              setFormLocationCity={setFormLocationCity}
            />{" "}
            <CitySearchInput
              formLocationState={formLocationState}
              formService={formService}
              formLocationCity={formLocationCity}
              setFormLocationCity={setFormLocationCity}
              artisans={artisans}
              setSearchArtisans={setSearchArtisans}
              searchArtisans={searchArtisans}
            />
          </div>
        </label>
        <div className="d-flex">
          <button className="d-flex" type="submit" disabled={pageLoading}>
            {!pageLoading ? (
              <div className="my-auto">
                <FaSearch className="me-1" />
                search
              </div>
            ) : (
              <div className="my-auto">
                <FaHistory className="me-1" />
                Loading ...
              </div>
            )}
          </button>
          {formService !== "" ||
          formLocationState !== "" ||
          formLocationCity !== "" ? (
            <button
              type="button"
              className="d-inline-flex "
              onClick={() => clearSearch()}
            >
              <FaRegWindowClose className="m-auto fs-4" />
              <div className="d-none d-md-inline m-auto">Clear</div>
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Search;

export function ServiceSearchInput({
  pageLoading,
  formService,
  setFormService,
  artisans,
  setSearchArtisans,
  searchArtisans,
  setFormLocationState,
  setFormLocationCity,
}) {
  const [showGesture, setShowGesture] = useState(false);
  const [gestureList, setGestureList] = useState([]);

  let searchResult = [];
  let artisanServiceArrayVar = [];

  function filterDataFunction(search) {
    setFormLocationState("");
    setFormLocationCity("");
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

    setGestureList([...new Set(artisanServiceArrayVar)]);
  }

  function selectGesture(e) {
    filterDataFunction(e.target.textContent);
    setFormService(e.target.textContent);
    setShowGesture(false);
    setFocused(false);
    setSearchArtisans(searchResult);
  }

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <label>
      <b>
        Looking for a Service? <br />{" "}
      </b>
      <input
        type="text"
        className="form-control"
        placeholder={pageLoading ? "Loading..." : `Eg. Plumber, carpenter, Etc`}
        value={formService}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onChange={(e) => {
          if (pageLoading) return;
          setFormService(e.target.value);
          filterDataFunction(e.target.value);
        }}
      />

      {showGesture ? (
        <div className="dropdown-list">
          <ul>
            {/* <li className="search-result-count">
              Found {searchArtisans.length} {formService}`s from Search
            </li> */}
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
  formService,
  formLocationCity,
  setFormLocationCity,
  artisans,
  setSearchArtisans,
  // searchArtisans,
  // formLocationState,
}) {
  // const [showGesture, setShowGesture] = useState(false);

  // const [cityGestureList, setCityGestureList] = useState([]);
  // let artisanCityArrayVar = [];

  // let searchResult = [];
  // function filterDataFunction(search) {
  //   if (formService === "") {
  //     return toast.info("fill Service");
  //   }
  //   if (formLocationState === "") {
  //     return toast.info("fill state");
  //   }
  //   if (search === "") {
  //     setShowGesture(false);
  //   } else {
  //     setShowGesture(true);
  //   }

  //   searchArtisans.map((artisan) => {
  //     if (
  //       artisan.locationCity
  //         .toLowerCase()
  //         .trim()
  //         .indexOf(search.toLowerCase().trim()) !== -1
  //     ) {
  //       searchResult.push(artisan);
  //       artisanCityArrayVar.push(artisan.locationCity.toLowerCase().trim());
  //     }
  //   });

  //   setCityGestureList([...new Set(artisanCityArrayVar)]);
  // }

  // function selectGesture(e) {
  //   filterDataFunction(e.target.textContent);
  //   setFormLocationCity(e.target.textContent);
  //   setShowGesture(false);
  //   setFocused(false);
  //   setSearchArtisans(searchResult);
  // }

  // const [focused, setFocused] = useState(false);
  // const onFocus = () => setFocused(true);
  // const onBlur = () => setFocused(false);

  return (
    <div className="ms-2 w-100">
      <input
        type="text"
        className="form-control"
        placeholder="City"
        value={`${formLocationCity}`}
        // onFocus={() => onFocus()}
        // onBlur={() => onBlur()}
        onChange={(e) => {
          if (formService === "") {
            return toast.info("fill service first");
          }

          if (e.target.value) {
            setSearchArtisans(artisans);
          }
          setFormLocationCity(e.target.value);
          // filterDataFunction(e.target.value);
        }}
      />
      {/* {showGesture ? (
        <div className="dropdown-list">
          <ul>
            {/* <li className="search-result-count">
              Found {searchArtisans.length} {formLocationCity}`s from Search
            </li> * /}
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
      ) : null} */}
    </div>
  );
}

export function StateSearchInput({
  formService,
  formLocationState,
  setFormLocationState,
  artisans,
  setSearchArtisans,
  // searchArtisans,
}) {
  // const [showGesture, setShowGesture] = useState(false);

  // const [stateGestureList, setStateGestureList] = useState([]);

  // let artisanStateArrayVar = [];
  // let searchResult = [];
  // function filterDataFunction(search) {
  //   if (formService === "") {
  //     return toast.info("fill service");
  //   }
  //   if (search === "") {
  //     setShowGesture(false);
  //   } else {
  //     setShowGesture(true);
  //   }

  //   searchArtisans.map((artisan) => {
  //     if (
  //       artisan.locationState
  //         .toLowerCase()
  //         .trim()
  //         .indexOf(search.toLowerCase().trim()) !== -1
  //     ) {
  //       searchResult.push(artisan);
  //       artisanStateArrayVar.push(artisan.locationState.toLowerCase().trim());
  //     }
  //   });

  //   setStateGestureList([...new Set(artisanStateArrayVar)]);
  // }

  // function selectGesture(e) {
  //   filterDataFunction(e.target.textContent);
  //   setFormLocationState(e.target.textContent);
  //   setShowGesture(false);
  //   setSearchArtisans(searchResult);
  //   setFocused(false);
  // }

  // const [focused, setFocused] = useState(false);
  // const onFocus = () => setFocused(true);
  // const onBlur = () => setFocused(false);

  return (
    <div className="me-2 w-100">
      <input
        type="text"
        className="form-control"
        placeholder="State"
        value={`${formLocationState}`}
        // onFocus={() => onFocus()}
        // onBlur={() => onBlur()}
        onChange={(e) => {
          if (formService === "") {
            return toast.info("fill service first");
          }
          if (e.target.value === "") {
            setSearchArtisans(artisans);
          }
          setFormLocationState(e.target.value);
          // filterDataFunction(e.target.value);
        }}
      />
      {/* {showGesture ? (
        <div className="dropdown-list state">
          <ul>
            {/* <li className="search-result-count">
              Found {searchArtisans.length} {formLocationState}`s from Search
            </li> *  /}
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
      ) : null} */}
    </div>
  );
}
