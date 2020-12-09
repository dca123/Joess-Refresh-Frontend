import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import {
  Panel,
  Icon,
  Button,
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  CheckboxGroup,
} from "rsuite";


const EMAILS_QUERY = gql `
  query emails_query($id: ID!){
      student(id: $id) {
        emails{
          type
          address
          preferred
        }
    }
  }
`


function Emails(props) {
  const {data} = useQuery(EMAILS_QUERY, {
    variables: {
      id: props.userId
    }
  });
  const [values, setValues] = useState({
    data: data,
    show: false,
    key: 0,
    formValue: ""
  })
  const confirm = () => {
    const newData = values.data;
    newData[values.key] = values.formValue;

    if (values.formValue.type !== "" && values.formValue.name !== "") {
      setValues({...values, show: false, data: newData });
    }
  }

  const close = () => {
    setValues({...values, show: false });
  }

  const open = (key) => {
    if (key < values.data.length) {
      setValues({...values, show: true, formValue: values.data[key], key: key});
    } else {
      setValues({...values, show: true, formValue: {}, key: key });
    }
  }

  const remove = () => {
    let newData = values.data;
    newData.splice(values.key, 1);

    setValues({...values, show: false, data: newData });
  }

  const handleChange = (value) => {
    console.log(value);

    setValues({...values,
      formValue: value,
    });
  }

  return(
    <div>
      {data && (
      <Panel bordered shaded className="panel">
        <Modal show={values.show} onHide={close} size="xs">
          <Modal.Header>
            <Modal.Title>{values.key < data.student.emails.length ? "Edit " : "Add "}Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid onChange={handleChange} formValue={values.formValue}>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl name="type" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl name="email" />
              </FormGroup>
              <FormControl name="checkbox" accepter={CheckboxGroup}>
                <Checkbox value="preferred">Preferred?</Checkbox>
              </FormControl>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {values.key !== data.student.emails.length && (
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
          onClick={() => open(data.student.emails.length)}
          style={{ display: "block", width: "110px", marginBottom: "5px" }}
        >
          <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
          Add Email
        </Button>

        <div className="header-bar">
          <div style={{ textAlign: "left", marginLeft: "9%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Type</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "7.8%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Email Address</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "13%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Preferred</strong>
            </p>
          </div>
        </div>
        {data.student.emails.map((item, key) => (
          <Panel key={key} bordered style={{ marginTop: "10px" }}>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "8%", textAlign: "center", marginTop: "5px" }}>
                <button className="edit-btn" key={key} onClick={() => open(key)}>
                  {item.type !== "Primary" ? <Icon icon="pencil" size="lg" /> : null}
                </button>
              </div>
              <div style={{ width: "10%", marginTop: "5px" }}>
                <strong>{item.type}</strong>
              </div>
              <div style={{ width: "20%", marginTop: "5px" }}>
                <strong>{item.address}</strong>
              </div>
              <div style={{ marginTop: "5px" }}>
                <Icon
                  icon="check-circle"
                  size="2x"
                  style={{ padding: "0px", margin: "0px", color: item.preferred ? "#78BE20" : "#DCE3E4" }}
                />
              </div>
            </div>
          </Panel>
        ))}
      </Panel>
    )}
    </div>
  )
}
export default Emails;
