import React, { Component } from "react";
import LeafletMapContainer from "./mapleaflet.jsx";

class Form extends Component {
  state = {
    vehicle: "car",
    lat: 51.5033,
    lng: -0.1195,
    roundTrip: true,
    buttonText: "Add endpoint",
    generateButton: "Generate",
    seed: 1,
    generated: 0,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  formHandler = () => {
    let form = !this.state.roundTrip;
    this.setState({
      roundTrip: form,
      buttonText:
        this.state.buttonText == "Add endpoint" ? "Round Trip" : "Add endpoint",
    });
  };
  locationHandler = (event) => {
    this.setState({
      startingpoint: `${this.state.lat}, ${this.state.lng}`,
    });
  };

  roundTripLocationHandler = (event) => {
    console.log(this.state.roundTripStart);
    this.setState({
      roundTripStart: `${this.state.lat}, ${this.state.lng}`,
    });
    console.log(this.state.roundTripStart);
  };

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
      generateButton: "Generate",
      seed: 1,
    });
  };
  roundTripLengthHandler = (event) => {
    this.setState({
      roundTripLength: event.target.value,
      generateButton: "Generate",
      seed: 1,
    });
  };

  vehicleChangeHandler = (event) => {
    this.setState({
      vehicle: event.target.value,
    });
  };

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
      this.setState({
        generated: this.state.generated + 1,
      });
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

    console.log(this.state.vehicleRoundTrip);
    console.log(this.state.vehicleRoundTrip);
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
            this.state.startingLon +
            "," +
            this.state.startingLat +
            ']],"options":{"round_trip":{"length":' +
            this.state.roundTripLength +
            ',"points":3,"seed":' +
            this.state.seed +
            "}}}",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            roundTripCoords: data.features[0].geometry.coordinates,
          });
          console.log(data.features[0].geometry.coordinates);
          this.setState({
            generateButton: "Randomise",
            seed: this.state.seed + 1,
          });
        });
    };

    asyncWrapper();
  };

  render() {
    const { roundTripStart, startingpoint, lat, lng } = this.state;
    var displayStartingPoint,
      displayRoundStartingPoint = "";

    if (startingpoint === `${lat}, ${lng}`) {
      displayStartingPoint = "My Location";
    } else {
      displayStartingPoint = this.state.startingpoint;
    }

    if (roundTripStart === `${lat}, ${lng}`) {
      displayRoundStartingPoint = "My Location";
    } else {
      displayRoundStartingPoint = this.state.roundTripStart;
    }

    return (
      <div>
        {this.state.roundTrip == true ? (
          <form id="roundTripForm" onSubmit={this.handleSubmitRoundTrip}>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Start point for round trip"
                  name="roundTripStart"
                  onChange={this.roundTripStartHandler}
                  value={displayRoundStartingPoint}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Length of trip"
                  name="roundTripLength"
                  onChange={this.roundTripLengthHandler}
                />
              </div>
            </div>

            <div className="form-group">
              <button
                id="roundTripMyLocation"
                onClick={this.roundTripLocationHandler}
                type="button"
                className="btn btn-sm btn-secondary"
                value="myRoundLocation"
              >
                Use My Location
              </button>
            </div>

            <br />

            <div className="form-row">
              <div className="col">
                <label htmlFor="demo_overview_minimal"></label>
                <select
                  class="form-control"
                  data-role="select-dropdown"
                  data-profile="minimal"
                  cy-name="vehicleChoice"
                  value={this.state.value}
                  onChange={this.vehicleChangeHandler}
                >
                  {" "}
                  <option selected disabled>
                    Mode of Transport
                  </option>
                  <option value="car">Driving</option>
                  <option value="bike">Cycling</option>
                  <option value="foot">Walking</option>
                  <option value="hike">Hiking</option>
                </select>
              </div>
              <div className="col m-3">
                <input
                  id="roundTripButton"
                  className="form-control"
                  type="submit"
                  className="btn btn-primary"
                  value={this.state.generateButton}
                />
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={this.submitHandler} id="secondForm">
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Starting Point"
                  name="startingpoint"
                  value={displayStartingPoint}
                  onChange={this.startChangeHandler}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="End Point"
                  name="endpoint"
                  onChange={this.endChangeHandler}
                />
              </div>
            </div>

            <div className="form-group">
              <button
                onClick={this.locationHandler}
                type="button"
                className="btn btn-sm btn-secondary"
                value="myLocation"
              >
                Use My Location
              </button>
            </div>

            <div className="form-row">
              <div className="col">
                <label for="demo_overview_minimal"></label>
                <select
                  class="form-control"
                  data-role="select-dropdown"
                  data-profile="minimal"
                  cy-name="roundVehiclechoice"
                  value={this.state.value}
                  onChange={this.vehicleChangeHandler}
                >
                  {" "}
                  <option selected disabled>
                    Mode of Transport
                  </option>
                  <option value="car">Driving</option>
                  <option value="bike">Cycling</option>
                  <option value="foot">Walking</option>
                  <option value="hike">Hiking</option>
                </select>
              </div>
              <div className="col m-3">
                <input
                  id="roundTripButton"
                  className="form-control"
                  type="submit"
                  className="btn btn-primary"
                  value="Generate"
                />
              </div>
            </div>
          </form>
        )}
        <button
          value="Add endpoint"
          id="addEndPoint"
          className="btn btn-danger"
          onClick={this.formHandler}
        >
          {this.state.buttonText}
        </button>

        <LeafletMapContainer
          startingCoords={[this.state.startingLat, this.state.startingLon]}
          endingCoords={[this.state.endingLat, this.state.endingLon]}
          roundTripCoords={this.state.roundTripCoords}
          vehicle={this.state.vehicle}
          lat={this.state.lat}
          lng={this.state.lng}
          generated={this.state.generated}
        />
      </div>
    );
  }
}

export default Form;
