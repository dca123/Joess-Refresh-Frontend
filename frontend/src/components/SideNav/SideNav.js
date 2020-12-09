import React, { Component, useState } from "react";
import { Nav, Sidenav, Icon } from "rsuite";
import { Link } from "react-router-dom";
import placeHolderImage from "../../assets/person.png";
import { useQuery, gql } from "@apollo/client";

const SIDENAV_QUERY = gql `
  {
    student(id: 1) {
     profilePicURL
     names{
       name
     }
  }
  }
`

function SideNav(){
  const {data} = useQuery(SIDENAV_QUERY);
  const [values, setValues] = useState({
    data: data,
    expanded: true,
    activeKey: "1"
  })
  const handleToggle = () => {
    setValues({
      ...values,
      expanded: !values.expanded,
    });
  }

  const handleSelect = (eventKey) => {
    console.log(eventKey);
    setValues({
      ...values,
      activeKey: eventKey,
    });
  }

  return (
    <div>
      {
        data && 
        (
        <div style={{ height: "100%" }}>
          <Sidenav
            appearance="inverse"
            expanded={values.expanded}
            activeKey={values.activeKey}
            onSelect={handleSelect}
            style={{ height: "100%", minHeight: "calc(100vh - 82px)", minWidth: "300px" }}
          >
            <Sidenav.Body>
              <Nav>
                {/* Picture/Student Name/School */}
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Nav.Item style={{ paddingTop: "10px", textAlign: "left" }}>
                    <img
                      src={data.student.profilePicURL}
                      alt="Headshot"
                      width="140"
                      height="140"
                      style={{ borderRadius: "50%", border: "5px solid #78BE20" }}
                    />
                    <p style={{ fontSize: "26px", paddingTop: "10px" }}>{data.student.names[0].name}</p>
                    <p>Student | Missouri S&T</p>
                  </Nav.Item>
                </Link>

                {/* Dashboard Button */}
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Nav.Item eventKey="1" icon={<Icon icon="dashboard" style={{ color: "#78BE20" }} />}>
                    Dashboard
                  </Nav.Item>
                </Link>

                {/* Personal Button */}
                <Link to="/personal/demographics" style={{ textDecoration: "none" }}>
                  <Nav.Item eventKey="2" icon={<Icon icon="user" style={{ color: "#78BE20" }} />}>
                    Personal
                  </Nav.Item>
                </Link>

                {/* Academics Button */}
                <Link to="/academics" style={{ textDecoration: "none" }}>
                  <Nav.Item eventKey="3" icon={<Icon icon="mortar-board" style={{ color: "#78BE20" }} />}>
                    Academics
                  </Nav.Item>
                </Link>

                {/* Finance Button */}
                <Link to="/finance" style={{ textDecoration: "none" }}>
                  <Nav.Item eventKey="4" icon={<Icon icon="money" style={{ color: "#78BE20" }} />}>
                    Finance
                  </Nav.Item>
                </Link>

                {/* Resources Button */}
                <Link to="/resources" style={{ textDecoration: "none" }}>
                  <Nav.Item eventKey="5" icon={<Icon icon="link" style={{ color: "#78BE20" }} />}>
                    Resources
                  </Nav.Item>
                </Link>

                {/* Settings Button */}
                <Link to="/settings" style={{ textDecoration: "none" }}>
                  <Nav.Item eventKey="6" icon={<Icon icon="gear" style={{ color: "#78BE20" }} />}>
                    Settings
                  </Nav.Item>
                </Link>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      )
      }
    </div>
  )
}

export default SideNav;
