import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './style.css';

class Point extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e){
    this.props.onClose(this.props.id);
  }

  render() {
    return (
      <li className="Point">
        <p className="Point__Text">{this.props.children}</p>
        <button onClick={this.handleClose} className="Point__Close"><span /></button>
      </li>
    );
  }
}

Point.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default Point;