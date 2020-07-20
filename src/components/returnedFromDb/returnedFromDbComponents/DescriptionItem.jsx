import React from "react";
import Moment from "react-moment";

function DescriptionItem (props) {
  return (
    <div className="col map-el description">
      <p>{props.description}</p>
      <div className="underline"></div>
    </div>
  )
}

export default DescriptionItem;
