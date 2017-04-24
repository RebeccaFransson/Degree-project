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
        // let device = devices.find(({kind, label}) => 
        //   kind === 'videoinput' && label.indexOf('back') !== -1
        // )
        // console.log('Found back cam', device)
        // if (device) return device

        // console.log('No back cam, using first videoinput', device)
        // device = devices.find(({kind}) => kind === 'videoinput')
        // if (device) return device
        const videoDevices = devices.filter(({kind}) => kind === 'videoinput')
        return videoDevices[1]
        
    })
    .then(device => {
      console.log(device.deviceId)
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
      .then(stream => {
        console.log(stream.getVideoTracks())
        return stream
      })
      .then(stream => stream.getVideoTracks()[0])
      .then(videoTrack => {
        console.log(videoTrack)
        const capturer = new ImageCapture(videoTrack)
        console.log(capturer)
        capturer.setOptions({
          imageWidth: 4000,
          imageHeight: 3000,
        })
        console.log('setOptions')
        return capturer
      })
      .then(imageCapture => {
        console.log(imageCapture)
        const blob = imageCapture.takePhoto()
        console.log(blob)
        return blob
      })
      .then(blob => {
        console.log(blob)
        const video = document.querySelector('#video')
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
      // .catch(error => console.error(error))
      
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