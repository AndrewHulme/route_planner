import React, { Component } from "react";
import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "../css/app.css";
import Routing from "./routing";

class LeafletMapContainer extends Component {
  state = {
    lat: 57.74,
    lng: 11.94,
    zoom: 13,
    isMapInit: false,
  };

  saveMap = (map) => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };

  render() {
    // if (localStorage.getItem("lat") != null) {
    //   var lat = localStorage.getItem("lat");
    //   var lng = localStorage.getItem("long");
    //   console.log("hello");
    // } else {
    //   lat = 51.5074;
    //   lng = 0.1277;
    // }
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        {/* // <Map center={[lat, lng]} zoom={12}> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.state.isMapInit && <Routing map={this.map} />}
      </Map>
    );
  }
}

export default LeafletMapContainer;

// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_KEY,
// })(LeafletMapContainer);
