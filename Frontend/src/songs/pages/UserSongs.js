import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import SongList from "../components/SongList";
import { useContext } from 'react';
import { AuthContext } from "../../shared/context/auth-context";

const UserSongs = () => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const [loadedSongs, setLoadedSongs] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const responseData = await response.json();
      if (!response.ok) {
      } else {
        setLoadedSongs(responseData.songs);
      }
    };
    sendRequest();
  }, []);
  return <>
  {loadedSongs && <SongList items ={loadedSongs} />}
   
   </>
};

export default UserSongs;
