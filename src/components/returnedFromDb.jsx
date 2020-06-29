import React, { Component } from 'react';
import fire from './firebase';

class ReturnedFromDB extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.renderRouteData();
  }

  removeMap = (id) => {
    console.log(id);
    // this.props.removeMap(id);
    let db = fire.firestore();
    db.collection('routes').doc(id).delete();
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

  render() {
    return (
      <ul>
        {this.state.data.map((item, i) => {
          return (
            <a onClick={() => this.displaySavedRoute(item.id)}>
              <div key={i} className="savedMapDiv row">
                <div className="col">
                  <p>User: {item.userName}</p>
                </div>
                <div className="col">
                  <p>Id: {item.id}</p>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="close"
                    onClick={() => this.removeMap(item.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </a>
          );
        })}
      </ul>
    );
  }
}
export default ReturnedFromDB;
