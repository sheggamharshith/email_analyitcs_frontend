import React from "react";
import { HashRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import DashBoardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import AdminProtectedRoute from "../protectedRoutes/adminProtectedRoute";

function App() {
  return (
    <HashRouter>
      <Redirect from="" to="/dashboard" />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <AdminProtectedRoute path="/dashboard" component={DashBoardPage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
