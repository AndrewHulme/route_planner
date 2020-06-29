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
      mapID: id,
    });
    console.log(id);
    let db = fire.firestore();
    db.collection('routes')
      .where('id', '==', id)
      .get()
      .then((snapshot) => {
        this.setState({
          route: snapshot.docs[0].data()
        })
        console.log(this.state.route);
        this.props.displayRoute(this.state.route);
      })
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
