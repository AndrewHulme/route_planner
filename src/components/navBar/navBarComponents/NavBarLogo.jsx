import React from 'react';
import { Navbar } from 'react-bootstrap';

function NavBarLogo(props) {
  return (
    <Navbar.Brand
      onClick={(e) => props.homePageView(e)}
      className="main-logo"
      href=""
    >
      <img className="logo" src={require('../../../images/logo.png')} />
    </Navbar.Brand>
  );
}

export default NavBarLogo;
