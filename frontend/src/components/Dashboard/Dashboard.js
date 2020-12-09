import React, { Component } from "react";

import AcademicProgress from "./AcademicProgress";
import ActionItems from "./ActionItems";
import Announcements from "./Announcements";
import CourseSchedule from "./CourseSchedule";

class Home extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ float: "left", width: "50%", minWidth: "600px", overflow: "auto" }}>
          <Announcements />
          <ActionItems userId={this.props.userId}/>
        </div>
        <div style={{ float: "left", width: "50%", minWidth: "600px" }}>
          <AcademicProgress userId={this.props.userId}/>
          <CourseSchedule height="438px" userId={this.props.userId}/>
        </div>
      </div>
    );
  }
}

export default Home;
