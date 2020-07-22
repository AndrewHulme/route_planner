import React from 'react';

function VehicleChoice(props) {
  return (
    <div className="col" id="dropDownSelection">
      <select
        class="form-control dropDownList"
        data-role="select-dropdown"
        data-profile="minimal"
        cy-name={props.cyName}
        value={props.value}
        onChange={props.vehicleChangeHandler}
      >
        {' '}
        <option selected value="foot-walking">
          Walking
        </option>
        <option value="driving-car">Driving</option>
        <option value="cycling-regular">Cycling</option>
        <option value="foot-hiking">Hiking</option>
      </select>
    </div>
  );
}

export default VehicleChoice;
