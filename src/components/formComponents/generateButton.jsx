import React from "react";

function GenerateButton(props) {
  return (
    <div className="col">
      <button
        id="roundTripButton"
        className="form-control"
        type="submit"
        className="btn btn-primary"
        value={props.value}
      >
        {props.value}
      </button>
    </div>
  );
}

export default GenerateButton;
