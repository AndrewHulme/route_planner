import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '75%',
  height: '75%',
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
      <div className="container">
        <div div="map-div" className="text-center">
          {/* {console.log(process.env.REACT_APP_GOOGLE_KEY)} */}
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: localStorage.getItem('lat'),
              lng: localStorage.getItem('long'),
            }}
          >
            <Marker onClick={this.onMarkerClick} name={'This is test name'} />
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(MapContainer);
