import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import mapTheme from './mapTheme';

const mapStyles = {
  width: '75%',
  height: '75%',
};

const options = {
  styles: mapTheme,
  disableDefaultUI: true,
  zoomControl: true,
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
    if (localStorage.getItem('lat') != null) {
      var lat = localStorage.getItem('lat');
      var lng = localStorage.getItem('long');
    } else {
      lat = 51.5074;
      lng = 0.1277;
    }
    return (
      <div className="container map-div">
        <div className="text-center">
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            options={options}
            initialCenter={{
              lat: lat,
              lng: lng,
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
