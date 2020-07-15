import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

class DeleteButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        type="button"
        className="close"
        onClick={(event) => this.props.removeMap(event)}
      >
        <DeleteIcon />
      </button>
    )
  }
}

export default DeleteButton;
