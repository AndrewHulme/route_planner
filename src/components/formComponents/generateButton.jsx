import React from "react";

function GenerateButton(props) {
  return (
    <div className="col">
      <input
        id="roundTripButton"
        className="form-control"
        type="submit"
        className="btn btn-primary"
        value={props.value}
      />
    </div>
  );
}

export default GenerateButton;
