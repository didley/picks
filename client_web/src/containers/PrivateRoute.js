import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsAuthenticated } from "reducers/selectors";

class PrivateRoute extends React.Component {
  render() {
    const { isAuthenticated, children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}

const mapState = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapState)(PrivateRoute);
