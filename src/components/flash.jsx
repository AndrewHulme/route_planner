import React, { Component } from 'react';
import FlashMessage from 'react-flash-message';

class Flash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Flash Message',
      isActive: true,
    };
  }

  hideAlert() {
    this.setState({
      isActive: false,
    });
  }

  render() {
    if (this.state.isActive) {
      return (
        <div className="alert alert-warning alert-dismissible" role="alert">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => this.hideAlert()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {this.state.message}
        </div>
      );
    }
    return <div />;
  }
}
export default Flash;
