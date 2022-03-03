import React, { Component } from 'react';
import './App.css';
import Company from './container/companies'
import Employee from './container/employees'

class App extends Component {
  render(){
    return (
      <div className="App">
        <Company/>
        <Employee/>
      </div>
    );
  }
}


export default App;
