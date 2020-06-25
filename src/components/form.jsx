import React, { Component } from "react";
import LeafletMapContainer from "./mapleaflet.jsx";

class Form extends Component {
  state = {};

  startChangeHandler = (event) => {
    this.setState({
      startingpoint: event.target.value,
    });
  };

  endChangeHandler = (event) => {
    this.setState({
      endpoint: event.target.value,
    });
  };

  roundTripStartHandler = (event) => {
    this.setState({
      roundTripStart: event.target.value,
    })
  }
  roundTripLengthHandler = (event) => {
    this.setState({
      roundTripLength: event.target.value,
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

    var apiKey = process.env.REACT_APP_ROUTE_API_KEY;
    var geocodingKey = process.env.REACT_APP_GEOCODING_API_KEY;
    var transportType = "driving-car";
    // var startCoordinates = "8.681495,49.41461";
    // var endCoordinates = "8.687872,49.420318";

    var startingURL =
      "https://eu1.locationiq.com/v1/search.php?key=" +
      geocodingKey +
      "&q=" +
      this.state.startingpoint +
      "&format=json";

    var endingURL =
      "https://eu1.locationiq.com/v1/search.php?key=" +
      geocodingKey +
      "&q=" +
      this.state.endpoint +
      "&format=json";

    const asyncWrapper = async () => {
      await fetch(startingURL)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            startingLat: data[0].lat,
            startingLon: data[0].lon,
          })
        );
      await fetch(endingURL)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            endingLat: data[0].lat,
            endingLon: data[0].lon,
          })
        );

      var routeURL =
        `https://api.openrouteservice.org/v2/directions/` +
        transportType +
        `?api_key=` +
        apiKey +
        `&start=` +
        this.state.startingLon +
        "," +
        this.state.startingLat +
        `&end=` +
        this.state.endingLon +
        "," +
        this.state.endingLat;

      await fetch(routeURL)
        // We get the API response and receive data in JSON format...
        .then((response) => response.json())
        // ...then we update the users state
        .then((data) => console.log(data.features[0].geometry.coordinates))
        // Catch any errors we hit and update the app
        .catch((error) => this.setState({ error, isLoading: false }));

      console.log(this.state);
    };

    asyncWrapper();
  };

  handleSubmitRoundTrip = (evt) => {
    evt.preventDefault();

    var geocodingKey = process.env.REACT_APP_GEOCODING_API_KEY;

    var startingURL =
      "https://eu1.locationiq.com/v1/search.php?key=" +
      geocodingKey +
      "&q=" +
      this.state.roundTripStart +
      "&format=json";

    const asyncWrapper = async () => {
      await fetch(startingURL)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            startingLat: data[0].lat,
            startingLon: data[0].lon,
          })
        );
      await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept:
            "application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          Authorization:
            "5b3ce3597851110001cf6248b4be2ae5777840a697277752138f89c2",
        },
        body:
          '{"coordinates":[[' +
            this.state.startingLon + ',' + this.state.startingLat +
          ']],"options":{"round_trip":{"length":' +
          this.state.roundTripLength + ',"points":3,"seed":5}}}',
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          roundTripCoords: JSON.stringify(data.features[0].geometry.coordinates)
        })
        console.log(JSON.stringify(data.features[0].geometry.coordinates));
      });
    }

    asyncWrapper();
  };

  render() {
    return (
      <div>
        <form id="roundTripForm" onSubmit={this.handleSubmitRoundTrip}>
          <div className="form-group">
            <label>Start point for round trip:</label>
            <input
              className="form-control"
              type="text"
              name="roundTripStart"
              onChange={this.roundTripStartHandler}
            />
          </div>
          <div className="form-group">
            <label>Length of trip:</label>
            <input
              className="form-control"
              type="text"
              name="roundTripLength"
              onChange={this.roundTripLengthHandler}
            />
          </div>
          <br />
          <input
            id="roundTripButton"
            className="form-control"
            type="submit"
            className="btn btn-primary"
            value="Generate"
          />
        </form>

        <form onSubmit={this.submitHandler} id="secondForm">
          <div className="form-group">
            <label>Starting Point:</label>
            <input
              autoFocus
              className="form-control"
              type="text"
              name="startingpoint"
              onChange={this.startChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>End Point:</label>
            <input
              className="form-control"
              type="text"
              name="endpoint"
              onChange={this.endChangeHandler}
            />
          </div>
          <br />
          <input
            id="secondButton"
            className="form-control"
            type="submit"
            className="btn btn-primary"
            value="Generate"
          />
        </form>
        <LeafletMapContainer
          startingCoords={[this.state.startingLat, this.state.startingLon]}
          endingCoords={[this.state.endingLat, this.state.endingLon]}
          roundTripCoords={this.state.roundTripCoords}
        />
      </div>
    );
  }
}

export default Form;
