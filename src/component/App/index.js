import React, { Component } from 'react';
import './style.css';
import RouteList from '../RouteList';
import RouteMap from '../RouteMap';


class App extends Component {
  render() {
    return (    
      <div className="App">
      	<div className = "left">
      		<RouteList />
      	</div>
      	<div className = "right">
      		<RouteMap />
      	</div>
      </div>
    );
  }
}


export default App;

//c2f7ee60-233c-488b-ad4d-d1576e874f91
