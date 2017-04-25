import React from 'react'
import {Redirect} from 'react-router-dom'
import FileSaver from 'file-saver'
import {getUserMedia} from '../lib/utils'
const {performance} = window

class CameraWithCanvas extends React.Component {
  state = {
    videoStream: undefined,
    redirect: undefined
  }

  constructor(props) {
    super(props)
    performance.mark('start_cam_canvas')
  }

  componentDidMount() {
    this.start()
  }

  start() {
    getUserMedia()
      .then(stream => {
        this.setState((prevState, props) => ({
          videoStream: stream,
        }))
        return stream
      })
      .then(() => {
        const {video, canvas} = this
        video.addEventListener('canplay', event => {
          const context = canvas.getContext('2d')
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          canvas.toBlob(blob => {
            console.log('toBlob')
            const fileSaver = FileSaver.saveAs(blob, 'image.png')
            fileSaver.onwriteend = () => {
              console.log('writeEnd')
              performance.mark('end_cam_canvas')
              performance.measure(
                'cam_canvas_benchmark',
                'start_cam_canvas',
                'end_cam_canvas',
              )
              const {duration} = performance.getEntriesByName('cam_canvas_benchmark')[0]
              console.log(`Time elapsed: ${duration} ms`)
              performance.clearMarks()
              performance.clearMeasures()
              this.setState((prevState, props) => ({redirect: '/'}))
            }
          })
        })
        
      })
  }

  render() {
    const {videoStream, redirect} = this.state
    if (redirect) return <Redirect to='/' />
    return (
      <div>
        <p>Camera using existing features (Canvas to Png)</p>
        {videoStream && 
          <div>
            <video 
              id='video' 
              autoPlay 
              src={window.URL.createObjectURL(videoStream)} 
              ref={(video) => { this.video = video }}
            />
            <canvas 
              id='canvas' 
              ref={(canvas) => { this.canvas = canvas }}
              width='2976'
              height='3960'
              style={{}}
              />
          </div>

        }
        
      </div>
    )
  }
}

export default CameraWithCanvas