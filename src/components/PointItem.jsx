import React from "react";

function PointItem (props) {
  return (
    <div className="col map-el">
      <p>{props.text} {props.point}</p>
    </div>
  )
}

export default PointItem;
