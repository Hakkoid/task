import React, { Component } from 'react';
import './ListOfPoints_Point.css';

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
      <li className={"ListOfPoints_Point" + (this.props.className ? this.props.className : "")}>
      	<div>
      		<p>{this.props.text}</p>
      		<button onClick = {this.handleClickDelete}/>
      	</div>
      </li>
    )
  }
}

export default ListOfPoints_Point;