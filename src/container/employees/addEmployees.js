/*----- addEmployee.js ---------*/
import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

export default class addEmployees extends Component {
  render() {
    return (
      <div>
        <Button
          className="float-right mb-4"
          color="primary"
          onClick={this.props.toggleNewEmployeeModal}
        >
          Add Employee
        </Button>
        <Modal
          isOpen={this.props.newEmployeeModal}
          toggle={this.props.toggleNewEmployeeModal}
        >
          <ModalHeader toggle={this.props.toggleNewEmployeeModal}>
            Add new Employee
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="passport_number">Passport Number</Label>
              <Input
                id="passport_number"
                name="passport_number"
                value={this.props.newEmployeeData.passport_number}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>  
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={this.props.newEmployeeData.first_name}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={this.props.newEmployeeData.last_name}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={this.props.newEmployeeData.position}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={this.props.newEmployeeData.phone_number}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={this.props.newEmployeeData.address}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="current_company">Current Company</Label>
              <Input
                id="current_company"
                name="current_company"
                value={this.props.newEmployeeData.current_company}
                onChange={this.props.onChangeAddEmployeeHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.addEmployee()}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleNewEmployeeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}