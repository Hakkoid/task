import React, { Component } from 'react';
import './ListOfPoints__Point.css';
import { DragSource  } from 'react-dnd';
import PropTypes from 'prop-types';


const PointSource = {
  beginDrag(props, monitor, component) {
    return props;
  },
  endDrag(props, monitor, component) {
    
    if (!monitor.didDrop()){
      return
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    
    props.onSwap(item.position , dropResult.position);
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
    canDrop: monitor.canDrop
  };
}


class ListOfPoints_Point extends Component {
	constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete(e){
  	this.props.onDelete(e, this.props.position);
  }

  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div className = "ListOfPoints__Point" style = {{lineHeight: 1, opacity: isDragging ? 0.5 : 1}}>
        <p className = "ListOfPoints__Text">{this.props.text}</p>
        {createDeleteButton.bind(this)()}
      </div>
    )
  }
}



function createDeleteButton(){
  if (this.props.withDeleteButton)  {
    return <button onClick = {this.handleClickDelete} className = "ListOfPoints__ButtonDelete">x</button>
  }
}

export default DragSource('ListOfPoints__Point', PointSource, collect)(ListOfPoints_Point);



