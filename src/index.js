import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Hello from './components/hello';
import Map from './components/map';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <Hello />
    <Map />
  </React.StrictMode>,
  document.getElementById('root')
);
