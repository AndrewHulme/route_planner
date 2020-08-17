import React from "react";
import SwapVertIcon from "@material-ui/icons/SwapVert";

function ChangeFormType(props) {
  return (
    <button
      id="addEndPoint"
      className="btn btn-danger buttons"
      onClick={props.formHandler}
      value={props.buttonText}
    >
      <SwapVertIcon id="swap" />
      {props.buttonText}
    </button>
  );
}

export default ChangeFormType;
