import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsAuthenticated, getIsAuthenticating } from "reducers/selectors";

class PrivateRoute extends React.Component {
  render() {
    const {
      isAuthenticated,
      isAuthenticating,
      render,
      component: Component,
      children,
      ...rest
    } = this.props;

    if (render)
      throw new TypeError(
        "render prop has not been implemented in PrivateRoute.js, use component or children props instead or implement it"
      );

    return (
      <Route
        {...rest}
        render={(routeProps) => {
          if (!isAuthenticated && !isAuthenticated) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: routeProps.location },
                }}
              />
            );
          }

          if (Component) return <Component {...routeProps} />;

          return children;
        }}
      />
    );
  }
}

const mapState = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
  isAuthenticating: getIsAuthenticating(state),
});

export default connect(mapState)(PrivateRoute);
