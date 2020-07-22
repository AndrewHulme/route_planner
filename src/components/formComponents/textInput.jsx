import React from 'react';

function TextInput(props) {
  return (
    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.changeHandler}
        value={props.value}
      />
    </div>
  );
}

export default TextInput;
