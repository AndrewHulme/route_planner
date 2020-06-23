import React, { Component } from "react";

class Form extends Component {
  state = {};
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Starting Point:</label>
            <input type="text" name="startingpoint" />
          </div>
          <div className="form-group">
            <label>End Point:</label>
            <input type="text" name="endpoint" />
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Generate" />
        </form>
      </div>
    );
  }
}

export default Form;
