import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import ListOfPoints from './ListOfPoints';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [{text: "efef", key: 1}, {text: "fewfw", key: 2}, {text: "dwd", key: 5}, {text: "dwd", key: 6}]
    }
    this.handleDeletePoint = this.handleDeletePoint.bind(this);
  }

  handleDeletePoint(key){

    var points = this.state.points.concat();

    for(let point in points){
      if (points[point].key === key) {
        points.splice(+point, 1)
      }      
    }

    this.setState({points: points})
  }

  render() {

    var modsForList = {innerState: true};

    return (
      <div className="App">
        <ListOfPoints mods = {modsForList} points = {this.state.points} onDeletePoint = {this.handleDeletePoint}/>
        <Map/>
      </div>
    );
  }
}

export default App;
