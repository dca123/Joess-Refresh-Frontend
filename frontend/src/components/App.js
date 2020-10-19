import React, { Component } from "react";
import "./App.css";
import "rsuite/lib/styles/index.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./SideNav";

import Home from "./Home";
import Profile from "./Profile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Sidenav />

          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/settings">{/* <Settings /> */}</Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
