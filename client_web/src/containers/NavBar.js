import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const NavBar = ({ isAuthenticated, onLogoutClick, user }) => {
  const authenticatedLinks = (
    <>
      <li>
        <Link to="/feed">Feed</Link>
      </li>
      <li>
        <Link to="/create">Create</Link>
      </li>
      <li>
        <Link to={`/profile/${user.username}`}>Profile</Link>
      </li>
      <li>
        <button onClick={onLogoutClick}>Log Out</button>
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
