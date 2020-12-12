import React, { Component } from 'react';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';

export default class UserAccount extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="col">
          <input
            value={this.props.email}
            onChange={this.props.handleChange}
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
            value={this.props.password}
            onChange={this.props.handleChange}
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <LogInButton login={this.props.login} />
        <SignUpButton signup={this.props.signup} />
      </React.Fragment>
    );
  }
}
