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
    this.getAddress = this.getAddress.bind(this);
    this.state = { ymaps: null, address: '' };
  }

  handleChangeCenter(event){
    this.props.changeCenter(event.get("newCenter"))
  }

  handleMovePoints(event, id){
    this.props.changePoint({ coordinates: event.originalEvent.target.geometry._coordinates, id})

  }

  getAddress(coordinates){
    let geocoder = this.state.ymaps.geocode(coordinates);
    geocoder.then((res) => {
      this.setState({address: res.geoObjects.get(0).properties.getAll().name})
    })
  }

  render(){

    const points = this.props.points.map((point) => {

      const BalloonTemplate = '<h5 style = "margin: 3px; font-weight: 400; font-size: 15px;">' + point.text + '</h5>' +
        '<p style = "margin: 3px">' + ( this.state.address || 'Загрузка...') + '</p>'

      return <Placemark 
        key = {point.id} 
        options = {  {draggable: true} }
        modules = {['geoObject.addon.balloon']}
        geometry = { point.coordinates } 
        onGeometryChange = { (event) => { this.handleMovePoints(event, point.id) } }
        onBalloonOpen = { () => this.getAddress(point.coordinates) }
        onBalloonClose = { () => this.setState({address: '' }) }
        properties = { { balloonContent: BalloonTemplate } }
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
      <YMaps query = { { apikey: 'c2f7ee60-233c-488b-ad4d-d1576e874f91' } }>
        <Map 
          width = '100%' 
          height = '100%' 
          state = { mapState }
          modules = {['geocode']}
          onBoundsChange={this.handleChangeCenter} 
          onLoad = { ymaps => this.setState({ymaps}) }
        >
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