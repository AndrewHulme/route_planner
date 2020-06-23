import React, { Component } from "react";

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

  submitHandler = (event) => {
    event.preventDefault();

    var apiKey = process.env.REACT_APP_ROUTE_API_KEY;
    var geocodingKey = process.env.REACT_APP_GEOCODING_API_KEY;
    var transportType = "driving-car";
    var startCoordinates = "8.681495,49.41461";
    var endCoordinates = "8.687872,49.420318";
    var startingURL = 'https://eu1.locationiq.com/v1/search.php?key=' + geocodingKey + '&q=Piccadilly%20Circus&format=json';
    var endingURL = 'https://eu1.locationiq.com/v1/search.php?key=' + geocodingKey + '&q=Waterloo&format=json';
    var routeURL= `https://api.openrouteservice.org/v2/directions/` +
      transportType +
      `?api_key=` +
      apiKey +
      `&start=` +
      startCoordinates +
      `&end=` +
      endCoordinates;

      const asyncWrapper = async () => {
        await fetch(startingURL)
          .then(response => response.json())
          .then(data => this.setState({
            startingLat: data[0].lat,
            startingLon: data[0].lon
          }))
        await fetch(endingURL)
          .then(response => response.json())
          .then(data => this.setState({
            endingLat: data[0].lat,
            endingLon: data[0].lon
          }))
        await fetch(routeURL)
          // We get the API response and receive data in JSON format...
          .then((response) => response.json())
          // ...then we update the users state
          .then((data) => console.log("Directions Request Made"))
          // Catch any errors we hit and update the app
          .catch((error) => this.setState({ error, isLoading: false }));
      }

      asyncWrapper();

  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.submitHandler}>
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
            className="form-control"
            type="submit"
            className="btn btn-primary"
            value="Generate"
          />
        </form>
      </div>
    );
  }
}

export default Form;
