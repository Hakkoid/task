import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap';
import ListOfPoints from './ListOfPoints';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "App">
        <MyMap className = "MapPosition"/>
      </div>
    );
  }
}

export default App;
