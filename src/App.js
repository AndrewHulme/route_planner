import React, { Component } from 'react';
import './css/app.css';
import fire from './components/firebase.jsx';
import Form from './components/form.jsx';
import Login from './components/login.jsx';
import Flash from './components/flash.jsx';
import NavBar from './components/navBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

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
        <NavBar />
        <Flash />
        {this.state.user ? <Form user={this.state.user} /> : <Login />}
        {/* <Login />
        <Form /> */}
      </div>
    );
  }
}

export default App;
