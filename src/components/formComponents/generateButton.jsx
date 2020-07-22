import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
        <LocationOnIcon id="location" />
        Generate
      </button>
    </div>
  );
}

export default GenerateButton;
