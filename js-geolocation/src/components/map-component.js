import React, {Component} from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap'
import Marker from 'react-google-maps/lib/Marker'
import GoogleMap from 'react-google-maps/lib/GoogleMap'
import {getUserLocation} from '../lib/location'

const AsyncGoogleMap = withScriptjs(withGoogleMap(
  (({onMapLoad, myPosition}) => (
    <GoogleMap
      ref={onMapLoad}
      defaultZoom={15}
      onClick={() => {}}
    >
      {myPosition &&
        <Marker
          {...myPosition}
          onRightClick={() => {}}
        />
      }
    </GoogleMap>
  )
)))

export default class MapComponent extends Component {
  constructor(props) {
    super(props)
    getUserLocation()
      .then(({coords: {latitude, longitude}}) => {
        this.setState((prevState, props) => ({
          myPosition: {
              position: {
                lat: latitude,
                lng: longitude
              },
              key: 'My Position',
            }
        }))
        return {latitude, longitude}
      })
      .then(({latitude, longitude}) => {
        this._mapComponent.panTo({lat: latitude, lng: longitude})
      })

  }

  state = {
    myPosition: undefined,
  };

  handleMapLoad = (map) => {
    this._mapComponent = map;
  }


  render() {
    return (
      <AsyncGoogleMap
        googleMapURL="//maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAgvmFuIojQ0ATclnZS_0R9KgTDFFRuCH8"
        loadingElement={
          <div style={{ height: `100%` }}>
            <h1>Loading</h1>
          </div>
        }
        containerElement={
          <div style={{ height: `100px`, width: '100px' }} />
        }
        mapElement={
          <div style={{ height: `100vh`, width: '100vw' }} />
        }
        onMapLoad={this.handleMapLoad}
        myPosition={this.state.myPosition}
      />
    );
  }
}