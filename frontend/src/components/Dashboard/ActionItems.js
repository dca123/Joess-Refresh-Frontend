import { useQuery, gql } from "@apollo/client";
import React, { Component } from "react";
import { Icon, Panel } from "rsuite";

const ACTION_ITEMS_QUERY = gql `
  query action_items_query($id: ID!){
    student(id: $id){
      actionItems{
        title
        detail
        completed
      }
    }
  }
`

function ActionItems(props){
  const {data} = useQuery(ACTION_ITEMS_QUERY, {
    variables: {
      id: props.userId
    }
  });
  return (
    <div>
      {
        data && 
        (<Panel shaded bordered className="panel">
        <div>
          <div style={{ paddingBottom: "15px" }}>
            <Icon style={{ float: "left", paddingRight: "15px" }} icon="clock-o" size="4x" />
            <h3>Action Items</h3>
            <p className="no-padding">{data.student.actionItems.length} Items</p>
          </div>

          <div style={{ height: "212px", width: "100%", overflow: "auto" }}>
            {data.student.actionItems.map((item, key) => (
              <Panel key={key} bordered className="item">
                <div>
                  <div style={{ width: "80%", display: "inline-block" }}>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                  <div style={{ width: "20%", float: "right", textAlign: "right" }}>
                    <Icon
                      icon="check-circle"
                      size="3x"
                      style={{ color: item.completed ? "#78BE20" : "#DCE3E4", padding: "5px 15px" }}
                    />
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </Panel>)
      }
    </div>
  )
}
export default ActionItems;
