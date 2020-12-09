import React from "react";
import { Panel, Icon } from "rsuite";
import {useQuery, gql} from '@apollo/client';

const DEMOGRAPHICS_QUERY = gql `
  query demographics_query($id: ID!){
    student(id: $id) {
      studentID
      gender
      dob
      birthCountry
      birthState
      maritialStatus
      militaryStatus
      citizenshipStatus
      citizenshipCountry
      visaType
      visaPermit
      visaCountry
    }
  }
`;

function Demographics(props) {
  console.log(props.userId);
  const {data} = useQuery(DEMOGRAPHICS_QUERY, {
    variables: {
      id: props.userId
    }
  });
  return (
    <div>
      {data && (<div style={{ width: "100%" }}>
      <div style={{ width: "400px", float: "left" }}>
        <Panel shaded bordered className="panel">
          <h4 style={{ paddingBottom: "10px" }}>General</h4>
          <div style={{ width: "100%" }}>
            <div style={{ width: "50%", float: "left" }}>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Student ID</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Gender</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Date of Birth</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Birth Country</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Birth State</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Marital Status</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Military Status</strong>
              </p>
            </div>
            <div style={{ width: "50%", float: "left" }}>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.studentID}
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.gender}
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.dob}
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.birthCountry}
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.birthState}
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.maritialStatus}
              </p>
              <p className="no-padding" style={{ paddingBottom: "25px" }}>
                {data.student.militaryStatus}
              </p>
            </div>
          </div>

          <Panel bordered>
            <Icon icon="exclamation-triangle" style={{ color: "#E87722", paddingRight: "5px" }} />
            Contact the registrar’s office to change the above info.
          </Panel>
        </Panel>
      </div>
      <div style={{ width: "400px", float: "left" }}>
        <Panel shaded bordered className="panel">
          <h4 style={{ paddingBottom: "10px" }}>Citizenship</h4>
          <div style={{ width: "100%" }}>
            <div style={{ width: "50%", float: "left" }}>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Status</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Country</strong>
              </p>
            </div>
            <div style={{ width: "50%", float: "left" }}>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.citizenshipStatus}
              </p>
              <p className="no-padding" style={{ paddingBottom: "11px" }}>
                {data.student.citizenshipCountry}
              </p>
            </div>
          </div>

          <h4 style={{ paddingBottom: "10px" }}>Visa/Permit</h4>
          <div style={{ width: "100%" }}>
            <div style={{ width: "50%", float: "left" }}>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Type</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Visa/Permit</strong>
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                <strong>Country</strong>
              </p>
            </div>
            <div style={{ width: "50%", float: "left" }}>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.visaType}
              </p>
              <p className="no-padding" style={{ paddingBottom: "5px" }}>
                {data.student.visaPermit}
              </p>
              <p className="no-padding" style={{ paddingBottom: "25px" }}>
                {data.student.visaCountry}
              </p>
            </div>
          </div>

          <Panel bordered>
            <Icon icon="exclamation-triangle" style={{ color: "#E87722", paddingRight: "5px" }} />
            Contact the registrar’s office to change the above info.
          </Panel>
        </Panel>
      </div>
    </div>)}
    </div>
    
  );
}

export default Demographics;
