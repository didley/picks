import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./PrivateRoute";

import Home from "./HomePage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import FeedPage from "./FeedPage";
import CreatePage from "./CreatePage";
import ProfilePage from "./ProfilePage";

const App = () => {
  return (
    <div>
      <nav>
        <ul className="flex gap-4 underline">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
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
            <Link to="/example">example</Link>
          </li>
        </ul>
      </nav>

      <ErrorBoundary>
        <Switch>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <PrivateRoute path="/feed">
            <FeedPage />
          </PrivateRoute>
          <PrivateRoute path="/create">
            <CreatePage />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
};

export default App;
