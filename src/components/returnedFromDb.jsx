import React, { Component } from "react";
import fire from "./firebase";
import Moment from "react-moment";
import DeleteButton from "./DeleteButton.jsx";
import DeleteIcon from "@material-ui/icons/Delete";

class ReturnedFromDB extends React.Component {
  constructor() {
    super();
    this.db = fire.firestore();
    this.state = {
      data: [],
      key: "",
    };
  }

  componentDidMount() {
    this.renderRouteData();
  }

  removeMap = (id, event) => {
    event.stopPropagation();
    this.db.collection("routes")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              this.props.updateMapContainer();
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.error("Error getting documents: ", error);
      });
  };

  displaySavedRoute = (id) => {
    this.db.collection("routes")
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        this.setState({
          route: snapshot.docs[0].data(),
        });
        this.props.displayRoute(this.state.route);
      });
  };

  renderRouteData = () => {
    let arr = [];
    this.db.collection("routes")
      .orderBy("id")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item, i) => {
          arr.push(item.data());
        });
        this.setState({
          data: arr,
        });
      });
  };

  convertDate(date) {
    let convertedDate = new Date(parseInt(date));
    return convertedDate;
  }

  convertDistance(distance) {
    let convertedDistance = (distance * 0.001).toFixed(2);
    return convertedDistance;
  }

  listDataReverse = () => {
    this.state.data.reverse();
  }

  render() {
    const { removeMap, user, toggleMyMaps } = this.props;
    return (
      <div>
        <div
          className="db-form"
          style={{ display: toggleMyMaps ? "block" : "none" }}
        >
          {this.state.data.reverse().map((item, i) => {
            const {
              description,
              distance,
              endPoint,
              endingCoordinates,
              id,
              roundTrip,
              roundTripCoordinates,
              roundTripStart,
              startingCoordinates,
              startingPoint,
              userName,
              vehicleType
            } = item;
            if (user && userName == user.email) {
              return (
                <div onClick={() => this.displaySavedRoute(id)}>
                  <div key={i} className="savedMapDiv">
                    <div className="col map-el description">
                      <p>{description}</p>
                      <div className="underline"></div>
                    </div>
                    {roundTrip && (
                      <div className="col map-el">
                        <p>Starting point: {roundTripStart}</p>
                      </div>
                    )}
                    {!roundTrip && (
                      <div className="col map-el">
                        <p>Starting point: {startingPoint}</p>
                        <p>Ending point: {endPoint}</p>
                      </div>
                    )}
                    <div className="col map-el">
                      <p>Activity: {vehicleType}</p>
                    </div>
                    <div className="col map-el">
                      <p>Distance: {this.convertDistance(distance)} km</p>
                    </div>
                    <div className="col map-el">
                      <span>Saved </span>
                      <Moment fromNow>{this.convertDate(id)}</Moment>
                    </div>
                    <div className="dustbin">
                      <DeleteButton id={id} removeMap={(event) => this.removeMap(id, event)} />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
export default ReturnedFromDB;
