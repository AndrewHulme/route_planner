import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Hello from "./components/hello";
import CurrentLocation from "./components/currentlocation";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Hello />
    <CurrentLocation />
  </React.StrictMode>,
  document.getElementById("root")
);
