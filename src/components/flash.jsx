import React, { Component } from "react";
import FlashMessage from "react-flash-message";

class Flash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Flash Message",
      //isActive: this.props.isActive,
    };
  }

  hideAlert = () => {
    this.props.hideAlert();
  };

  render() {
    if (this.props.isActive) {
      return (
        <div
          className="alert alert-warning alert-dismissible flash"
          role="alert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => this.hideAlert()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p>{this.props.message}</p>
        </div>
      );
    }
    return <div />;
  }
}
export default Flash;
