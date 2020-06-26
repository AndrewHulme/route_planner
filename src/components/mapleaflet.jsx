import React, { Component } from "react";
// import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";
// import { Icon } from "leaflet";
import "../css/app.css";
import Routing from "./routing";
import RoutingRoundTrip from "./routingRoundTrip";

class LeafletMapContainer extends Component {
  state = {
    // lat: 51.5033,
    // lng: -0.1195,
    startingCoords: this.props.startingCoords,
    endingCoords: this.props.endingCoords,
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
    // console.log(this.state);
    // } else {
    //   lat = 51.5074;
    //   lng = 0.1277;
    // }
    // console.log("Starting:");
    // console.log(this.props.startingCoords);
    // console.log("Ending:");
    // console.log(this.props.endingCoords);
    const position = [this.props.lat, this.props.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.startingCoords[0] !== undefined &&
          this.props.endingCoords[0] !== undefined &&
          this.state.isMapInit && (
            <Routing
              map={this.map}
              lat={this.props.lat}
              lng={this.props.lng}
              startingCoords={this.props.startingCoords}
              endingCoords={this.props.endingCoords}
              vehicle={this.props.vehicle}
            />
          )}
          {this.props.roundTripCoords != undefined &&
            this.state.isMapInit && (
              <RoutingRoundTrip
                map={this.map}
                lat={this.state.lat}
                lng={this.state.lng}
                roundTripCoords={this.props.roundTripCoords}
                vehicle={this.props.vehicle}
              />
            )}
      </Map>
    );
  }
}

export default LeafletMapContainer;
