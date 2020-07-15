import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

{
  /* <DeleteButton id={id} removeMap={(event) => this.removeMap(id, event)} /> */
}
function NavBarLogo(props) {
  return (
    <Navbar.Brand
      onClick={(e) => props.homePageView(e)}
      className="main-logo"
      href=""
    >
      🍩 ThereAndBack
    </Navbar.Brand>
  );
}

export default NavBarLogo;
