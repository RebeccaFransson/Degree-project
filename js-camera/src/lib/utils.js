export function getUserMedia() {
  return navigator.mediaDevices.enumerateDevices()
    .then(getDevice)
    .then(getMedia)
}

function getMedia({deviceId}) {
  const constraints = {
    video: {deviceId}
  }
  return navigator.mediaDevices.getUserMedia(constraints)
}

function getDevice(devices) {
  const videoDevices = devices.filter(({kind}) => kind === 'videoinput')

  if (!videoDevices) throw new Error('No video devices found!')

  const backCam = videoDevices.find(({label}) => label.indexOf('back') !== -1)

  return backCam ? backCam : videoDevices[0]
}