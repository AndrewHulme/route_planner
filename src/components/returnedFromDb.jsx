import React, { Component } from 'react';
import fire from './firebase';

class ReturnedFromDB extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.renderRouteData()
  }
  renderRouteData = () => {
      let db = fire.firestore();
      let arr = []
      db.collection('routes').get().then((snapshot) => {
        snapshot.docs.forEach((item, i) => {
          arr.push(item.data())
        });
        this.setState({
          data: arr
        });
        console.log(this.state.data)
    })
  }


  render() {
    return (
      <ul>
        { this.state.data.map((item, i) => {
          return (
            <li key={i}>
              <p>Distance: {item.distance}m</p>
              <p>Username: {item.userName}</p>
              <p>Activity: {item.vehicleType}</p>
              <p>Start: {item.startingCoordinates}</p>
              <p>Start: {item.endingCoordinates}</p>
            </li>
          )
        })}
        </ul>
        );
      }
   }
export default ReturnedFromDB;
