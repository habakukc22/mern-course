import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

function NavLinks() {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to={"/"} exact>
          All users
        </NavLink>
      </li>

      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>My places</NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <NavLink to={"/places/new"}>New place</NavLink>
        </li>
      )}

      {!isLoggedIn && (
        <li>
          <NavLink to={"/auth"}>Autheticate</NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
