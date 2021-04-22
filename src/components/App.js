import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { useUserState } from "../context/userContext";
import LoginPage from "../pages/Login";
import AdminProtectedRoute from "../protectedRoutes/adminProtectedRoute";
import DashBoardLayout from "./dashBoardLayout";
import Loader from "./Loader";

function App() {
  const user = useUserState();

  //load the user of not exists make a api call to the goole
  if (user.isAuthenticated && !user.user) {
    return (
      <div className="flex h-screen justify-center items-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <AdminProtectedRoute path="/dashboard" component={DashBoardLayout} />
      </Switch>
    </HashRouter>
  );
}

export default App;
