import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

class NavBar extends React.Component {
  render() {
    const { isAuthenticated, onLogoutClick, user, location } = this.props;

    const authenticatedLinks = (
      <>
        <li>
          <Link to={`/profile/${user?.username}`} className="hover:underline">
            <small className="font-xs text-white">My profile</small>
          </Link>
        </li>
        |
        <li>
          <Link to={`/account`} className="hover:underline">
            <small className="font-xs text-white">My account</small>
          </Link>
        </li>
        |
        <li>
          <button onClick={onLogoutClick} className="hover:underline">
            <small className="font-xs text-white">Log out</small>
          </button>
        </li>
      </>
    );

    const unAuthenticatedLinks = (
      <>
        <li>
          <Link to="/" className="hover:underline">
            <small className="font-xs text-white">Register</small>
          </Link>
        </li>
        |
        <li>
          <Link to="/#login" className="hover:underline">
            <small className="font-xs text-white">Log in</small>
          </Link>
        </li>
      </>
    );

    if (location.pathname === "/") return null;

    return (
      <nav className="bg-gray-900 h-11 sm:h-14 text-white flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-white font-black text-xl sm:text-3xl tracking-tight"
        >
          Picks
        </Link>
        <ul className="flex gap-4">
          {isAuthenticated ? authenticatedLinks : unAuthenticatedLinks}
        </ul>
      </nav>
    );
  }
}

NavBar.propTypes = propTypes;

export default withRouter(NavBar);
