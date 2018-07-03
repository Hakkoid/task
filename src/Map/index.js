import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
  render() {
    return (
      <div className={"Map" + (this.props.className ? this.props.className : "")}>
      </div>
    );
  }
}

export default Map;
