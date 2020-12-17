import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "../css/app.css";
import L from "leaflet";
import Routing from "./routing";
import RoutingRoundTrip from "./routingRoundTrip";

const markerIcon = new L.Icon({
  iconUrl: require("../images/currentLocationMarker2.webp"),
  iconSize: [45, 45],
});

class LeafletMapContainer extends Component {
  state = {
    journeyCoords: this.props.journeyCoords,
    isMapInit: false,
  };

  saveMap = (map) => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };

  render() {
    const position = [this.props.lat, this.props.lng];

    return (
      <Map center={position} zoom={this.props.zoom} ref={this.saveMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker icon={markerIcon} position={position}></Marker>

        {this.props.journeyCoords !== undefined && this.state.isMapInit && (
          <Routing
            map={this.map}
            journeyCoords={this.props.journeyCoords}
            vehicle={this.props.vehicle}
            generated={this.props.generated}
          />
        )}
        {this.props.roundTripCoords != undefined && this.state.isMapInit && (
          <RoutingRoundTrip
            map={this.map}
            roundTripCoords={this.props.roundTripCoords}
            vehicle={this.props.vehicle}
            roundTripGenerated={this.props.roundTripGenerated}
          />
        )}
      </Map>
    );
  }
}

export default LeafletMapContainer;
