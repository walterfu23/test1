import React, { Component } from 'react';
import '@progress/kendo-theme-default';
//import '@progress/kendo-theme-bootstrap';
//import '@progress/kendo-theme-material';
import './App.css';
import AppRouter from './nav/AppRouter';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter/>
      </div>
    );
  }
}

export default App;
