import React from 'react'
import {Redirect} from 'react-router-dom'
import FileSaver from 'file-saver'
const {ImageCapture, performance} = window

class CameraWithExperimental extends React.Component {
  state = {
    videoStream: undefined,
    redirect: undefined
  }
  constructor(props) {
    super(props)
    performance.mark('start_cam_experimental')
    this.getStream()
  }

  getUserMedia() {
    console.log('hehe')
    return navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        let device = devices.find(({kind, label}) => 
          kind === 'videoinput' && label.indexOf('back') !== -1
        )
        console.log('Found back cam', device)
        if (device) return device

        console.log('No back cam, using first videoinput', device)
        device = device.find(({kind}) => kind === 'videoinput')
        if (device) return device

        throw new Error('No Video Device Found!')
    })
    .then(device => {
      console.log(device)
      return navigator.mediaDevices.getUserMedia({video: {deviceId: device.deviceId}})
    })
  }

  getStream() {
    this.getUserMedia()
      .then(stream => {
        this.setState((prevState, props) => ({
          videoStream: stream
        }))
        return stream
      })
      .then(stream => {
        console.log(stream.getVideoTracks())
        return stream
      })
      .then(stream => stream.getVideoTracks()[0])
      .then(videoTrack => new ImageCapture(videoTrack))
      .then(imageCapture => imageCapture.takePhoto())
      .then(blob => {
        const fileSaver = FileSaver.saveAs(blob, 'image.png')
        fileSaver.onwriteend = (args) => {
          performance.mark('end_cam_experimental')
          performance.measure(
            'cam_experimental_benchmark', 
            'start_cam_experimental', 
            'end_cam_experimental'
          )
          const {duration} = performance.getEntriesByName('cam_experimental_benchmark', 'measure')[0]
          console.log(`Time elapsed: ${duration} ms`)
          performance.clearMarks()
          performance.clearMeasures()
          this.setState((prevState, props) => ({redirect: '/'}))
        }        
      })
  }



  render() {
    const {videoStream, redirect} = this.state
    if (redirect) return <Redirect to='/' />
    return (
      <div>
        <p>Camera using experimental features (ImageCapture)</p>
        {videoStream && 
          <video 
            id='video' 
            autoPlay 
            src={window.URL.createObjectURL(videoStream)} 
          />
        }
      </div>
    )
  }
}

export default CameraWithExperimental