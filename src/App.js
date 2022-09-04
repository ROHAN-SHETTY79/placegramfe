import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Users, Auth } from "./user/pages";
import { NewPlace, UserPlaces, UpdatePlace } from "./places/pages";
import { MainNavigation } from "./shared/components";
import { AuthContext } from "./shared/context/authContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  // inorder to handle routes after logging in

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
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
        {/* if we are enetering something else it will go here */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        {/* if we are enetering something else it will go here */}
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <MainNavigation />
          <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
