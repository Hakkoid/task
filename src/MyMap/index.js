import React, { Component } from 'react';
import './MyMap.css';
import YMap from '../YMap';
import ListOfPoints from '../ListOfPoints';
import MyInput from "../MyInput";


class MyMap extends Component {
	 constructor(props) {
    super(props);
    this.state = {
      points: []
    }
    this.handleDeletePoint = this.handleDeletePoint.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);
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

  handleAddPoint(value){

    for(var point in this.state.points){
      console.log(this.state.points[point])
      if( this.state.points[point].key === value){
        alert("Точка с таким именем уже есть")
        return
      }
    }

    var points = this.state.points.concat([{key: value, text: value}]);

    this.setState({points: points})
  }


  render() {
    return (
      <div className={"MyMap" + (this.props.className ? this.props.className : "")}>
        <MyInput 
          mods = { { clearInputByEvent: true , noReturnEmpty: true} } 
          onClick = {this.handleAddPoint} 
          onEnter = {this.handleAddPoint}
          textButton = "Add"
        />
      	<ListOfPoints 
          points = {this.state.points} 
          mods = { { withDeletePoints: {onDeletePoint: this.handleDeletePoint} } }
        />
        <YMap/>
      </div>
    );
  }
}

export default MyMap;
