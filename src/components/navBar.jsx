import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import fire from './firebase';
import Flash from './flash';
import NavBarLogo from './navBar/NavBarLogo';
import UserAccount from './navBar/UserAccount';
import NavBarComponent from './navBar/NavBarComponent';
import LogOutButton from './navBar/LogOutButton';

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
        <navBarComponent />
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <NavBarLogo homePageView={this.homePageView} />
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
                      <LogOutButton logout={this.logout} />
                    </div>
                  ) : (
                    <UserAccount
                      email={this.state.email}
                      password={this.state.password}
                      login={this.login}
                      signup={this.signup}
                      handleChange={this.handleChange}
                    />
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
