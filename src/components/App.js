import React from "react";
import { HashRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { loginSuccess } from "../actions/userActions";
import { useUserDispatch } from "../context/userContext";
import DashBoardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import AdminProtectedRoute from "../protectedRoutes/adminProtectedRoute";
import DashBoardLayout from "./dashBoardLayout";

const user = localStorage.getItem("token");
function App() {
  const dispatch = useUserDispatch();
  if (user) {
    dispatch(loginSuccess());
  }
  return (
    <HashRouter>
      <Redirect from="/dashboard" to="/dashboard/main" />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <AdminProtectedRoute path="/" component={DashBoardLayout} />
      </Switch>
    </HashRouter>
  );
}

export default App;
