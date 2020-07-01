import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import fire from './firebase';

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
    };
  }

  toggleMyMaps = () => {
    // console.log(this.state.toggleMyMaps);
    let opposite = !this.state.toggleMyMaps;
    this.setState({
      toggleMyMaps: opposite,
    });
    // console.log(this.state.toggleMyMaps);
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
      .then((u) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    fire.auth().signOut();
  }
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand
            onClick={this.homePageView}
            className="main-logo"
            href=""
          >
            🍩 Donut routing
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <form>
              <div className="row m-2">
                {this.props.user ? (
                  <div className="row">
                    <div className="col">
                      <Nav className="mr-auto">
                        <Nav.Link onClick={this.toggleMyMaps} href="">
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
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div class="form-group col">
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
                    <div class="form-group col">
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
                        class="btn btn-primary btn-sm"
                      >
                        Login
                      </button>
                    </div>
                    <div className="">
                      <button
                        onClick={this.signup}
                        className="btn btn-success btn-sm"
                      >
                        Signup
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
