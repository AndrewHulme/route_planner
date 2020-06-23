import React, { Component } from "react";
import MapContainer from "./map.jsx";

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  render() {
    return (
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
        <MapContainer />
      </div>
    );
  }
}

export default CurrentLocation;
