import React from "react";
import Moment from "react-moment";

function SavedDateItem (props) {
  return (
    <div className="col map-el">
      <span>Saved </span>
      <Moment fromNow>{props.date}</Moment>
    </div>
  )
}

export default SavedDateItem;
