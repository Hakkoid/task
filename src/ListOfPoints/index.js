import React, { Component } from 'react';
import './ListOfPoints.css';
import ListOfPoints_Point from './ListOfPoints_Point';

class ListOfPoints extends Component {
	constructor(props) {
    super(props);
    this.handleDeletePoint = this.handleDeletePoint.bind(this)
    setMods.bind(this)();
  }

  handleDeletePoint(e, key){
  	if(typeof this.props.onDeletePoint == "function"){
  		this.props.onDeletePoint(key)
  	}
    deletePoint_innerState.bind(this)(key)
  }

  render() {
  	for(let point in this.props.points){
  		if (!this.props.points[point].key){ return <p>Error: property 'key' is not defined</p>}
  	}

  	var points = this.state && this.state.points || this.props.points;

    return (
      <ul className={"ListOfPoints" + (this.props.className ? this.props.className : "")}>
        {createListPoints({points: points, handleDeletePoint: this.handleDeletePoint})}
      </ul>
    );
  }
}

function createListPoints(props) {

	var points = props.points;
	var handleDeletePoint = props.handleDeletePoint;
	var list = [];

	for(let point in points){
		list.push(<ListOfPoints_Point
			onDelete = {handleDeletePoint}
			key = {points[point].key}
			_id = {points[point].key}
			text = {(points[point].text ? points[point].text : "")}/>)
	}

	return list;
}

function setMods(){
  if(typeof this.props.mods == "object"){
    
    if(this.props.mods.innerState === true){
      this.state = {points: this.props.points}
    }
  }
}

function deletePoint_innerState(key){
  if (typeof this.props.mods == "object" || this.props.mods.innerState === true){
    let points = this.state.points.concat();

    for (var point in points){
      if(points[point].key === key){
        points.splice(+point, 1)
      }
    }

    this.setState({points: points})
  }
}


export default ListOfPoints;
