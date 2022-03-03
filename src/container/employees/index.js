/*------- index.js ---------*/
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddEmployees from './addEmployees';
import EditEmployee from './editEmployee';

export default class Employee extends Component {
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            newEmployeeData: {
                passport_number: "",
                first_name: "",
                last_name: "",
                position: "",
                phone_number: "",
                address: "",
                current_company: "",
              },
              isLoading: false,
              status: "",
              newEmployeeModal: false,
              editEmployeeData: {
                id: "",
                passport_number: "",
                first_name: "",
                last_name: "",
                position: "",
                phone_number: "",
                address: "",
                current_company: "",
              },
              editEmployeeModal: false,
              noDataFound: "",
        };
    }

    componentDidMount() {
        this.getEmployees();
      }      
    getEmployees() {
    axios.get("http://localhost:8000/api/employees").then((response) => {
        if (response.status === 200) {
        this.setState({
            employees: response.data.data ? response.data.data : [],
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
    toggleNewEmployeeModal = () => {
        this.setState({
          newEmployeeModal: !this.state.newEmployeeModal,
        });
      };
    onChangeAddEmployeeHandler = (e) => {
        let { newEmployeeData } = this.state;
        newEmployeeData[e.target.name] = e.target.value;
        this.setState({ newEmployeeData });
    };
    addEmployee = () => {
        axios
          .post(
            "http://localhost:8000/api/create-employee",
            this.state.newEmployeeData
          )
          .then((response) => {
            const { employees } = this.state;
            const newEmployees = [...employees];
            newEmployees.push(response.data);
            this.setState(
              {
                employees: newEmployees,
                newEmployeeModal: false,
                newEmployeeData: {
                    passport_number: "",
                    first_name: "",
                    last_name: "",
                    position: "",
                    phone_number: "",
                    address: "",
                    current_company: "",
                },
              },
              () => this.getEmployees()
            );
          });
      };
      toggleEditEmployeeModal = () => {
        this.setState({
          editEmployeeModal: !this.state.editEmployeeModal,
        });
      };

      onChangeEditEmployeeHanler = (e) => {
        let { editEmployeeData } = this.state;
        editEmployeeData[e.target.name] = e.target.value;
        this.setState({ editEmployeeData });
      };

      editEmployee = (id, passport_number, first_name, last_name, position, phone_number, address, current_company) => {
        this.setState({
          editEmployeeData: { id, passport_number, first_name, last_name, position, phone_number, address, current_company },
          editEmployeeModal: !this.state.editEmployeeModal,
        });
      };
      
      updateEmployee = () => {
        let {
          id,
          passport_number, 
          first_name, 
          last_name, 
          position, 
          phone_number, 
          address, 
          current_company,
        } = this.state.editEmployeeData;
        this.setState({
          isLoading: true,
        });
        axios
          .post("http://localhost:8000/api/create-employee", {
            passport_number, 
            first_name, 
            last_name, 
            position, 
            phone_number, 
            address, 
            current_company,
            id,
          })
          .then((response) => {
            this.getEmployees();
            this.setState({
              editEmployeeModal: false,
              editEmployeeData: { passport_number, first_name, last_name, position, phone_number, address, current_company },
              isLoading:false,
            });
          })
          .catch((error) => {
            this.setState({isLoading:false})
            console.log(error.response);
          });
      };
    
      deletEmployee = (id) => {
        this.setState({
          isLoading: true,
        });
        axios
          .delete("http://localhost:8000/api/employee/" + id)
          .then((response) => {
            this.setState({
              isLoading: false,
            });
            this.getEmployees();
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
          });
      };
  render() {
    const { newEmployeeData, editEmployeeData, noDataFound, employees} = this.state;
      let employeesDetails = [];
      if (employees.length) {
        employeesDetails = employees.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.passport_number}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.position}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.address}</td>
              <td>{employee.current_company}</td>
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"
                  onClick={() =>
                    this.editEmployee(
                      employee.id,
                      employee.passport_number,
                      employee.first_name,
                      employee.last_name,
                      employee.position,
                      employee.phone_number,
                      employee.address,
                      employee.current_company,
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.deletEmployee(employee.id)}
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
           <h4 className="font-weight-bold">Employees Registration</h4> 
           <AddEmployees
                toggleNewEmployeeModal={this.toggleNewEmployeeModal}
                newEmployeeModal={this.state.newEmployeeModal}
                onChangeAddEmployeeHandler={this.onChangeAddEmployeeHandler}
                addEmployee={this.addEmployee}
                newEmployeeData={newEmployeeData}
           />
           <EditEmployee
                toggleEditEmployeeModal={this.toggleEditEmployeeModal}
                editEmployeeModal={this.state.editEmployeeModal}
                onChangeEditEmployeeHanler={this.onChangeEditEmployeeHanler}
                editEmployee={this.editEmployee}
                editEmployeeData={editEmployeeData}
                updateEmployee={this.updateEmployee}
            />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Passport Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Current Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          {employees.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{employeesDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}