import React, { Component } from "react";

class Form extends Component {
  state = {};

  startChangeHandler = (event) => {
    this.setState({
      startingpoint: event.target.value
    })
  }

  endChangeHandler = (event) => {
    this.setState({
      endpoint: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Starting Point:</label>
            <input autoFocus className='form-control' type="text" name="startingpoint" onChange={this.startChangeHandler}/>
          </div>
          <div className="form-group">
            <label>End Point:</label>
            <input className='form-control' type="text" name="endpoint" onChange={this.endChangeHandler}/>
          </div>
          <br />
          <input className='form-control' type="submit" className="btn btn-primary" value="Generate" />
        </form>
      </div>
    );
  }
}

export default Form;
