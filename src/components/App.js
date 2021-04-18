import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import AdminProtectedRoute from "../protectedRoutes/adminProtectedRoute";
import DashBoardLayout from "./dashBoardLayout";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <AdminProtectedRoute path="/dashboard" component={DashBoardLayout} />
      </Switch>
    </HashRouter>
  );
}

export default App;
