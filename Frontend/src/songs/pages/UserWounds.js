import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import WoundList from "../components/WoundList";
import { useContext } from 'react';
import { AuthContext } from "../../shared/context/auth-context";

import './UserWounds.css';
import WoundTable from "../components/WoundTable";

const UserWounds = () => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const [loadedWounds, setLoadedWounds] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:5000/api/wounds/user/${userId}`);
      const responseData = await response.json();
      console.log(responseData)
      if (!response.ok) {
      } else {
        console.log(`responseData.wound = ${responseData.wound}`)
        setLoadedWounds(responseData.wound);
        
      }
    };
    sendRequest();
  }, []);
  console.log(`loadedWounds = ${loadedWounds}`)
  
  return (<>
  <WoundTable />
  {/* {loadedWounds && <WoundList className="wound-list" items ={loadedWounds} />} */}
   
   </>)
};

export default UserWounds;
