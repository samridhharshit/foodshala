import React from 'react';
import './App.css';
import {AuthProvider} from "./auth";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute  from "./auth/PrivateRoutes";

import Home from "./modules/home";
import Login from "./authentication/login";
import SignUp from "./authentication/signUp";

function App() {
  return (
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Redirect to={'/signup'} />
          </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;
