import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import ExamplePage from "./pages/ExamplePage";

const App = () => {
  return (
    <div>
      <nav>
        <ul className="flex gap-4 underline">
          <li>
            <Link to="/">Home</Link>
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

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/example">
          <ExamplePage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
