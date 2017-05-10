export function getUserLocation() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      location => resolve(location),
      err => reject(err),
      {
        enableHighAccuracy: true,
      },
    )
  )
}