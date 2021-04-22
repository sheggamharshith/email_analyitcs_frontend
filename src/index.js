import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { UserProvider, signOutWithoutDispatch } from "./context/userContext";
import axios from "axios";

// context api
const container = document.getElementById("root");

// default axios configuration
const token = localStorage.getItem("idToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

//axios interceptor for login out the user if there is no data found
axios.interceptors.response.use(undefined, (error) => {
  const { status } = error.response;
  if (status === 401) {
    console.log(error);
    signOutWithoutDispatch();
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  container
);
