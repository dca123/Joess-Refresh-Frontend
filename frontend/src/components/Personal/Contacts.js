import React, {useState} from "react";
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
import {useQuery, gql} from '@apollo/client';

const CONTACTS_QUERY = gql `
  {
    student(id: 1) {
      contacts{
        primary
        name
        relationship
        number
        ext
        country
      }
    }
  }
`;

function Contacts(){
  const {data} = useQuery(CONTACTS_QUERY);
  const [values, setValues] = useState({
    data: data,
    key: null,
    formValue: "",
    show: false
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
      setValues({...values, show: true, formValue: values.data[key], key: key });
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
    setValues({...values,
      formValue: value,
    });
  }

  return (
    <div>
      {
        data && 
        (
        <Panel bordered shaded className="panel">
          <Modal show={values.show} onHide={close} size="xs">
            <Modal.Header>
              <Modal.Title>{values.key < data.student.contacts.length ? "Edit " : "Add "}Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form fluid onChange={handleChange} formValue={values.formValue}>
                <FormGroup>
                  <ControlLabel>Contact Name</ControlLabel>
                  <FormControl name="name" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Relationship</ControlLabel>
                  <FormControl name="relationship" />
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
                  <Checkbox value="primary">Primary</Checkbox>
                </FormControl>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {values.key !== data.student.contacts.length && (
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
            onClick={() => open(data.student.contacts.length)}
            style={{ display: "block", width: "120px", marginBottom: "5px" }}
          >
            <Icon icon="plus" style={{ color: "#78BE20", paddingRight: "5px" }} />
            Add Contact
          </Button>
          <div className="header-bar">
            <div style={{ textAlign: "left", marginLeft: "9%" }}>
              <p style={{ padding: "5px 0px" }}>
                <strong>Primary</strong>
              </p>
            </div>
            <div style={{ textAlign: "left", marginLeft: "4.7%" }}>
              <p style={{ padding: "5px 0px" }}>
                <strong>Contact Name</strong>
              </p>
            </div>
            <div style={{ textAlign: "left", marginLeft: "8.8%" }}>
              <p style={{ padding: "5px 0px" }}>
                <strong>Relationship</strong>
              </p>
            </div>
            <div style={{ textAlign: "left", marginLeft: "5%" }}>
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
          </div>
          {data.student.contacts.map((item, key) => (
            <Panel key={key} bordered style={{ marginTop: "10px" }}>
              <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "8%", textAlign: "center", marginTop: "8px" }}>
                  <button className="edit-btn" key={key} onClick={() => open(key)}>
                    {!item.primary ? <Icon icon="pencil" size="lg" /> : null}
                  </button>
                </div>
                <div style={{ width: "8%", marginTop: "5px" }}>
                  <Icon
                    icon="check-circle"
                    size="2x"
                    style={{ padding: "0px", margin: "0px", color: item.primary ? "#78BE20" : "#DCE3E4" }}
                  />
                </div>
                <div style={{ width: "15%", marginTop: "5px" }}>
                  <strong>{item.name}</strong>
                </div>
                <div style={{ width: "10%", marginTop: "5px" }}>
                  <strong>{item.relationship}</strong>
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
              </div>
            </Panel>
          ))}
        </Panel>
      )
      }
    </div>
  )}

  export default Contacts;
