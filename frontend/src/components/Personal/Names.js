import React, { useState } from "react";
import { Panel, Icon, Button, Modal, Form, FormGroup, FormControl, ControlLabel } from "rsuite";
import {useQuery, gql} from '@apollo/client';

const NAMES_QUERY = gql `
  query names_query($id: ID!){
    student(id: $id) {
      names {
        type
        name
      }
    } 
  }
`;
function Names(props) {

  const {data} = useQuery(NAMES_QUERY, {
    variables: {
      id: props.userId
    }
  });
  const [values, setValues] = useState(
    {
      data: data,
      formValue: "",
      show: false,
      key: 0
    }
  );


  const confirm = () => {
    const newData = values.data;
    newData[values.key] = values.formValue;

    if (values.formValue.type !== "" && values.formValue.name !== "") {
      setValues({...values, [values.show]: false, [values.data]: newData});
    }
    close();
  }

  const close = () => {
    setValues({...values, show: false });
  }

  const open = (key) => {
    if (key < values.data.length) {
      setValues({...values, show: true, formValue: values.data[key], key: key})
    } else {
      setValues({...values, show: true, formValue: {}, key: key})
    }
  }

  const remove = (key) => {
    let newData = values.data;
    newData.splice(key, 1);
    setValues({...values, show: false, data: newData });
  }

  const handleChange = (value) =>{
    setValues({...values, formValue: value});
  }

  return (
    <div>
      {data && (<Panel bordered shaded className="panel panel-table">
        <Modal show={values.show} onHide={close} size="xs">
          <Modal.Header>
            <Modal.Title>{values.key < data.student.names.length ? "Edit " : "Add "}Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid onChange={handleChange} formValue={values.formValue}>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl name="type" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {values.key !== data.student.names.length && (
              <Button onClick={remove} appearance="primary" color="red" style={{ float: "left" }}>
                Delete
              </Button>
            )}
            <Button onClick={confirm} appearance="primary">
              Confirm
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          appearance="primary"
          onClick={() => open(data.student.names.length)}
          style={{ display: "block", width: "110px", marginBottom: "5px" }}
        >
          <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
          Add Name
        </Button>

        <div className="header-bar">
          <div style={{ width: "8.8%" }}></div>
          <div style={{ width: "10%", minWidth: "90px", textAlign: "left" }}>
            <p className="header-bar-text">Type</p>
          </div>
          <div style={{ textAlign: "left" }}>
            <p className="header-bar-text">Name</p>
          </div>
        </div>

        <div className="table-container">
          {data.student.names.map((item, key) => (
            <Panel key={key} bordered style={{ marginTop: "10px", marginRight: "10px" }}>
              <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "8%", textAlign: "center" }}>
                  <button className="edit-btn" key={key} onClick={() => open(key)}>
                    {item.type !== "Primary" ? <Icon icon="pencil" size="lg" /> : null}
                  </button>
                </div>
                <div style={{ width: "10%" }}>
                  <strong>{item.type}</strong>
                </div>
                <div>
                  <strong>{item.name}</strong>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </Panel>)}
    </div>
      
    );
}
export default Names;
