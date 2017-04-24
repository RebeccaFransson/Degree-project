import React, { Component } from 'react'
import Image from './image'

class Camera extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showCamera: false,
      allDone: null,
    }
  }

  activateCamera = () => {
    console.log('starta kameran')
    this.setState({
      showCamera: true,
    })
  }

  componentDidUpdate = () => {
    console.log('update')
    const that = this
    if(this.state.showCamera){
      const video = document.getElementById('video')
      const { takePicture, savePicture } = this
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream)
            video.play()
            console.log('Video öppnad')
            setTimeout(()=>{//Sätter en timeout så jag är säker påatt kameran komemr igång
              that.setState({
                showCamera: false,
                allDone: video,
              })
            }, 1000)
        })
      }
    }
  }

  render() {
  const { showCamera, allDone } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the cameratest</h2>
        </div>
        { showCamera ?
          <div id='showing'>
            <video id='video' autoPlay></video>
          </div>
          :
          <div>
          {allDone ?
            <Image video={allDone}/>
            :
            <button onClick={this.activateCamera}> Activate Cameratest </button>
          }
            
          </div> 
        }
        
        
      </div>
    )
  }
}

export default Camera
