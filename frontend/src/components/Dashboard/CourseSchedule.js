import { useQuery,gql } from "@apollo/client";
import React, { Component } from "react";
import { Icon, Panel, Button } from "rsuite";

const COURSE_SCHEDULE_QUERY = gql `
  {
    student(id: 1){
      classes{
        name
        code
        title
        days
        time
        location
      }
    }
  }
`

function CourseSchedule(props) {
  const {data} = useQuery(COURSE_SCHEDULE_QUERY);
  return(
    <div>
      {
        data &&
        (
          <Panel shaded bordered className="panel">
          <div>
            <div style={{ width: "70%", float: "left" }}>
              <Icon style={{ float: "left", paddingRight: "15px" }} icon="calendar" size="4x" />
              <h3>Course Schedule</h3>
              <p className="no-padding">Fall 2020</p>
            </div>
            <div>
              <Button
                appearance="primary"
                style={{ display: "block", width: "20%", minWidth: "120px", marginBottom: "5px", maxWidth: "120px" }}
                href="#"
              >
                <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
                Add to gCal
              </Button>
              <Button
                appearance="primary"
                style={{ display: "block", width: "20%", minWidth: "120px", maxWidth: "120px" }}
                href="#"
              >
                <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
                Add to iCal
              </Button>
            </div>
          </div>

          <div style={{ height: props.height, width: "100%", overflow: "auto" }}>
            {data.student.classes.map((item, key) => (
              <Panel key={key} bordered className="class">
                <div style={{ width: "100%" }}>
                  <div style={{ width: "50%", float: "left" }}>
                    <h5>{item.name}</h5>
                    <p className="no-padding">({item.code})</p>
                    <p className="no-padding">{item.title}</p>
                  </div>
                  <div>
                    <p className="no-padding">{item.days}</p>
                    <p className="no-padding">{item.time}</p>
                    <p className="no-padding">{item.location}</p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
          </Panel>
        )
      }
    </div>
  )
}

export default CourseSchedule;
