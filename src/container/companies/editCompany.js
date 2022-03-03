/* ------- editCompany.js ----------- */

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

export default class editCompany extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.editCompanyModal}
          toggle={this.props.toggleEditCompanyModal}
        >
          <ModalHeader toggle={this.props.toggleEditCompanyModal}>
            Update Company
          </ModalHeader>
          <ModalBody>
          <FormGroup>
              <Label for="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                value={this.props.editCompanyData.company_name}
                onChange={this.props.onChangeEditCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ceo_name">CEO Name</Label>
              <Input
                id="ceo_name"
                name="ceo_name"
                value={this.props.editCompanyData.ceo_name}
                onChange={this.props.onChangeEditCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={this.props.editCompanyData.address}
                onChange={this.props.onChangeEditCompanyHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={this.props.editCompanyData.email}
                onChange={this.props.onChangeEditCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={this.props.editCompanyData.website}
                onChange={this.props.onChangeEditCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={this.props.editCompanyData.phone_nnumber}
                onChange={this.props.onChangeEditCompanyHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.updateCompany}
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditCompanyModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}