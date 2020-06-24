import React, { Component } from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "../css/app.css";

class LeafletMapContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (localStorage.getItem("lat") != null) {
      var lat = localStorage.getItem("lat");
      var lng = localStorage.getItem("long");
      console.log("hello");
    } else {
      lat = 51.5074;
      lng = 0.1277;
    }

    return (
      <Map center={[lat, lng]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default LeafletMapContainer;

// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_KEY,
// })(LeafletMapContainer);
