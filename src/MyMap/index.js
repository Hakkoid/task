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
      center: [55.76, 37.64]
    }
    this.handleDeletePoint = this.handleDeletePoint.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);
  }

  handleDeletePoint(key){

    var points = this.state.points.concat();

    for(let point in points){
      if (points[point].key === key) {
        points.splice(+point, 1)
      }      
    }
    this.setState({points: points})
  }

  handleAddPoint(value){

    this.setState({center: this.map.getCenter()})

    for(var point in this.state.points){
      if( this.state.points[point].key === value){
        alert("Точка с таким именем уже есть")
        return
      }
    }
    var points = this.state.points.concat([{key: value, text: value, coordinates: this.map.getCenter()}]);

    this.setState({points: points})
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
              coordinates: 
                getCoordinates()
                
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

    const getCoordinates = () => {
            let result = [];
            for(let point in this.state.points){
              result.push(this.state.points[point].coordinates)
            }

            return result;
    }

    const createPlacemarks = () => {
      let result = [];


      for(var point in this.state.points){
        result.push(
          <Placemark
            key={this.state.points[point].key}            

            geometry={{
              coordinates: this.state.points[point].coordinates
            }}
            properties={{
              balloonContent: this.state.points[point].text
            }}
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
            mods = { { withDeletePoints: {onDeletePoint: this.handleDeletePoint} } }
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
