import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsAuthenticated, getIsAuthenticating } from "reducers/selectors";

class PrivateRoute extends React.Component {
  render() {
    const { isAuthenticated, isAuthenticating, children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          !isAuthenticated && !isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }
}

const mapState = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
  isAuthenticating: getIsAuthenticating(state),
});

export default connect(mapState)(PrivateRoute);
