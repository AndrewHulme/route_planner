import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Hello from './components/hello';
import CurrentLocation from './components/currentlocation';
import Form from "./components/form";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <Hello />
    <Form />
    <CurrentLocation />
  </React.StrictMode>,
  document.getElementById("root")
);
