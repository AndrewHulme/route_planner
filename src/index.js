import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Hello from './components/hello';
import CurrentLocation from './components/currentlocation';
import 'bootstrap/dist/css/bootstrap.css';

const options = {

  
};

ReactDOM.render(
  <React.StrictMode>
    <Hello />
    <CurrentLocation options={options} />
  </React.StrictMode>,
  document.getElementById('root')
);
