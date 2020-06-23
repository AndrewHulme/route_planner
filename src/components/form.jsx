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
    console.log(this.state);

    var apiKey = process.env.REACT_APP_ROUTE_API_KEY;
    var transportType = "driving-car";
    var startCoordinates = "8.681495,49.41461";
    var endCoordinates = "8.687872,49.420318";
    // console.log(apiKey);

    // // Starting coordinates
    // fetch(
    //   `https://api.openrouteservice.org/geocode/search?api_key=` +
    //     apiKey +
    //     `&text=Piccadilly%20Circus`
    // )
    //   // We get the API response and receive data in JSON format...
    //   .then((response) => response.json())
    //   // ...then we update the users state
    //   .then((data) => console.log(data))
    //   // Catch any errors we hit and update the app
    //   .catch((error) => this.setState({ error, isLoading: false }));

    // Directions request
    fetch(
      `https://api.openrouteservice.org/v2/directions/` +
        transportType +
        `?api_key=` +
        apiKey +
        `&start=` +
        startCoordinates +
        `&end=` +
        endCoordinates
    )
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => console.log("Directions Request Made"))
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  render() {
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
