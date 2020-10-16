import React from 'react';
import './App.css';
import {AuthProvider} from "./auth";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute  from "./auth/PrivateRoutes";

import Home from "./modules/home";
import Login from "./authentication/login";
import SignUp from "./authentication/signUp";
import Navigation from "./modules/navigation";
import RestaurantMenu from "./modules/restaurant";

function App() {
  return (
      <AuthProvider>
          <Navigation />
          <Router>
              <Switch>
                  {/*<PrivateRoute exact path="/" component={Home} />*/}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/" component={Home} /> // landing page route
                  <Route exact path="/restaurant/:id" component={RestaurantMenu} />
                  <Redirect to={'/'} />
              </Switch>
          </Router>
      </AuthProvider>
  );
}

export default App;
