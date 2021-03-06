import React, { Component , Fragment} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Point from '../Point';
import Add from '../Add';
import List from '../List';
import { connect } from "react-redux";
import { addPoint, removePoint, replacePoint } from '../../redux/actions';



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
    this.props.replacePoint({oldIndex, newIndex})
  }

  handleRemove(id){
    this.props.removePoint(id);
  }

  handleAddPoint(name){
    if( name === ""){
      return
    }

    this.props.addPoint({ name, coordinates: this.props.center});
  }

  render() {

    const points = this.props.points.map((point, index)=>{
      return (
        <SortablePoint 
          id={point.id}
          index={index}
          key={point.id}
          onClose={this.handleRemove}
          text={point.name}
          description={point.address}
        />
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
  { addPoint, removePoint, replacePoint }
)(RouteList)