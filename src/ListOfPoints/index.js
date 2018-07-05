import React, { Component } from 'react';
import './ListOfPoints.css';
import ListOfPoints__Point from './ListOfPoints__Point';
import checkMod from '../checkMod'

class ListOfPoints extends Component {
	constructor(props) {
    super(props);
    this.handleDeletePoint = this.handleDeletePoint.bind(this);
  }

  handleDeletePoint(e, key){
  	if(checkMod(this.props.mods, "withDeletePoints") && typeof this.props.mods.withDeletePoints.onDeletePoint === "function"){
  		this.props.mods.withDeletePoints.onDeletePoint(key)
  	}
  }

  render() {
  	for(let point in this.props.points){
  		if (!this.props.points[point].key){ return <p>Error: property 'key' is not defined</p>}
  	}

  	var points = this.props.points;

    var optionsCreate = {
      points: points,
      handleDeletePoint: this.handleDeletePoint,
      withDeleteButton: checkMod(this.props.mods, "withDeletePoints")
    };

    return (
      <ul className={"ListOfPoints" + (this.props.className ? this.props.className : "")}>
        {createListPoints(optionsCreate)}
      </ul>
    );
  }
}

function createListPoints(props) {

	var points = props.points;
	var handleDeletePoint = props.handleDeletePoint;
	var list = [];

	for(let point in points){
		list.push(<ListOfPoints__Point
			onDelete = {handleDeletePoint}
			key = {points[point].key}
			_id = {points[point].key}
			text = {(points[point].text ? points[point].text : "")}
      withDeleteButton = {props.withDeleteButton}
    />)
	}

	return list;
}



export default ListOfPoints;
