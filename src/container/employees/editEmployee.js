/* ------- editEmployee.js ----------- */

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

export default class editEmployee extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.editEmployeeModal}
          toggle={this.props.toggleEditEmployeeModal}
        >
          <ModalHeader toggle={this.props.toggleEditEmployeeModal}>
            Update Employee
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="passport_number">Passport Number</Label>
              <Input
                id="passport_number"
                name="passport_number"
                value={this.props.editEmployeeData.passport_number}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>  
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={this.props.editEmployeeData.first_name}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={this.props.editEmployeeData.last_name}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={this.props.editEmployeeData.position}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={this.props.editEmployeeData.phone_number}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={this.props.editEmployeeData.address}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="current_company">Current Company</Label>
              <Input
                id="current_company"
                name="current_company"
                value={this.props.editEmployeeData.current_company}
                onChange={this.props.onChangeEditEmployeeHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.updateEmployee}
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditEmployeeModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}