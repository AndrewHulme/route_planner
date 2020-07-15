import React from "react";

function StartInput(props) {
  return (
    <div className="col" id="inputBox">
      <input
        type="text"
        className="form-control"
        placeholder="Start point for round trip"
        name="startingpoint"
        onChange={props.roundTripStartHandler}
        value={props.displayStartingPoint}
      />
    </div>
  );
}

export default StartInput;
