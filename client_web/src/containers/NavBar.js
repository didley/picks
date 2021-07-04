import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const NavBar = ({ isAuthenticated }) => {
  const authenticatedLinks = (
    <>
      <li>
        <Link to="/feed">Feed</Link>
      </li>
      <li>
        <Link to="/create">Create</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/logout">Log Out</Link>
      </li>
    </>
  );

  const unAuthenticatedLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );

  return (
    <nav>
      <ul className="flex gap-4 underline">
        {isAuthenticated ? authenticatedLinks : unAuthenticatedLinks}
      </ul>
    </nav>
  );
};

NavBar.propTypes = propTypes;

export default NavBar;
