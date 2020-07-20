import React from 'react';
import { Navbar } from 'react-bootstrap';

function NavBarLogo(props) {
  return (
    <Navbar.Brand
      onClick={(e) => props.homePageView(e)}
      className="main-logo"
      href=""
    >
      {/* <img src={require('../../../images/logo.png')} /> */}
      🍩 ThereAndBack
    </Navbar.Brand>
  );
}

export default NavBarLogo;
