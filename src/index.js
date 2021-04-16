import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import { UserProvider } from "./context/userContext";
import { debugContextDevtool } from "react-context-devtool";
import axios from "axios";

// material ui

// context api
const container = document.getElementById("root");

// default axios configuration
const token = localStorage.getItem("idToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  container
);

// Attach root container
debugContextDevtool(container);
