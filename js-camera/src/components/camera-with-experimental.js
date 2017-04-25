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
    console.log('Start')
    performance.mark('start_cam_experimental')
    this.getStream()
  }

  getDevice(devices) {
    const videoDevices = devices.filter(({kind}) => kind === 'videoinput')

    if (!videoDevices) throw new Error('No video devices found!')

    const backCam = videoDevices.find(({label}) => label.indexOf('back') !== -1)

    return backCam ? backCam : videoDevices[0]
  }

  getUserMedia() {
    return navigator.mediaDevices.enumerateDevices()
      .then(this.getDevice)
      .then(device => {
      const constraints = {
        video: {deviceId: device.deviceId}
      };
      return navigator.mediaDevices.getUserMedia(constraints)
    })
    .catch(err => console.error(err))
  }

  getStream() {
    this.getUserMedia()
      .then(stream => {
        this.setState((prevState, props) => ({
          videoStream: stream
        }))
        return stream
      })
      .then(stream => stream.getVideoTracks()[0])
      .then(videoTrack => {
        const capturer = new ImageCapture(videoTrack)
        capturer.setOptions({
          imageWidth: 4000,
          imageHeight: 3000,
        })
        return capturer
      })
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
      .catch(error => console.error(error))
      
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