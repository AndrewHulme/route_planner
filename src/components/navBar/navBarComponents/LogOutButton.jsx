import React, { Component } from 'react';

export default class LogOutButton extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="">
          <button
            className="btn btn-danger btn-sm"
            onClick={this.props.logout}
            id="logOutButton"
          >
            Logout
          </button>
        </div>
      </React.Fragment>
    );
  }
}
