import React, { Component } from "react";

class Form extends Component {
  state = {};
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Starting Point:</label>
            <input autoFocus className='form-control' type="text" name="startingpoint" />
          </div>
          <div className="form-group">
            <label>End Point:</label>
            <input className='form-control' type="text" name="endpoint" />
          </div>
          <br />
          <input className='form-control' type="submit" className="btn btn-primary" value="Generate" />
        </form>
      </div>
    );
  }
}

export default Form;
