import React, { Component } from 'react'

class Image extends Component {

  constructor(props) {
      console.log(props)
    super(props)
    this.state ={
        src: null,
    }
  }
  componentWillMount(){
    console.log('skapar canvas')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.drawImage(this.props.video, 0, 0, 300, 150)
    console.log(canvas)
    const src = canvas.toDataURL("image/png")
    this.setState({
        src,
    })

  }

  componentDidMount(){
    console.log('här sparar vi bilden')
    location.href = this.state.src
    
  }

  render() {
      console.log('render ')
    return (
      <image src={this.state.src}/>
    )
  }
}
export default Image
