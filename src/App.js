import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NewPlace from "./paces/pages/NewPlace";
import UpdatePlace from "./paces/pages/UpdatePlace";
import UserPlaces from "./paces/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";
import User from "./user/pages/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setUserId(uid);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setIsLoggedIn(false);
  }, []);

  let context = {
    isLoggedIn,
    userId,
    login,
    logout,
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/auth" exact>
          <Auth />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={context}>
      <Router>
        <MainNavigation />

        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
