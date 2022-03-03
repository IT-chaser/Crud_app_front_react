/*----- addCompany.js ---------*/
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

export default class addCompanies extends Component {
  render() {
    return (
      <div>
        <Button
          className="float-right mb-4"
          color="primary"
          onClick={this.props.toggleNewCompanyModal}
        >
          Add Company
        </Button>
        <Modal
          isOpen={this.props.newCompanyModal}
          toggle={this.props.toggleNewCompanyModal}
        >
          <ModalHeader toggle={this.props.toggleNewCompanyModal}>
            Add new Company
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                value={this.props.newCompanyData.company_name}
                onChange={this.props.onChangeAddCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ceo_name">CEO Name</Label>
              <Input
                id="ceo_name"
                name="ceo_name"
                value={this.props.newCompanyData.ceo_name}
                onChange={this.props.onChangeAddCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={this.props.newCompanyData.address}
                onChange={this.props.onChangeAddCompanyHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={this.props.newCompanyData.email}
                onChange={this.props.onChangeAddCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={this.props.newCompanyData.website}
                onChange={this.props.onChangeAddCompanyHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={this.props.newCompanyData.phone_number}
                onChange={this.props.onChangeAddCompanyHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.addCompany()}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleNewCompanyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}