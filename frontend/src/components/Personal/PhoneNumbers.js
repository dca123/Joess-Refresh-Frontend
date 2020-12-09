import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import {
  Panel,
  Icon,
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  CheckboxGroup,
} from "rsuite";

const PHONENUMBERS_QUERY= gql `
  query phonenumbers_query($id: ID!){
    student(id: $id) {
      phonenumbers {
        type
        number
        ext
        country
        preferred
      }
    } 
  }
`;
function PhoneNumbers(props){

  const {data} = useQuery(PHONENUMBERS_QUERY, {
    variables: {
      id: props.userId
    }
  });
  const [values, setValues] = useState({
    data: data,
    show: false
  })

  const confirm = () => {
    const newData = values.data;
    newData[values.key] = values.formValue;

    if (values.formValue.type !== "" && values.formValue.name !== "") {
      setValues({...values,  show: false, data: newData });
    }
  }

  const close = () => {
    setValues({...values,  show: false });
  }

  const open = (key) => {
    if (key < values.data.length) {
      setValues({...values,  show: true, formValue: values.data[key], key: key });
    } else {
      setValues({...values, 
        show: true,
        formValue: {},
        key: key,
      });
    }
  }

  const remove = () => {
    let newData = values.data;
    newData.splice(values.key, 1);

    setValues({...values,  show: false, data: newData });
  }

  const handleChange = (value) => {
    setValues({...values, 
      formValue: value,
    });
  }

  return (
    <div>
      {data && (
      <Panel bordered shaded className="panel">
        <Modal show={values.show} onHide={close} size="xs">
          <Modal.Header>
            <Modal.Title>{values.key < data.student.phonenumbers.length ? "Edit " : "Add "}Phone Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid onChange={handleChange} formValue={values.formValue}>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl name="type" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Number</ControlLabel>
                <FormControl name="number" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Extension</ControlLabel>
                <FormControl name="extension" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Country Code</ControlLabel>
                <FormControl name="country" />
              </FormGroup>
              <FormControl name="checkbox" accepter={CheckboxGroup}>
                <Checkbox value="preferred">Preferred?</Checkbox>
              </FormControl>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {values.key !== data.student.phonenumbers.length && (
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
          onClick={() => open(data.student.phonenumbers.length)}
          style={{ display: "block", width: "130px", marginBottom: "5px" }}
        >
          <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
          Add Number
        </Button>
        <div className="header-bar">
          <div style={{ textAlign: "left", marginLeft: "9%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Type</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "7.8%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Number</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "7.4%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Ext</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "5.5%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Country</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "6.5%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Preferred</strong>
            </p>
          </div>
        </div>
        {data.student.phonenumbers.map((item, key) => (
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
              <div style={{ width: "11%", marginTop: "5px" }}>
                <strong>{item.number}</strong>
              </div>
              <div style={{ width: "7%", marginTop: "5px" }}>
                <strong>{item.extension}</strong>
              </div>
              <div style={{ width: "10%", marginTop: "5px" }}>
                <strong>{item.country}</strong>
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
export default PhoneNumbers;
