import React, { Component } from "react";
import Moment from "react-moment";
import DeleteButton from "./DeleteButton.jsx";

function SavedRouteCard(props) {
    return (
      <div onClick={() => props.displaySavedRoute(props.id)}>
        <div key={props.i} className="savedMapDiv">
          <div className="col map-el description">
            <p>{props.description}</p>
            <div className="underline"></div>
          </div>
          {props.roundTrip && (
            <div className="col map-el">
              <p>Starting point: {props.roundTripStart}</p>
            </div>
          )}
          {!props.roundTrip && (
            <div className="col map-el">
              <p>Starting point: {props.startingPoint}</p>
              <p>Ending point: {props.endPoint}</p>
            </div>
          )}
          <div className="col map-el">
            <p>Activity: {props.vehicleType}</p>
          </div>
          <div className="col map-el">
            <p>Distance: {props.convertDistance} km</p>
          </div>
          <div className="col map-el">
            <span>Saved </span>
            <Moment fromNow>{props.convertDate}</Moment>
          </div>
          <div className="dustbin">
            <DeleteButton id={props.id} removeMap={(event) => props.removeMap(event)} />
          </div>
        </div>
      </div>
    )
}

export default SavedRouteCard;
