import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(({lat, lng, onMapLoad}) => (
  <GoogleMap
    ref={onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat, lng }}
  >
  </GoogleMap>
))

class Geolocation extends React.Component {
    state = {
        Location: undefined
    }
    
    constructor(props) {
        super(props)
        performance.mark('start_cam_experimental')
        this.start()
    }

    start() {
        const that = this
        navigator.geolocation.getCurrentPosition(function(location) {
            that.setState((prevState, props) => ({
                Location: location
            }))
        })
    }

  render() {
      console.log(this.state)
    if (!this.state.Location) return <div>Loading</div>
    return (
        <GettingStartedGoogleMap lat={10} lng={10}
            containerElement={
        <div style={{ height: `100%` }} />
        }
        mapElement={
        <div style={{ height: `100%` }} />
        }
        onMapLoad={() => {}}
        onMapClick={() => {}}
        markers={() => {}}
        onMarkerRightClick={() => {}}/>
    )
  }
}
//{this.state.selectedPlace.name}
export default Geolocation
/*export default GoogleApiComponent({
  apiKey: "AIzaSyCBPtPDWa6L6UIkWdrlngSWm2ZiCahnfqo"
})(Geolocation)*/