import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      //   lat: this.props.lat,
      //   long: this.props.long,
    };
  }

  render() {
    return (
      <div>
        {console.log(localStorage.getItem("lat"))}
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: localStorage.getItem("lat"),
            lng: localStorage.getItem("long"),
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"This is test name"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCdZUuTyfLx78BZUGt9oh8cexTWKO6FYX8",
})(MapContainer);
