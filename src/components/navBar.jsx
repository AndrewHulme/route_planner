import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import fire from './firebase';
import Flash from './flash';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      email: '',
      password: '',
      toggleMyMaps: false,
      message: '',
    };
  }

  toggleMyMaps = () => {
    let opposite = !this.state.toggleMyMaps;
    this.setState({
      toggleMyMaps: opposite,
    });

    this.props.toggleMyMaps(opposite);
  };

  homePageView = () => {
    this.setState({
      toggleMyMaps: false,
    });
    this.props.toggleMyMaps(false);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.setState({ message: '', errorIsActive: false });
      })
      .catch((error) => {
        this.setState({ message: error.message, errorIsActive: true });
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.setState({ message: '', errorIsActive: false });
      })
      .catch((error) => {
        this.setState({ message: error.message, errorIsActive: true });
      });
  }
  logout() {
    fire.auth().signOut();
  }
  hideAlert = () => {
    console.log('You called?');
    this.setState({
      errorIsActive: false,
    });
  };
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand
            onClick={this.homePageView}
            className="main-logo"
            href=""
          >
            🍩 ThereAndBack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="user-nav">
              <form>
                <div className="row user-login-container">
                  {this.props.user ? (
                    <div className="row user-login-container">
                      <div className="col">
                        <Nav className="container-fluid">
                          <Nav.Link
                            className="ml-auto"
                            id="my-routes"
                            onClick={this.toggleMyMaps}
                            href=""
                          >
                            {!this.state.toggleMyMaps
                              ? 'My Routes'
                              : 'Find Route'}
                          </Nav.Link>
                        </Nav>
                      </div>
                      <div className="">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={this.logout}
                          id="logOutButton"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div class="col">
                        <input
                          value={this.state.email}
                          onChange={this.handleChange}
                          type="email"
                          name="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div class="col">
                        <input
                          value={this.state.password}
                          onChange={this.handleChange}
                          type="password"
                          name="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                      </div>
                      <div className="">
                        <button
                          type="submit"
                          onClick={this.login}
                          id="logInButton"
                          class="btn btn-primary btn-sm"
                        >
                          Login
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={this.signup}
                          id="signUpButton"
                          className="btn btn-success btn-sm"
                        >
                          Signup
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Flash
          isActive={this.state.errorIsActive}
          message={this.state.message}
          hideAlert={this.hideAlert}
        />
      </div>
    );
  }
}

export default NavBar;
