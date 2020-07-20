import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

export default class MyRoutes extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row user-login-container">
          <div className="col">
            <Nav className="container-fluid">
              <Nav.Link
                className="ml-auto"
                id="my-routes"
                onClick={this.props.toggleMyMaps}
                href=""
              >
                {!this.props.toggleMyMapsState ? 'My Routes' : 'Find Route'}
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
