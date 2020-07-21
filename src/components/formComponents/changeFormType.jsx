import React from "react";
import SwapVertIcon from "@material-ui/icons/SwapVert";

function ChangeFormType(props) {
  return (
    <button
      // value="Add endpoint"
      id="addEndPoint"
      className="btn btn-danger buttons"
      onClick={props.formHandler}
    >
      <SwapVertIcon id="swap" />
      {props.buttonText}
    </button>
  );
}

export default ChangeFormType;
