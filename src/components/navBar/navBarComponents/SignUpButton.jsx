import React, { Component } from 'react';

export default class SignUpButton extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="">
          <button
            onClick={this.props.signup}
            id="signUpButton"
            className="btn btn-success btn-sm"
          >
            Signup
          </button>
        </div>
      </React.Fragment>
    );
  }
}
