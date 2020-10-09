
function toRadians(degrees) {
  return degrees * Math.PI / 180
}

function toDegrees(radians) {
  return radians * 180 / Math.PI
}

export const distance = (pos1, pos2) => {
  let radlat1 = toRadians(pos1.lat)
  let radlat2 = toRadians(pos2.lat)
  let theta = pos1.lng - pos2.lng
  let radtheta = toRadians(theta)

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.min(dist, 1)
  dist = Math.acos(dist)
  dist = toDegrees(dist)
  dist = dist * 60

  return dist
}

export const bearing = (pos1, pos2) => {
  let startLat = toRadians(pos1.lat)
  let startLng = toRadians(pos1.lng)
  let destLat = toRadians(pos2.lat)
  let destLng = toRadians(pos2.lng)

  let y = Math.sin(destLng - startLng) * Math.cos(destLat)
  let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)
  let bearing = Math.atan2(y, x)
  bearing = toDegrees(bearing)

  return (bearing + 360) % 360
}
