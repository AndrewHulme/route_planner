import React, { Component } from 'react';

export default class LogInButton extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="">
          <button
            type="submit"
            onClick={this.props.login}
            id="logInButton"
            class="btn btn-primary btn-sm"
          >
            Login
          </button>
        </div>
      </React.Fragment>
    );
  }
}
