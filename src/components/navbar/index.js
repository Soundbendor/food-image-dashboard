import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./navbar-elements";
import { ReactComponent as MealSpotterLogo } from "../../assets/pictures/mealspotter.svg";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <MealSpotterLogo/>
        <NavLink to="" activeStyle>
            Home
          </NavLink>
          <NavLink to="/user" activeStyle>
            User
          </NavLink>
          <NavLink to="/patients" activeStyle>
            Patients
          </NavLink>
          <NavLink to="/meals" activeStyle>
            Meals
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;