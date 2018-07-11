import React, { Component } from 'react';
import './ListOfPoints__PointContainer.css';
import { DropTarget } from 'react-dnd';

const ContainerTarget = {
  drop(props) {
    return props;
  },
  canDrop(props, monitor) {
    return true
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


class ListOfPoints__PointContainer extends Component {
	 constructor(props) {
    super(props);
  }
  render() {
    const { connectDropTarget} = this.props;

    return connectDropTarget(
      <li 
        className={"ListOfPoints__PointContainer" + (this.props.className ? this.props.className : "")} 
      >
      	{this.props.children}
      </li>
    )
  }
}

export default DropTarget('ListOfPoints__Point', ContainerTarget, collect)(ListOfPoints__PointContainer);
