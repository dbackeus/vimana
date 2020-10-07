
export const distance = (pos1, pos2) => {
  let radlat1 = Math.PI * pos1.lat / 180
  let radlat2 = Math.PI * pos2.lat / 180
  let theta = pos1.lng - pos2.lng
  let radtheta = Math.PI * theta / 180

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.min(dist, 1)
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60

  return dist
}
