import React, { Component } from "react";
// import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";
// import { Icon } from "leaflet";
import "../css/app.css";
import Routing from "./routing";
import RoutingRoundTrip from "./routingRoundTrip";

class LeafletMapContainer extends Component {
  state = {
    startingCoords: this.props.startingCoords,
    endingCoords: this.props.endingCoords,
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
        {this.props.startingCoords[0] !== undefined &&
          this.props.endingCoords[0] !== undefined &&
          this.state.isMapInit && (
            <Routing
              map={this.map}
              startingCoords={this.props.startingCoords}
              endingCoords={this.props.endingCoords}
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
