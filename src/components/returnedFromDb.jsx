import React, { Component } from 'react';
import fire from './firebase';
import Moment from 'react-moment';

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
    return formatted_date;
  }

  render() {
    return (
      <ul>
        {this.state.data.map((item, i) => {
          return (
            <p onClick={() => this.displaySavedRoute(item.id)}>
              <div key={i} className="savedMapDiv row">
                <div className="col">
                  <p>User: {item.userName}</p>
                </div>
                <div className="col">
                  <p>Id: {item.id}</p>
                </div>
                <div className="col">
                  <Moment fromNow>{this.convertDate(item.id)}</Moment>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="close"
                    onClick={(event) => this.removeMap(item.id, event)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </p>
          );
        })}
      </ul>
    );
  }
}
export default ReturnedFromDB;
