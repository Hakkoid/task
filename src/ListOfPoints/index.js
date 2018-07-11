import React, { Component } from 'react';
import './ListOfPoints.css';
import ListOfPoints__Point from './ListOfPoints__Point';
import ListOfPoints__PointContainer from './ListOfPoints__PointContainer';
import checkMod from '../checkMod';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

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
  	var points = this.props.points;

    var optionsCreate = {
      points: points,
      handleDeletePoint: this.handleDeletePoint,
      handleSwapPoint: this.props.mods.withDragAndDrop.onSwapPoint,
      withDeleteButton: checkMod(this.props.mods, "withDeletePoints")
    };

    return (
      <ul className={"ListOfPoints " + (this.props.className ? this.props.className : "")}>
        {createListPoints(optionsCreate)}
      </ul>
    );
  }
}

function createListPoints(props) {

  var points = props.points;
  var handleDeletePoint = props.handleDeletePoint;
  var list = [];
  var handleSwapPoint = props.handleSwapPoint;

  for(let point in points){
    list.push(
      <ListOfPoints__PointContainer key = {points[point].position} position = {points[point].position}>
        <ListOfPoints__Point
          onSwap = {handleSwapPoint}
          onDelete = {handleDeletePoint}
          position = {points[point].position}
          text = {(points[point].text ? points[point].text : "")}
          withDeleteButton = {props.withDeleteButton}
        />
      </ListOfPoints__PointContainer>
    )
  }

  return list;
}

export default DragDropContext(HTML5Backend)(ListOfPoints);

