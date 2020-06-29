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
            <div key={i}>
              <p>Id: {item.id}</p>
              <p>User: {item.userName}</p>
            </div>
          )
        })}
        </ul>
        );
      }
   }
export default ReturnedFromDB;
