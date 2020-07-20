import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function UseMyLocation(props) {
  return (
    <div className="form-group">
      <button
        // id="roundTripMyLocation"
        onClick={props.locationHandler}
        type="button"
        className="btn btn-secondary buttons"
        value={props.value}
      >
        <LocationOnIcon id="location" />
        Use My Location
      </button>
    </div>
  );
}

export default UseMyLocation;
