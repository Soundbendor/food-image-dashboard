import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./navbar-elements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;