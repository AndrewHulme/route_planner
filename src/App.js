import React, { Component } from 'react';
import './css/app.css';
import fire from './components/firebase.jsx';
import Form from './components/form.jsx';
import Login from './components/login.jsx';

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
        {this.state.user ? <Form /> : <Login />}
        {/* <Login />
        <Form /> */}
      </div>
    );
  }
}

export default App;
