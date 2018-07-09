import React, { Component } from 'react';
import './YMap.css';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class YMap extends Component {
  constructor(props) {
    super(props);

  }

  render() {

  	const mapState = { center: [55.76, 37.64], zoom: 10 };
	 
		const MyPlacemark = () => (
		  <YMaps>
		    <Map state={mapState}>
		 
		      <Placemark
		        geometry={{
		          coordinates: [55.751574, 37.573856]
		        }}
		        properties={{
		          hintContent: 'Собственный значок метки',
		          balloonContent: 'Это красивая метка'
		        }}
		        options={{
		          iconLayout: 'default#image',
		          iconImageHref: 'images/myIcon.gif',
		          iconImageSize: [30, 42],
		          iconImageOffset: [-3, -42]
		        }}
		      />
		 
		    </Map>
		  </YMaps>
		);

    return (
      <div id = "YMap" className={"YMap " + (this.props.className ? this.props.className : "")}>
      	<MyPlacemark/>
      </div>
    );
  }
}


export default YMap;
