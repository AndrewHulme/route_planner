import React, { Component } from 'react';
import fire from './firebase';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

class ReturnedFromDB extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      key: '',
    };
  }

  componentDidMount() {
    this.renderRouteData();
  }

  removeMap = (id, event) => {
    event.stopPropagation();
    console.log(id);
    // this.props.removeMap(id);
    let db = fire.firestore();
    let collectionRef = db.collection('routes');
    collectionRef
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              this.props.updateMapContainer();
              console.log('Document successfully deleted!');
            })
            .catch(function (error) {
              console.error('Error removing document: ', error);
            });
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  displaySavedRoute = (id) => {
    console.log(id);
    let db = fire.firestore();
    db.collection('routes')
      .where('id', '==', id)
      .get()
      .then((snapshot) => {
        this.setState({
          route: snapshot.docs[0].data(),
        });
        console.log(this.state.route);
        this.props.displayRoute(this.state.route);
      });
  };

  renderRouteData = () => {
    let db = fire.firestore();
    let arr = [];
    db.collection('routes')
      .orderBy('id')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item, i) => {
          arr.push(item.data());
        });
        this.setState({
          data: arr,
        });
        console.log(this.state.data);
      });
  };

  convertDate(time) {
    let date = new Date(parseInt(time));
    let formatted_date =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();
    console.log(this.props.user.email);
    return formatted_date;
  }

  render() {
    let db = this.state.data.reverse();
    return (
      <div className="list-container">
        {db.map((item, i) => {
          if (this.props.user && item.userName == this.props.user.email) {
            return (
              <div onClick={() => this.displaySavedRoute(item.id)} className="list-item">
                <div key={i} className="savedMapDiv">
                  <div className="col map-el description">
                    <p>{item.description}</p>
                  </div>

                  { item.roundTrip && (
                    <div className="col map-el">
                      <p>Starting point: {item.roundTripStart}</p>
                    </div>
                  )}
                  { !item.roundTrip && (
                    <div className="col map-el">
                      <p>Starting point: {item.startingPoint}</p>
                      <p>Ending point: {item.endPoint}</p>
                    </div>
                  )}

                  <div className="col map-el">
                    <p>Activity: {item.vehicleType}</p>
                  </div>
                    <div className="col map-el description">
                      <p>Distance: {item.distance}</p>
                    </div>
                  <div className="map-el">
                    <Moment fromNow>{this.convertDate(item.id)}</Moment>
                  </div>
                  <div className="map-el">
                    <button
                      type="button"
                      className="close"
                      onClick={(event) => this.removeMap(item.id, event)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
export default ReturnedFromDB;
