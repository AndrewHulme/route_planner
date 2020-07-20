import React, { Component } from 'react';
import './css/app.css';
import fire from './components/firebase.jsx';
import Form from './components/form.jsx';
import Flash from './components/flash.jsx';
import NavBar from './components/navBar/navBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      toggleMyMaps: false,
    };
    this.authListener = this.authListener.bind(this);
  }

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
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar toggleMyMaps={this.toggleMyMaps} user={this.state.user} />
        <Flash user={this.state.user} />
        <Form toggleMyMaps={this.state.toggleMyMaps} user={this.state.user} />
      </div>
    );
  }
}

export default App;
