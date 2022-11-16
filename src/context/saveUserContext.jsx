import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

export const SaveArtisanContext = createContext();

export function SaveArtisanProvider({ children }) {
  const [save, setSave] = useState(false);

  const { userProfile, apiUrl, setUserProfile } = useContext(UserContext);
  const [cookies] = useCookies();
  function saveArtisan(artisan) {
    const options = {
      url: `${apiUrl}/favorite`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: cookies.grinderUser.token,
      },
      data: {
        artisanId: artisan._id,
        avatar: artisan.avatar,
        artisanName: artisan.fullName,
        artisanLocation: {
          city: artisan.locationCity,
          state: artisan.locationState,
        },
      },
    };

    axios(options)
      .then((response) => {
        // getProfile(id);
        toast.info("artisan added to favorite");
        getSavedArtisanIds(response.data.userProfile.saved_artisans);
        if (response.data.ok) {
          setUserProfile(response.data.userProfile);
        }
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error + ".");
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message);
        }
        // toast.error(error.message);
      });
  }
  const [savedArtisanIds, setSavedArtisanIds] = useState([]);
  const savedArtisanIdArray = [];

  function getSavedArtisanIds(savedArtisanArray) {
    savedArtisanArray.forEach((artisan) => {
      if (savedArtisanIdArray.includes(artisan.artisanId)) {
        return;
      }
      savedArtisanIdArray.push(artisan.artisanId);
    });
    setSavedArtisanIds(savedArtisanIdArray);
  }
  useEffect(() => {
    if (userProfile.saved_artisans) {
      getSavedArtisanIds(userProfile.saved_artisans);
    }
  }, [userProfile]);

  return (
    <SaveArtisanContext.Provider value={{ saveArtisan, savedArtisanIds }}>
      {children}
    </SaveArtisanContext.Provider>
  );
}
