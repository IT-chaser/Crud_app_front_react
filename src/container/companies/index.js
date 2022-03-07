/*------- index.js ---------*/
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddCompanies from './addCompanies';
import EditCompany from './editCompany';

export default class Company extends Component {
    constructor(props){
        super(props);
        this.state = {
            companies: [],
            newCompanyData: {
                company_name: "",
                ceo_name: "",
                address: "",
                email: "",
                website: "",
                phone_number: "",
              },
              isLoading: false,
              status: "",
              newCompanyModal: false,
              editCompanyData: {
                id: "",
                company_name: "",
                ceo_name: "",
                address: "",
                email: "",
                website: "",
                phone_number: "",
              },
              editCompanyModal: false,
              noDataFound: "",
        };
    }

    componentDidMount() {
        this.getCompanies();
      }      
    getCompanies() {
    axios.get("http://localhost:8000/api/companies").then((response) => {
        if (response.status === 200) {
        this.setState({
            companies: response.data.data ? response.data.data : [],
        });
        }
        if (
        response.data.status === "failed" &&
        response.data.success === false
        ) {
        this.setState({
            noDataFound: response.data.message,
        });
        }
    });
    }   
    toggleNewCompanyModal = () => {
        this.setState({
          newCompanyModal: !this.state.newCompanyModal,
        });
      };
    onChangeAddCompanyHandler = (e) => {
        let { newCompanyData } = this.state;
        newCompanyData[e.target.name] = e.target.value;
        this.setState({ newCompanyData });
    };
    addCompany = () => {
        axios
          .post(
            "http://localhost:8000/api/create-company",
            this.state.newCompanyData
          )
          .then((response) => {
            const { companies } = this.state;
            const newCompanies = [...companies];
            newCompanies.push(response.data);
            this.setState(
              {
                companies: newCompanies,
                newCompanyModal: false,
                newCompanyData: {
                  company_name: "",
                  ceo_name: "",
                  address: "",
                  email: "",
                  website: "",
                  phone_number: "",
                },
              },
              () => this.getCompanies()
            );
          });
      };
      toggleEditCompanyModal = () => {
        this.setState({
          editCompanyModal: !this.state.editCompanyModal,
        });
      };

      onChangeEditCompanyHandler = (e) => {
        let { editCompanyData } = this.state;
        editCompanyData[e.target.name] = e.target.value;
        this.setState({ editCompanyData });
      };

      editCompany = (id, company_name, ceo_name, address, email, website, phone_number) => {
        this.setState({
          editCompanyData: { id, company_name, ceo_name, address, email, website, phone_number },
          editCompanyModal: !this.state.editCompanyModal,
        });
      };
      
      updateCompany = () => {
        let {
          id,
          company_name, 
          ceo_name, 
          address, 
          email, 
          website, 
          phone_number,
        } = this.state.editCompanyData;
        this.setState({
          isLoading: true,
        });
        axios
          .post("http://localhost:8000/api/create-company", {
            company_name, 
            ceo_name, 
            address, 
            email, 
            website, 
            phone_number,
            id,
          })
          .then((response) => {
            this.getCompanies();
            this.setState({
              editCompanyModal: false,
              editCompanyData: { company_name, ceo_name, address, email, website, phone_number },
              isLoading:false,
            });
          })
          .catch((error) => {
            this.setState({isLoading:false})
            console.log(error.response);
          });
      };
    
      deletCompany = (id) => {
        this.setState({
          isLoading: true,
        });
        axios
          .delete("http://localhost:8000/api/company/" + id)
          .then((response) => {
            this.setState({
              isLoading: false,
            });
            this.getCompanies();
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
          });
      };
  render() {
    const { newCompanyData, editCompanyData, noDataFound, companies} = this.state;
      let companiesDetails = [];
      if (companies.length) {
        companiesDetails = companies.map((company) => {
          return (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.company_name}</td>
              <td>{company.ceo_name}</td>
              <td>{company.address}</td>
              <td>{company.email}</td>
              <td>{company.website}</td>
              <td>{company.phone_number}</td>
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"
                  onClick={() =>
                    this.editCompany(
                      company.id,
                      company.company_name,
                      company.ceo_name,
                      company.address,
                      company.email,
                      company.website,
                      company.phone_number,
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.deletCompany(company.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        });
      }
   
    return (
      <div className="App container mt-4">
           <h4 className="font-weight-bold">Companies Registration</h4> 
           <AddCompanies
                toggleNewCompanyModal={this.toggleNewCompanyModal}
                newCompanyModal={this.state.newCompanyModal}
                onChangeAddCompanyHandler={this.onChangeAddCompanyHandler}
                addCompany={this.addCompany}
                newCompanyData={newCompanyData}
           />
           <EditCompany
            toggleEditCompanyModal={this.toggleEditCompanyModal}
            editCompanyModal={this.state.editCompanyModal}
            onChangeEditCompanyHandler={this.onChangeEditCompanyHandler}
            editCompany={this.editCompany}
            editCompanyData={editCompanyData}
            updateCompany={this.updateCompany}
            />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>CEO Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Website</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          {companies.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{companiesDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}