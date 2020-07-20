import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteButton(props) {
    return (
      <button
        type="button"
        className="close"
        onClick={(event) => props.removeMap(event)}
      >
        <DeleteIcon />
      </button>
    )
}

export default DeleteButton;
