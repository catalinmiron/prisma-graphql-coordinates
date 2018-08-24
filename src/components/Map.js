import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {GOOGLE_MAP_URL} from '../constant'


// -34.397, lng: 150.644
const MapWithAMarker = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.defaultCenter}
    onClick={props.onClick}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
)));

export default class Map extends React.PureComponent {
  state = {
    defaultCenter: {
        lat: -34.397,
        lng: 150.644
    }
  };

  render() {
    const {lat, lng} = this.state.defaultCenter;

    return (
      <div>
        <div>{lat}</div>
        <div>{lng}</div>

        {this.state.defaultCenter && (
          <MapWithAMarker
            googleMapURL={GOOGLE_MAP_URL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={this.state.defaultCenter}
            lat={lat}
            lng={lng}
            onClick={x => {
              const lat = x.latLng.lat();
              const lng = x.latLng.lng();

              this.setState({
                lat,
                lng
              });
            }}
          />
        )}
      </div>
    );
  }
}