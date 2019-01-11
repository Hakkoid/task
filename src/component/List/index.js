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

//c2f7ee60-233c-488b-ad4d-d1576e874f91

