import React from "react";

function DistanceItem (props) {
  return (
    <div className="col map-el">
      <p>Distance: {props.distance} km</p>
    </div>
  )
}

export default DistanceItem;
