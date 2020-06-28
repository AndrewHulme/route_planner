import React, { Component } from 'react';
import Firebase from 'firebase';

class ReturnedFromDb extends Component {
  state = {};
  render() {
    return (
      <div>
        {/* {console.log(db.colection('routes'))} */}
        <div>Hello from DB</div>
      </div>
    );
  }
}

export default ReturnedFromDb;
