import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import "./style.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCenter, changePoint } from '../../redux/actions';

class RouteMap extends Component {
  constructor(props){
    super(props);
    this.handleChangeCenter = this.handleChangeCenter.bind(this);
    this.handleMovePoints = this.handleMovePoints.bind(this);
  }

  handleChangeCenter(event){
    this.props.changeCenter(event.get("newCenter"))
  }

  handleMovePoints(event, id){
    this.props.changePoint({ coordinates: event.originalEvent.target.geometry._coordinates, id})

  }

  render(){

    const points = this.props.points.map((point) => {
       return <Placemark 
        key = {point.id} 
        options = {  {draggable: true} }
        modules={['geoObject.addon.balloon']} 
        geometry = { point.coordinates } 
        onGeometryChange = { (event) => { this.handleMovePoints(event, point.id) } }
        properties = { { balloonContent: point.text } }
        />
    })

    const mapState = {
      center: this.props.center,
      zoom: 9
    }

    const line = this.props.points.map((point) => {
      return point.coordinates
    })

    return (
      <YMaps query = { { apikey: 'c2f7ee60-233c-488b-ad4d-d1576e874f91' } } >
        <Map width = '100%' height = '100%' state = { mapState } onBoundsChange={this.handleChangeCenter} >
          {points}
          <GeoObject             
            geometry={{
              type: 'LineString',
              coordinates: line
            }}
            options={{
              strokeColor: '#bfedff',
              strokeWidth: 3,
            }}
          />
        </Map>
      </YMaps>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  const { points, center } = state;
  return { points, center }
}

export default connect(
  mapStateToProps,
  { changeCenter, changePoint }
)(RouteMap)