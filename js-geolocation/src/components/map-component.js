import React, {Component} from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap'
import Marker from 'react-google-maps/lib/Marker'
import GoogleMap from 'react-google-maps/lib/GoogleMap'
import {getUserLocation} from '../lib/location'

const {performance} = window

const AsyncGoogleMap = withScriptjs(withGoogleMap(
  (({onMapLoad, myPosition, onTilesLoaded}) => (
    <GoogleMap
      ref={onMapLoad}
      defaultZoom={15}
      onClick={() => {}}
      onTilesLoaded={onTilesLoaded}
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
    performance.mark('start_pwa_geo_benchmark')
  }

  state = {
    myPosition: undefined,
  };

  componentWillUnmount() {
    this._mapComponent = null
  }

  handleMapLoad = (map) => {
    if (map) {
      this._mapComponent = map;
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
  }
  
  handleTilesLoad = () => {
    performance.mark('end_pwa_geo_benchmark')
    performance.measure('pwa_geo_benchmark', 'start_pwa_geo_benchmark', 'end_pwa_geo_benchmark')
    const {duration} = performance.getEntriesByType('measure')[0]
    performance.clearMarks()
    performance.clearMeasures()
    console.log('Bencmark end: ', duration)
  }


  render() {
    return (
      <AsyncGoogleMap
        googleMapURL="//maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAgvmFuIojQ0ATclnZS_0R9KgTDFFRuCH8"
        loadingElement={
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh'

          }}>
            <h3>LOADING...</h3>
          </div>
        }
        containerElement={
          <div style={{ height: `100px`, width: '100px' }} />
        }
        mapElement={
          <div style={{ height: `100vh`, width: '100vw' }} />
        }
        onMapLoad={this.handleMapLoad}
        onTilesLoaded={this.handleTilesLoad}
        myPosition={this.state.myPosition}
      />
    );
  }
}