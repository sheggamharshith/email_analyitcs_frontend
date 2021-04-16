import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserState } from "../context/userContext";

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  const User = useUserState();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (User.isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default AdminProtectedRoute;
