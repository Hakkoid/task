import React, { Component } from 'react';
import './ListOfPoints__Point.css';

class ListOfPoints_Point extends Component {
	constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete(e){
  	this.props.onDelete(e, this.props._id);
  }

  render() {
    return (
      <li className={"ListOfPoints__Point" + (this.props.className ? this.props.className : "")}>
        <div style = {{lineHeight: 1}}>
      		<p className = "ListOfPoints__Text">{this.props.text}</p>
          {createDeleteButton.bind(this)()}
        </div>
      </li>
    )
  }
}

function createDeleteButton(){
  if (this.props.withDeleteButton)  {
    return <button onClick = {this.handleClickDelete} className = "ListOfPoints__ButtonDelete">x</button>
  }
}

export default ListOfPoints_Point;