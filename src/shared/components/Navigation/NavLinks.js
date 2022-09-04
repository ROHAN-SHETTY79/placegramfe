import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Button from "../FormElements/Button";
import "./NavLinks.css";

const NavLinks = () => {
  // we are listening to context here
  const auth = useContext(AuthContext);

  const { isLoggedIn } = auth;

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>{isLoggedIn && <NavLink to="/u1/places">MY PLACES</NavLink>}</li>
      <li>{isLoggedIn && <NavLink to="/places/new">ADD PLACES</NavLink>}</li>
      <li>{!isLoggedIn && <NavLink to="/auth">AUTHENTICATE</NavLink>}</li>
      <li>{isLoggedIn && <Button onClick={auth.logout}>LOGOUT</Button>}</li>
    </ul>
  );
};

export default NavLinks;
