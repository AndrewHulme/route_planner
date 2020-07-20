import React, { Component } from "react";
import LeafletMapContainer from "./mapleaflet.jsx";
import ReturnedFromDB from "./returnedFromDb.jsx";
import fire from "./firebase";
import Flash from "./flash";
import SwapVertIcon from "@material-ui/icons/SwapVert";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import StartInput from "./formComponents/startInput";
import VehicleChoice from "./formComponents/vehicleChoice";
import UseMyLocation from "./formComponents/useMyLocation";
import GenerateButton from "./formComponents/generateButton";

class Form extends Component {
  state = {
    vehicle: "foot-walking",
    lat: 51.5033,
    lng: -0.1195,
    roundTrip: true,
    buttonText: "Add endpoint",
    generateButton: "Generate",
    seed: 1,
    generated: 0,
    roundTripGenerated: 0,
    distance: null,
    roundTripCoords: [[], []],
    endingLat: null,
    endingLon: null,
    userName: "user",
    zoom: 13,
    description: "",
    // roundTripStart: "",
    startingpoint: "",
    endpoint: "",
    message: "",
  };

  constructor(props) {
    super(props);
  }

  displayRoute = (item) => {
    this.setState({
      generated: 0,
      roundTripGenerated: 0,
    });
    if (item.roundTrip) {
      this.setState({
        generated: 0,
        roundTripGenerated: this.state.roundTripGenerated + 1,
        roundTripCoords: JSON.parse(item.roundTripCoordinates),
        vehicle: item.vehicleType,
      });
    } else {
      let startCoordinates = [];
      item.startingCoordinates.forEach((element) => {
        return startCoordinates.push(Number(element));
      });
      let endCoordinates = [];
      item.endingCoordinates.forEach((element) => {
        return endCoordinates.push(Number(element));
      });
      this.setState({
        roundTripGenerated: 0,
        generated: this.state.generated + 1,
        startingLat: startCoordinates[0],
        startingLon: startCoordinates[1],
        endingLat: endCoordinates[0],
        endingLon: endCoordinates[1],
        vehicle: item.vehicleType,
      });
    }
  };

  hideAlert = () => {
    this.setState({
      errorIsActive: false,
    });
  };

  saveToDB = () => {
    let db = fire.firestore();
    let dbID = String(Date.now());
    let add = !this.state.addToList;
    this.updateMapContainer();
    db.collection("routes").add({
      roundTrip: this.state.roundTrip,
      distance: this.state.distance,
      roundTripCoordinates: JSON.stringify(this.state.roundTripCoords),
      startingCoordinates: [this.state.startingLat, this.state.startingLon],
      endingCoordinates: [this.state.endingLat, this.state.endingLon],
      vehicleType: this.state.vehicle,
      id: dbID,
      userName: this.props.user.email,
      description: this.state.description,
      // roundTripStart: this.state.roundTripStart,
      startingPoint: this.state.startingpoint,
      endPoint: this.state.endpoint,
    });
    this.setState({
      message: "Route saved",
      errorIsActive: true,
      description: "",
    });
  };

  updateMapContainer = () => {
    this.setState({
      key: Math.random(),
    });
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
      roundTripGenerated: 0,
      startingpoint: "",
      endpoint: "",
      // roundTripStart: "",
      roundTripLength: "",
      generated: 0,
      roundTrip: form,
      generateButton: "Generate",
      buttonText:
        this.state.buttonText == "Add endpoint" ? "Round Trip" : "Add endpoint",
    });
  };

  descriptionHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  locationHandler = (event) => {
    this.setState({
      startingpoint: `${this.state.lat}, ${this.state.lng}`,
    });
  };

  // roundTripLocationHandler = (event) => {
  //   this.setState({
  //     roundTripStart: `${this.state.lat}, ${this.state.lng}`,
  //   });
  // };

  startChangeHandler = (event) => {
    console.log("StartChangeHandler");

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
    console.log("RoundStartChangeHandler");

    this.setState({
      startingpoint: event.target.value,
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
          data[0] !== undefined
            ? this.setState({
                startingLat: data[0].lat,
                startingLon: data[0].lon,
                message: "",
                errorIsActive: false,
              })
            : this.setState({
                message: "Error starting address could not be found.",
                errorIsActive: true,
                startingLat: "",
                startingLon: "",
              })
        );
      await fetch(endingURL)
        .then((response) => response.json())
        .then((data) =>
          data[0] !== undefined && this.state.errorIsActive === false
            ? this.setState({
                endingLat: data[0].lat,
                endingLon: data[0].lon,
                message: "",
                errorIsActive: false,
              })
            : this.setState({
                message: "Error address could not be found.",
                errorIsActive: true,
                startingLat: "",
                startingLon: "",
                generated: 0,
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
        .then((data) => {
          this.setState({
            distance: data.features[0].properties.summary.distance,
            generated: this.state.generated + 1,
          });
        })
        // Catch any errors we hit and update the app
        .catch((error) => this.setState({ error, isLoading: false }));
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
      this.state.startingpoint +
      "&format=json";

    const asyncWrapper = async () => {
      await fetch(startingURL)
        .then((response) => response.json())
        .then((data) =>
          data[0] !== undefined
            ? this.setState({
                startingLat: data[0].lat,
                startingLon: data[0].lon,
                message: "",
                errorIsActive: false,
              })
            : this.setState({
                message: "Error no address could be found.",
                errorIsActive: true,
                startingLat: "",
                startingLon: "",
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
            this.state.roundTripLength * 1000 +
            ',"points":3,"seed":' +
            this.state.seed +
            "}}}",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          data.features !== undefined
            ? this.setState({
                roundTripCoords: data.features[0].geometry.coordinates,
                distance: data.features[0].properties.summary.distance,
                message: "",
                errorIsActive: false,
              })
            : this.setState({
                message: "Error no address could be found.",
                errorIsActive: true,
                roundTripCoords: "",
              });
          this.setState({
            generateButton: "Randomise",
            seed: this.state.seed + 1,
            roundTripGenerated: this.state.roundTripGenerated + 1,
          });
        });
    };

    asyncWrapper();
  };

  render() {
    const {
      // roundTripStart,
      startingpoint,
      lat,
      lng,
      roundTripLength,
      endpoint,
      description,
    } = this.state;

    var displayStartingPoint = "";

    if (startingpoint === `${lat}, ${lng}`) {
      displayStartingPoint = "My Location";
    } else {
      displayStartingPoint = this.state.startingpoint;
    }

    return (
      <div className="main-container">
        <div
          className="main-form"
          style={{ display: this.props.toggleMyMaps ? "none" : "block" }}
        >
          {!this.props.toggleMyMaps && (
            <div>
              <div className="row" id="userWelcome">
                {this.props.user ? (
                  <div className="col">
                    <p id="welcome-message">Welcome: {this.props.user.email}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {this.state.roundTrip == true ? (
                <form id="roundTripForm" onSubmit={this.handleSubmitRoundTrip}>
                  <div className="form-row">
                    <StartInput
                      startHandler={this.roundTripStartHandler}
                      displayStartingPoint={displayStartingPoint}
                      placeholder={"Start point for round trip"}
                    />

                    <div className="col" id="inputBox">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Length of trip (km)"
                        name="roundTripLength"
                        value={roundTripLength}
                        onChange={this.roundTripLengthHandler}
                      />
                    </div>
                  </div>

                  <UseMyLocation
                    // id={"roundTripMyLocation"}
                    locationHandler={this.locationHandler}
                    value={"myRoundLocation"}
                  />

                  <div className="form-row" id="generateRoute">
                    <VehicleChoice
                      cyName={"vehicleChoice"}
                      value={this.state.value}
                      vehicleChangeHandler={this.vehicleChangeHandler}
                    />

                    <GenerateButton value={this.state.generateButton} />
                  </div>
                </form>
              ) : (
                <form onSubmit={this.submitHandler} id="secondForm">
                  <div className="form-row">
                    <StartInput
                      startHandler={this.startChangeHandler}
                      displayStartingPoint={displayStartingPoint}
                      placeholder={"Starting point"}
                    />

                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="End Point"
                        name="endpoint"
                        value={endpoint}
                        onChange={this.endChangeHandler}
                      />
                    </div>
                  </div>

                  <UseMyLocation
                    locationHandler={this.locationHandler}
                    value={"myLocation"}
                  />

                  <div className="form-row" id="generateRoute">
                    <VehicleChoice
                      cyName={"roundVehiclechoice"}
                      value={this.state.value}
                      vehicleChangeHandler={this.vehicleChangeHandler}
                    />

                    <GenerateButton value={"Generate"} />
                  </div>
                </form>
              )}

              <button
                value="Add endpoint"
                id="addEndPoint"
                className="btn btn-danger buttons"
                onClick={this.formHandler}
              >
                <SwapVertIcon id="swap" />
                {this.state.buttonText}
              </button>
            </div>
          )}

          {!this.props.toggleMyMaps &&
            this.props.user &&
            (this.state.roundTripGenerated > 0 || this.state.generated > 0) && (
              <div className="form-row" id="saveRouteID">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description here..."
                    value={description}
                    name="description"
                    onChange={this.descriptionHandler}
                  />
                </div>
                <button
                  value="saveRoute"
                  id="saveRoute"
                  className="btn btn-warning buttons"
                  onClick={this.saveToDB}
                >
                  <BookmarkIcon id="save-icon" />
                  Save route
                </button>
              </div>
            )}
        </div>

        {this.props.toggleMyMaps && (
          <ReturnedFromDB
            key={this.state.key}
            displayRoute={this.displayRoute}
            removeMap={this.removeMap}
            updateMapContainer={this.updateMapContainer}
            user={this.props.user}
            toggleMyMaps={this.props.toggleMyMaps}
          />
        )}
        {this.state.errorIsActive && (
          <Flash
            message={this.state.message}
            isActive={this.state.errorIsActive}
            hideAlert={this.hideAlert}
          />
        )}
        <LeafletMapContainer
          journeyCoords={[
            [this.state.startingLat, this.state.startingLon],
            [this.state.endingLat, this.state.endingLon],
          ]}
          roundTripCoords={this.state.roundTripCoords}
          vehicle={this.state.vehicle}
          lat={this.state.lat}
          lng={this.state.lng}
          generated={this.state.generated}
          roundTripGenerated={this.state.roundTripGenerated}
          zoom={this.state.zoom}
        />
      </div>
    );
  }
}

export default Form;
