import { useQuery, gql } from "@apollo/client";
import React, { Component } from "react";
import { Icon, Progress, Panel } from "rsuite";

const ACADEMIC_PROGRESS_QUERY = gql `
  {
    student(id: 1){
      creditsCompleted
    }
  }
`
function AcademicProgress(){
  const {data} = useQuery(ACADEMIC_PROGRESS_QUERY);
  return (
    <div>
      {
        data && 
        (
          <Panel shaded bordered className="panel">
            <div style={{ height: "210px" }}>
              <div style={{ paddingBottom: "15px" }}>
                <Icon style={{ float: "left", paddingRight: "15px" }} icon="mortar-board" size="4x" />
                <h3>Academic Progress</h3>
                <p className="no-padding">Degree Audit Overview</p>
              </div>

              <div style={{ width: "400px", margin: "0 auto" }}>
                <div style={{ float: "left", paddingRight: "20px" }}>
                  <Progress.Circle
                    percent={Math.round((data.student.creditsCompleted / 128) * 100 * 10) / 10}
                    style={{ width: "120px" }}
                    strokeColor="#78BE20"
                  />
                </div>

                <div style={{ padding: "25px" }}>
                  <p style={{ fontSize: "18px" }}>
                    <strong>CS Major</strong>
                  </p>
                  <h5 style={{ color: "#78BE20" }}>{data.student.creditsCompleted} Satisfied</h5>
                  <p>of 128 Credit Hours</p>
                </div>
              </div>
            </div>
          </Panel>
        )
      }
    </div>
  )
}

export default AcademicProgress;
