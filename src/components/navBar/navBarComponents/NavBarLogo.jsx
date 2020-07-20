import React from 'react';
import { Navbar } from 'react-bootstrap';

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
