import React from "react";

function ActivityItem (props) {
  return (
    <div className="col map-el">
      <p>Activity: {props.vehicleType}</p>
    </div>
  )
}

export default ActivityItem;
