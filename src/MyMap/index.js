import React, { Component } from 'react';
import './MyMap.css';
import ListOfPoints from '../ListOfPoints';
import MyInput from "../MyInput";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';



class MyMap extends Component {
	 constructor(props) {
    super(props);
    this.state = {
      points: [],
      center: [55.76, 37.64],
      line: []
    }
    this.handleDeletePoint = this.handleDeletePoint.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);
    this.handleSwapPoint = this.handleSwapPoint.bind(this);
    this.handleDragEndYmaps = this.handleDragEndYmaps.bind(this);
    this.handleGeometryChange = this.handleGeometryChange.bind(this);
  }

  handleDeletePoint(position){

    var points = this.state.points;
    var line = this.state.line;

    for(let point in points){
      if (points[point].position === position) {
        points.splice(+point, 1);
        line.splice(+point, 1);
      }      
    }

    updatePositions(points);

    this.setState({points: points, line: line})
  }

  handleSwapPoint(positionFrom, positionTo){

    var points = this.state.points;
    var line = this.state.line;
    var pointSwapFrom = points[positionFrom]
    var pointSwapTo = points[positionTo]

    pointSwapFrom.position = positionTo;
    pointSwapTo.position = positionFrom;

    points[positionTo] = pointSwapFrom;
    points[positionFrom] = pointSwapTo;

    line[positionTo] = pointSwapFrom.coordinates;
    line[positionFrom] = pointSwapTo.coordinates;

    updatePositions(points);
  
    this.setState({points: points, line: line})
  }

  handleAddPoint(value){

    this.setState({center: this.map.getCenter()})

    for(var point in this.state.points){
      if( this.state.points[point].text === value){
        alert("Точка с таким именем уже есть")
        return
      }
    }
    var points = this.state.points.concat([{ position: this.state.points.length, text: value, coordinates: this.map.getCenter()}]);
    var line = this.state.line;

    line.push(this.map.getCenter())
  

    this.setState({points: points, line: line})
  }

  handleDragEndYmaps(pastPointState, event){

    var points = this.state.points;

    for(let point in points){
      if(points[point].position === pastPointState.position){
        points[point].coordinates = event.originalEvent.target.geometry._coordinates;
      }
    }
    console.log(this.state)

    this.setState({points: points})
  }

  handleGeometryChange(pastPointState, event){

    var line = this.state.line;

    line[pastPointState.position] = event.originalEvent.target.geometry._coordinates;

    this.setState({line: line})
  }


  render() {

    const mapState = { center: this.state.center, zoom: 10, controls: [] };

    const createMap = () => (
      <YMaps  onApiAvaliable  = {(ymaps)=>{this.ymaps = ymaps}}>
        <Map height = '99%' width = '99%' state={mapState} instanceRef = {(map)=>{this.map = map; map.behaviors.disable('dblClickZoom') }}>
          {createPlacemarks()}
          <GeoObject 
            geometry={{
              type: 'LineString',
              coordinates: this.state.line.concat()
            }}
            options={{
              // Enabling drag-n-drop for the polyline.
              draggable: true,
              // The line color.
              strokeColor: '#FFFF00',
              // Line width.
              strokeWidth: 5,
            }}
          />
     
        </Map>
      </YMaps>
    );

    const createPlacemarks = () => {
      let result = [];


      for(var point in this.state.points){
        result.push(
          <Placemark
            key={this.state.points[point].position}            

            geometry={{
              coordinates: this.state.points[point].coordinates
            }}
            properties={{
              balloonContent: this.state.points[point].text
            }}
            options = {{draggable: true}}
            onDragEnd = { this.handleDragEndYmaps.bind(this, Object.assign({}, this.state.points[point]))}
            onGeometryChange = { this.handleGeometryChange.bind(this, Object.assign({}, this.state.points[point]))}
          />
        )
      }

      return result
    }

    return (
      <div className={"MyMap" + " " + (this.props.className ? this.props.className : "")}>
        <div className = "MyMap__ListOfPoints">
          <MyInput 
            mods = { { clearInputByEvent: true , noReturnEmpty: true} } 
            onClick = {this.handleAddPoint} 
            onEnter = {this.handleAddPoint}
            textButton = "Add"
            className = "MyInput__width_full"
          />
        	<ListOfPoints 
            points = {this.state.points} 
            mods = { { withDeletePoints: {onDeletePoint: this.handleDeletePoint}, withDragAndDrop: {onSwapPoint: this.handleSwapPoint}} }
            className = "ListOfPoints__width_full"
          />
        </div>
        <div className = "MyMap__YMaps">
          {createMap()}
        </div>
      </div>
    );
  }
}

export default MyMap;

function updatePositions(points){
  points.map(function(currentPoint, index, array){
     currentPoint.position = index;
  })
}