import React, { Component } from 'react';
import './style.css';

class List extends Component {
  render() {
    return (
      <ul className="List">
        {this.props.children}
      </ul>
    );
  }
}

export default List;