import React from "react";
import "./css/app.css";
import CurrentLocation from "./components/currentlocation";
import Form from "./components/form";
import LeafletMapContainer from "./components/mapleaflet.jsx";

function App() {
  return (
    <div className="App">
      {/* <Form /> */}
      {/* <CurrentLocation /> */}
      <LeafletMapContainer />
    </div>
  );
}

export default App;
