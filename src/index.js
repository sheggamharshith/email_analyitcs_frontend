import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/userContext";
import { debugContextDevtool } from "react-context-devtool";
import axios from "axios";

const container = document.getElementById("root");
const token = localStorage.getItem("idToken");

if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  container
);

// Attach root container
debugContextDevtool(container);
reportWebVitals();
