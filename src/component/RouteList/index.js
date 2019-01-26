import React, { Component , Fragment} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Point from '../Point';
import Add from '../Add';
import List from '../List';
import { connect } from "react-redux";
import { addPoint, removePoint, swapPoint } from '../../redux/actions';



const SortablePoint = SortableElement(Point);

const SortableList = SortableContainer(List);

class RouteList extends Component {
  constructor(props){
    super(props);
    this.handleSortEnd = this.handleSortEnd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);
  }

  handleSortEnd({oldIndex, newIndex}){
    this.props.swapPoint({oldIndex, newIndex})
  }

  handleRemove(id){
    this.props.removePoint(id);
  }

  handleAddPoint(text){
    if( text === ""){
      return
    }

    this.props.addPoint({ text, coordinates: this.props.center});
  }

  render() {

    const points = this.props.points.map((point, index)=>{
      return (
        <SortablePoint id={point.id} index={index} key={point.id} onClose={this.handleRemove}>
          {point.text}
        </SortablePoint>
      )
    })

    return (
      <Fragment>
        <Add onAdd = {this.handleAddPoint} />
        <SortableList distance={1} helperClass="Point_focus" onSortEnd={this.handleSortEnd}>
          {points}
        </SortableList>
      </Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { points, center } = state;
  return { points, center }
}

export default connect(
  mapStateToProps,
  { addPoint, removePoint, swapPoint }
)(RouteList)