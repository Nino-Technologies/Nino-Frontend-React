import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.scss";
import { SearchContext } from "../../context/SearchContext";

function Search() {
  const {
    // handleSearchFunction,
    artisans,
    // filterDataFunction,
    formService,
    setFormService,
    formLocationCity,
    setFormLocationCity,
    formLocationState,
    setFormLocationState,
    setSearch,
    search,
    setSearchArtisans,
    searchArtisans,
  } = useContext(SearchContext);
  const [artisanServiceArray, setArtisanServiceArray] = useState([]);
  const [gestureList, setGestureList] = useState([]);
  const [stateGestureList, setStateGestureList] = useState([]);
  const [cityGestureList, setCityGestureList] = useState([]);
  // useEffect(() => {
  //   if (formService !== "") {
  //     console.log(gestureList);
  //     // filterDataFunction(formService);
  //   }
  // }, [formService]);

  // useEffect(() => {
  //   artisans.forEach((artisan) => {
  //     artisanServiceArrayVar.push(artisan.service);
  //   });
  //   setArtisanServiceArray([...new Set(artisanServiceArrayVar)]);
  //   console.log(artisanServiceArray);
  // }, [artisans]);
  let searchResult = [];
  let artisanServiceArrayVar = [];
  let artisanStateArrayVar = [];
  let artisanCityArrayVar = [];

  function filterDataFunction(search) {
    if (search === "") {
      setShowGesture(false);
      setSearch(false);
    } else {
      setShowGesture(true);
      setSearch(true);
    }
    // artisanServiceArray.map((artisanService) => {
    //   if (artisanService.indexOf(search) !== -1) {
    //     searchResult.push(artisanService);
    //   }
    // });
    // setGestureList(searchResult);
    artisans.map((artisan) => {
      if (artisan.service.indexOf(search) !== -1) {
        searchResult.push(artisan);
        artisanServiceArrayVar.push(artisan.service);
        artisanStateArrayVar.push(artisan.locationState);
        artisanCityArrayVar.push(artisan.locationCity);
        // console.log(artisanServiceArrayVar);
      }
    });
    setSearchArtisans(searchResult);
    // console.log(artisanServiceArrayVar);
    setGestureList([...new Set(artisanServiceArrayVar)]);
    setStateGestureList([...new Set(artisanStateArrayVar)]);
    setCityGestureList([...new Set(artisanCityArrayVar)]);
  }

  const [showGesture, setShowGesture] = useState(false);

  // function toggleGestureFunction() {}
  function selectGesture(e) {
    filterDataFunction(e.target.textContent);
    setFormService(e.target.textContent);
    setShowGesture(false);
  }
  // console.log(gestureList);
  return (
    <div className="search-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // handleSearchFunction();
          // filterDataFunction();
        }}
      >
        <label>
          {/* {search ? (
            // <div className="search-result-count">{searchArtisans.length}</div>
          ) : null} */}
          <b>
            Looking for a Service? <br />{" "}
          </b>
          <input
            type="text"
            className="form-control"
            placeholder="Eg. Plumber, carpenter, Etc"
            value={formService}
            // onChange={(e) => filterDataFunction(e.target.value)}
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
                  <li className="text-muted fs-5 py-1 px-3">
                    Service Not found
                  </li>
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
