import React, { Component } from "react";
import MapContainer from "./map.jsx";
import LeafletMapContainer from "./mapleaflet.jsx";

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      // localStorage.setItem("lat", position.coords.latitude);
      // localStorage.setItem("long", position.coords.longitude);
    });
  }

  render() {
    return (
      <div>
        {/* <MapContainer lat={this.state.lat} long={this.state.long} /> */}
        <LeafletMapContainer lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}

export default CurrentLocation;
