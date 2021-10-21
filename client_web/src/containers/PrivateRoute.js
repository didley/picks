import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectAuth } from "reducers/selectors";

class PrivateRoute extends React.Component {
  render() {
    const {
      auth,
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
          if (!auth.isAuthenticated && !auth.isAuthenticating) {
            return <Redirect to="/#login" />;
          }

          if (Component) return <Component {...routeProps} />;

          return children;
        }}
      />
    );
  }
}

const mapState = (state) => ({ auth: selectAuth(state) });

export default connect(mapState)(PrivateRoute);
