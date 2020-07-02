import React, { Component } from "react";
import "./css/app.css";
import fire from "./components/firebase.jsx";
import Form from "./components/form.jsx";
import Flash from "./components/flash.jsx";
import NavBar from "./components/navBar.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      toggleMyMaps: false,
      generated: 0,
      roundTripGenerated: 0,
    };
    this.authListener = this.authListener.bind(this);
  }

  resetGeneratedValue = () => {
    this.setState({
      generated: 0,
    });
  };

  resetRoundTripGeneratedValue = () => {
    this.setState({
      roundTripGenerated: 0,
    });
  };

  addOneGeneratedValue = () => {
    this.setState({
      generated: this.state.generated + 1,
    });
  };

  addOneRoundTripGeneratedValue = () => {
    this.setState({
      roundTripGenerated: this.state.roundTripGenerated + 1,
    });
  };

  componentDidMount() {
    this.authListener();
  }

  toggleMyMaps = (value) => {
    let toggleMyMaps = value;
    this.setState({
      toggleMyMaps: toggleMyMaps,
    });
    // console.log(this.state.toggleMyMaps);
  };

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    console.log("Generated in App");
    console.log(this.state.generated);
    console.log(this.state.roundTripGenerated);

    return (
      <div className="App">
        <NavBar
          toggleMyMaps={this.toggleMyMaps}
          user={this.state.user}
          generated={this.state.generated}
          roundTripGenerated={this.state.roundTripGenerated}
          resetGeneratedValue={this.resetGeneratedValue}
          resetRoundTripGeneratedValue={this.resetRoundTripGeneratedValue}
          addOneGeneratedValue={this.addOneGeneratedValue}
          addOneRoundTripGeneratedValue={this.addOneRoundTripGeneratedValue}
        />
        <Flash user={this.state.user} />

        <Form
          toggleMyMaps={this.state.toggleMyMaps}
          user={this.state.user}
          generated={this.state.generated}
          roundTripGenerated={this.state.roundTripGenerated}
          resetGeneratedValue={this.resetGeneratedValue}
          resetRoundTripGeneratedValue={this.resetRoundTripGeneratedValue}
          addOneGeneratedValue={this.addOneGeneratedValue}
          addOneRoundTripGeneratedValue={this.addOneRoundTripGeneratedValue}
        />
      </div>
    );
  }
}

export default App;
