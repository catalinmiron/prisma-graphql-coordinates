import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import {GOOGLE_MAP_URL} from '../constant'


// radius: 1000,
// lat: 50,
// lng: 14.44
const MapWithAMarker = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: props.lat, lng: props.lng}}
    onClick={props.onClick}
  >
    <Circle
        radius={props.radius}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
    />
    <Marker position={{lat: props.lat, lng: props.lng}} />

    {props.locations.map(location => {
        return <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }} />
    })}
  </GoogleMap>
)));

export default class Map extends React.PureComponent {
  render() {
    return (
      <div style={{height: '700px'}}>

        <MapWithAMarker
            googleMapURL={GOOGLE_MAP_URL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={{
                lat: this.props.lat,
                lng: this.props.lng
            }}
            lat={this.props.lat}
            lng={this.props.lng}
            locations={this.props.locations}
            radius={this.props.radius}
            onClick={x => {
              const lat = x.latLng.lat();
              const lng = x.latLng.lng();

            //   this.setState({
            //     defaultCenter,
            //     lat,
            //     lng
            //   });
            }}
          />
      </div>
    );
  }
}