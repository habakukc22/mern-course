import React from "react";
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
import User from "./user/pages/User";

function App() {
  return (
    <Router>
      <MainNavigation />

      <main>
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

          <Redirect to={"/"} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
