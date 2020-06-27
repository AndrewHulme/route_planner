import React from 'react';
import firebase from "./Firestore";

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
      let db = firebase.firestore();
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
            </li>
          )
        })}
        </ul>
        );
      }
   }
export default ReturnedFromDB;
