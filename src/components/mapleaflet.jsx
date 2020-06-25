import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import '../css/app.css';
import Routing from './routing';

class LeafletMapContainer extends Component {
  state = {
    lat: 51.5033,
    lng: -0.1195,
    startingCoords: this.props.startingCoords,
    endingCoords: this.props.endingCoords,
    zoom: 13,
    isMapInit: false,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);

      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      // localStorage.setItem("lat", position.coords.latitude);
      // localStorage.setItem("long", position.coords.longitude);
    });
  }

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
    console.log('Starting:');
    console.log(this.props.startingCoords);
    console.log('Ending:');
    console.log(this.props.endingCoords);
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.startingCoords[0] != undefined &&
          this.props.endingCoords[0] != undefined &&
          this.state.isMapInit && (
            <Routing
              map={this.map}
              lat={this.state.lat}
              lng={this.state.lng}
              startingCoords={this.props.startingCoords}
              endingCoords={this.props.endingCoords}
            />
          )}
      </Map>
    );
  }
}

export default LeafletMapContainer;
