import React, { Component } from 'react'

class Image extends Component {

  componentDidMount(){
    //skapar en canvas
    const canvas = document.getElementById("canvas")
    const context = canvas.getContext('2d')
    context.drawImage(this.props.video, 0, 0, 300, 150)

    //Gör om canvas till png
    const src = canvas
      .toDataURL("image/png")
      .replace(/^data:image\/[^;]/, 'data:application/octet-stream')

    //sparar bilden
    location.href = src
  }

  render() {
    return (
        <div>
          <canvas id='canvas'/>
          <p>Time for this benchmark was:</p>
        </div>
    )
  }
}
export default Image
