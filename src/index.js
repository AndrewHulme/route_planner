import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Hello from "./components/hello";
import Form from "./components/form";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>,
  document.getElementById("root")
);
