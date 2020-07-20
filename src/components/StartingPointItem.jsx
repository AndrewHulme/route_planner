import React from "react";

function StartingPointItem (props) {
  return (
    <div className="col map-el">
      <p>Starting point: {props.start}</p>
    </div>
  )
}

export default StartingPointItem;
