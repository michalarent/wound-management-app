import React, { useEffect,useState } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {


    const sendRequest = async () => {
      
      const response = await fetch("http://localhost:5000/api/users");
      const responseData = await response.json();
      if (!response.ok) {
        
      } else {
        setLoadedUsers(responseData.users);
      }
      
    };
    sendRequest();
  }, []);

  return (
      <>
      {loadedUsers && <UsersList items ={loadedUsers} />}
       
       </>
  );
};

export default Users;
