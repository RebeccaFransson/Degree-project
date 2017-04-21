import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showCamera: false,
    }
  }

  activateCamera = () => {
    console.log('starta kameran')
    this.setState({
      showCamera: true,
    })
  }

  takePicture = () => {
    console.log('tar bild')
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    
    context.drawImage(document.getElementById('video'), 0, 0, 300, 150)
    
  }

  componentDidUpdate(){
    console.log('update')
    var video = document.getElementById('video')
    if(video != null){
      const { takePicture } = this
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
              video.src = window.URL.createObjectURL(stream)
              video.play()
              console.log('Öppnar video')
              takePicture()
          })
      }
    }
  }


  render() {
  const { showCamera } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the cameratest</h2>
        </div>
        { showCamera ?
          <div id='showing'>
            <video id='video' autoPlay></video>
            <button onClick={this.takePicture}> Snapshot </button>
            <canvas id='canvas'></canvas>
          </div>
          :
          <button onClick={this.activateCamera}> Activate Cameratest </button>
        }
        
      </div>
    )
  }
}

export default App
