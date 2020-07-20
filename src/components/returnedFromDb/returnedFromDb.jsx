import React, { Component } from "react";
import fire from "../firebase";
import Moment from "react-moment";
import DeleteButton from "./returnedFromDbComponents/DeleteButton.jsx";
import SavedRouteCard from "./returnedFromDbComponents/SavedRouteCard.jsx";

class ReturnedFromDB extends React.Component {
  constructor() {
    super();
    this.routes = fire.firestore().collection("routes");
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
    this.routes
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              this.props.updateMapContainer();
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
    this.routes
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
    this.routes
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

  convertDate = (date) => {
    let convertedDate = new Date(parseInt(date));
    return convertedDate;
  }

  convertDistance = (distance) => {
    let convertedDistance = (distance * 0.001).toFixed(2);
    return convertedDistance;
  }

  listDataReverse = () => {
    return this.state.data.reverse();
  }

  render() {
    const { removeMap, user, toggleMyMaps } = this.props;
    return (
      <div>
        <div
          className="db-form"
          style={{ display: toggleMyMaps ? "block" : "none" }}
        >
          {this.listDataReverse().map((item, i) => {
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
                <SavedRouteCard
                  key={id}
                  id={id}
                  i={i}
                  displaySavedRoute={() => this.displaySavedRoute(id)}
                  description={description}
                  roundTripStart={roundTripStart}
                  startingPoint={startingPoint}
                  endPoint={endPoint}
                  vehicleType={vehicleType}
                  roundTrip={roundTrip}
                  convertDistance={this.convertDistance(distance)}
                  convertDate={this.convertDate(id)}
                  removeMap={(event) => this.removeMap(id, event)}
                  >
                </SavedRouteCard>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
export default ReturnedFromDB;
