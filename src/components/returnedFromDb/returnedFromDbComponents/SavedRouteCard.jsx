import React, { Component } from "react";
import DeleteButton from "./DeleteButton.jsx";
import PointItem from "./PointItem.jsx";
import ActivityItem from "./ActivityItem.jsx";
import DistanceItem from "./DistanceItem.jsx";
import SavedDateItem from "./SavedDateItem.jsx";
import DescriptionItem from "./DescriptionItem.jsx";

function SavedRouteCard(props) {
    return (
        <div
          key={props.i}
          className="savedMapDiv"
          onClick={() => props.displaySavedRoute(props.id)}
          >
          <DescriptionItem description={props.description} />
          {props.roundTrip ? (
            <PointItem text="Starting point: " point={props.startingPoint}/>
          ) : (
            <>
              <PointItem text="Starting point: " point={props.startingPoint}/>
              <PointItem text="Endpoint: " point={props.endPoint} />
            </>
          )}
          <ActivityItem vehicleType={props.vehicleType} />
          <DistanceItem distance={props.convertDistance} />
          <SavedDateItem date={props.convertDate} />
          <div className="dustbin">
            <DeleteButton id={props.id} removeMap={(event) => props.removeMap(event)} />
          </div>
        </div>
    )
}

export default SavedRouteCard;
