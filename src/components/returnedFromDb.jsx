import React, { Component } from 'react';
import fire from './firebase';

class ReturnedFromDB extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      mapID: '',
    };
  }

  componentDidMount() {
    this.renderRouteData();
  }

  displaySavedRoute = (id) => {
    this.setState({
      mopID: id,
    });
    console.log(id);
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

  render() {
    return (
      <ul>
        {this.state.data.map((item, i) => {
          return (
            <a onClick={() => this.displaySavedRoute(item.id)}>
              <div key={i}>
                {console.log(this.state.mapID)}
                <p>User: {item.userName}</p>
                <p>Id: {item.id}</p>
              </div>
            </a>
          );
        })}
      </ul>
    );
  }
}
export default ReturnedFromDB;
