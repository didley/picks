import React from "react";

import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import { getIsAuthenticated } from "reducers/selectors";

import NavBar from "./NavBar";
import Home from "./HomePage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import FeedPage from "./FeedPage";
import CreatePage from "./CreatePage";
import ProfilePage from "./ProfilePage";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <NavBar isAuthenticated={isAuthenticated} />
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
            <Route path="/">{isAuthenticated ? <FeedPage /> : <Home />}</Route>
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapState = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapState)(App);
