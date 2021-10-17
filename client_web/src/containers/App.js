import React from "react";

import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import { checkIsAuthenticatedAction, logoutAction } from "actions/authActions";
import { selectAuth } from "reducers/selectors";
import { nav } from "utils/history";

import NavBar from "./NavBar";
import Home from "./HomePage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import CardPage from "./CardPage";
import AlertBar from "components/AlertBar";
import AccountPage from "./AccountPage";

class App extends React.Component {
  componentDidMount() {
    this.props.checkIsAuthenticatedAction();
  }

  handleLogout = () => {
    nav("/login");
    this.props.logoutAction();
  };

  render() {
    const { auth } = this.props;

    if (auth.isAuthenticating) return <AlertBar type="LOADING" />;

    return (
      <div>
        <NavBar
          isAuthenticated={auth.isAuthenticated}
          onLogoutClick={this.handleLogout}
          user={auth.user}
        />
        <AlertBar />
        <ErrorBoundary>
          <Switch>
            <Route path="/login">
              <LogInPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>

            <Route path="/profile/:username/:cardId" component={CardPage} />
            <Route path="/profile/:username" component={ProfilePage} />

            <PrivateRoute path="/account">
              <AccountPage />
            </PrivateRoute>

            <Route path="/">
              {auth.isAuthenticated ? <ProfilePage /> : <Home />}
            </Route>
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapState = (state) => ({ auth: selectAuth(state) });

export default connect(mapState, { checkIsAuthenticatedAction, logoutAction })(
  App
);
