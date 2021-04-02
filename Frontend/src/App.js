import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./users/pages/Users";
import SideNavigation from "./shared/components/navigation/SideNavigation"
import MainNavigation from "./shared/components/navigation/MainNavigation";
import UserWounds from "./songs/pages/UserWounds";
import UpdatePlace from "./songs/pages/UpdateSong";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context.js";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import NewWound from "./songs/pages/NewWound";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState('604deed92e6612a489fe0547');

  const login = useCallback((uid) => {
    console.log(uid);
    setIsLoggedIn(true);
    setUserId('604deed92e6612a489fe0547');
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/wounds" exact>
          <UserWounds />
        </Route>
        <Route path="/wounds/new" exact>
          <NewWound />
        </Route>
        <Route path="/songs/:songId">
          <UpdatePlace />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/wounds" exact>
          <UserWounds />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        
        <MainNavigation />
        <main>{routes}</main>
        
      
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
