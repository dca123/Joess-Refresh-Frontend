import React, { Component } from "react";

import { Nav } from "rsuite";
import { Switch, Route, NavLink } from "react-router-dom";

import Demographics from "./Demographics";
import Names from "./Names";
import Addresses from "./Addresses";
import PhoneNumbers from "./PhoneNumbers";
import Emails from "./Emails";
import Contacts from "./Contacts";
import Permissions from "./Permissions";

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="nav-bar">
          <Nav appearance="">
            <Nav.Item>
              <NavLink
                to="/personal/demographics"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Demographics
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/personal/names"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Names
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/personal/addresses"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Addresses
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/personal/phonenumbers"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Phone Numbers
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/personal/emails"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Email Addresses
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/personal/contacts"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Contacts
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/personal/permissions"
                className="nav-text"
                activeClassName="active-link"
                style={{ textDecoration: "none" }}
              >
                Permissions
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>

        <div>
          <Switch>
            <Route path="/personal/demographics" >
              <Demographics userId={this.props.userId}/>
            </Route>
            <Route path="/personal/names">
              <Names userId={this.props.userId} />
            </Route>
            <Route path="/personal/addresses">
              <Addresses userId={this.props.userId} />
            </Route>
            <Route path="/personal/phonenumbers">
              <PhoneNumbers userId={this.props.userId} />
            </Route>
            <Route path="/personal/emails">
              <Emails userId={this.props.userId} />
            </Route>
            <Route path="/personal/contacts">
              <Contacts userId={this.props.userId} />
            </Route>
            <Route path="/personal/permissions">
              <Permissions userId={this.props.userId} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Profile;
