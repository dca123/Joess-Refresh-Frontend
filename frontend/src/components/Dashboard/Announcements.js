import { useQuery, gql } from "@apollo/client";
import React, { Component } from "react";
import { Icon, Panel } from "rsuite";


const ANNOUNCEMENTS_QUERY = gql `
  {
    announcements{
      title
      detail
      imageUrl
    }
  }
`
function Announcements() {
  const {data} = useQuery(ANNOUNCEMENTS_QUERY);

  return (
    <div>
      {data && 
        (
        <Panel shaded bordered className="panel">
          <div>
            <div style={{ paddingBottom: "15px" }}>
              <Icon style={{ float: "left", paddingRight: "15px" }} icon="bullhorn" size="4x" />
              <h3>Announcements</h3>
              <p className="no-padding">{data.announcements.length} Items</p>
            </div>

            <div style={{ height: "360px", width: "100%", overflow: "auto" }}>
              {data.announcements.map((item, key) => (
                <div key={key}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <div style={{ float: "left" }}>
                      <img
                        width="160"
                        height="100"
                        alt=""
                        style={{
                          borderRadius: "10px",
                          border: "2px solid #BEBEBE",
                          margin: "0px 12px 24px 12px",
                        }}
                        src={item.imageUrl}
                      />
                    </div>

                    <div style={{ paddingRight: "15px" }}>
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                      <br />
                      <br />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        )
      }
    </div>
  );
}
export default Announcements;
