import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { UserProvider } from "./context/userContext";
import axios from "axios";

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
