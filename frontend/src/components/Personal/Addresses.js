import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import { Panel, Icon, Button, Modal, Form, FormGroup, ControlLabel, FormControl } from "rsuite";

const ADDRESSES_QUERY = gql `
  {
    student(id: 1) {
      addresses {
        type
        address
      }
    } 
  }
`;

function Addresses () {

  const {data} = useQuery(ADDRESSES_QUERY);
  const {values, setValues} = useState({
    data: data,
    formValue: "",
    show: false,
    key: null
  })
  const confirm = () =>{
    const newData = values.data;
    newData[values.key] = values.formValue;
    if (
      values.formValue.type !== "" &&
      values.formValue.address !== "" &&
      values.formValue.city !== "" &&
      values.formValue.state !== "" &&
      values.formValue.zipCode !== "" &&
      values.formValue.county !== ""
    ) {
      setValues({...values, show: false, data: newData });
    }
  }

  const close = () => {
    setValues({...values, show: false });
  }

  const open = (key) => {
    if (key < values.data.length) {
      setValues({...values, show: true, formValue: values.data[key], key: key });
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

    setValues({...values, show: false, data: newData });
  }

  const handleChange = (value) => {
    setValues({...values,
      formValue: value,
    });
  }

  return (
    <div>
      { data && 
    (<Panel bordered shaded className="panel">
        <Modal show={values.show} onHide={close} size="xs">
          <Modal.Header>
            <Modal.Title>{values.key < data.student.addresses.length ? "Edit " : "Add "}Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid onChange={handleChange} formValue={values.formValue}>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl name="type" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl name="address" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl name="city" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <FormControl name="state" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl name="zipCode" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>County</ControlLabel>
                <FormControl name="county" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {values.key !== data.student.addresses.length && (
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
          onClick={() => open(data.student.addresses.length)}
          style={{ display: "block", width: "125px", marginBottom: "5px" }}
        >
          <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
          Add Address
        </Button>
        <div className="header-bar">
          <div style={{ textAlign: "left", marginLeft: "9%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Type</strong>
            </p>
          </div>
          <div style={{ textAlign: "left", marginLeft: "7.8%" }}>
            <p style={{ padding: "5px 0px" }}>
              <strong>Address</strong>
            </p>
          </div>
        </div>
        {data.student.addresses.map((item, key) => (
          <Panel key={key} bordered style={{ marginTop: "10px" }}>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "8%", textAlign: "center" }}>
                <button className="edit-btn" key={key} onClick={() => open(key)}>
                  {item.type !== "Primary" ? <Icon icon="pencil" size="lg" style={{ marginTop: "20px" }} /> : null}
                </button>
              </div>
              <div style={{ width: "10%", marginTop: "20px" }}>
                <strong>{item.type}</strong>
              </div>
              <div>
                <p style={{ marginTop: "20px" }}>
                  <strong>{item.address}</strong>
                </p>
              </div>
            </div>
          </Panel>
        ))}
      </Panel>)
    }
    </div>
  )    
}

export default Addresses;
