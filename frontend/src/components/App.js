import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "rsuite/lib/styles/index.less";
import { Container } from "rsuite";

import { Sidenav, Header, Dashboard, Personal, Academics, Finance, Resources, Settings } from "./index";

class App extends Component {
  render() {
    const userId = 2;
    return (
      <Router>
        <Container>
          {/* Header */}
          <Header />

          <div style={{ display: "flex", overflowX: "hidden" }}>
            {/* Side Nav Bar */}
            <div style={{ minHeight: "calc(100vh - 88px)", height: "100%", float: "left" }}>
              <Sidenav userId={userId}/>
            </div>

            {/* Main Content */}
            <div style={{ flexGrow: "1", backgroundColor: "#E5E5E5", padding: "15px" }}>
              <Switch>
                <Route path="/personal">
                  <Personal userId={userId}/>
                </Route>
                <Route path="/academics">
                  <Academics userId={userId}/>
                </Route>
                <Route path="/finance">
                  <Finance userId={userId}/>
                </Route>
                <Route path="/resources">
                  <Resources userId={userId}/>
                </Route>
                <Route path="/settings">
                  <Settings userId={userId}/>
                </Route>
                <Route path="/">
                  <Dashboard userId={userId}/>
                </Route>
              </Switch>
            </div>
          </div>

          {/* Bottom Green Line */}
          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#78BE20",
            }}
          />
        </Container>
      </Router>
    );
  }
}

export default App;
