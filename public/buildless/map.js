import gamesChannel from './channels/gamesChannel.js'

const planeSVG = `
  <svg transform="rotate({{ rotation }})" width="128" height="128" style="enable-background:new 0 0 128 128;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M33.41,35.09L33.41,35.09c-1.37-1.37-1.37-3.58,0-4.95l6.36-6.36c1.37-1.37,3.58-1.37,4.95,0l0,0 c1.37,1.37,1.37,3.58,0,4.95l-6.36,6.36C36.99,36.46,34.78,36.46,33.41,35.09z" style="fill:#78A3AD;"/>
    <path d="M52.66,35.09L52.66,35.09c-1.37-1.37-1.37-3.58,0-4.95l6.36-6.36c1.37-1.37,3.58-1.37,4.95,0l0,0 c1.37,1.37,1.37,3.58,0,4.95l-6.36,6.36C56.24,36.46,54.03,36.46,52.66,35.09z" style="fill:#78A3AD;"/>
    <path d="M93.53,73.84L93.53,73.84c-1.37-1.37-1.37-3.58,0-4.95l6.36-6.36c1.37-1.37,3.58-1.37,4.95,0l0,0 c1.37,1.37,1.37,3.58,0,4.95l-6.36,6.36C97.11,75.21,94.9,75.21,93.53,73.84z" style="fill:#78A3AD;"/>
    <path d="M93.02,93.34L93.02,93.34c-1.37-1.37-1.37-3.58,0-4.95l6.36-6.36c1.37-1.37,3.58-1.37,4.95,0l0,0 c1.37,1.37,1.37,3.58,0,4.95l-6.36,6.36C96.6,94.71,94.39,94.71,93.02,93.34z" style="fill:#78A3AD;"/>
    <path d="M96.69,35.31c0,0,3.67,45,0,79.98c-0.6,5.7-8.62,7.1-9.78,1.48c-6.56-31.79-20.72-49.96-20.72-49.96 L96.69,35.31z" style="fill:#016CA2;"/>
    <path d="M92.72,31.94c0,0-45-3.67-79.98,0c-5.7,0.6-7.1,8.62-1.48,9.78c31.79,6.56,49.96,20.72,49.96,20.72 L92.72,31.94z" style="fill:#016CA2;"/>
    <path d="M43,85H8.02c-3.94,0-5.51,5.1-2.25,7.31L23,104L43,85z" style="fill:#016CA2;"/>
    <path d="M43,85v34.98c0,3.94-5.1,5.51-7.31,2.25L24,105L43,85z" style="fill:#016CA2;"/>
    <path d="M90.29,18.39L26.75,85.24C24.98,87.1,24,89.57,24,92.13V98c0,3.31,2.69,6,6,6h5.87 c2.56,0,5.03-0.98,6.89-2.75l66.85-63.54c3.12-2.96,5.2-6.85,5.93-11.09l1.51-8.74c0.71-4.09-2.85-7.64-6.93-6.93l-8.74,1.51 C97.14,13.19,93.25,15.27,90.29,18.39z" style="fill:#40C0E7;"/>
    <path d="M47.02,81.87l-25.85,25.91C21.17,107.78,23.51,94.18,47.02,81.87z" style="fill:#78A3AD;"/>
    <path d="M47.02,81.87l-25.85,25.91C21.17,107.78,34.57,105.62,47.02,81.87z" style="fill:#016CA2;"/>
    <path d="M99,19.7l2.29-0.24 c4.95-0.37,8.72,4.37,7.24,9.11v0" style="fill:none;stroke:#016CA2;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;"/>
  </svg>
`

const planeIconDataUrl = (heading) =>
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(planeSVG.replace('{{ rotation }}', heading - 45))

let airportMarkers = []
let flightPaths = []

const clearMarkersAndPaths = () => {
  airportMarkers.forEach((marker) => marker.setMap(null))
  airportMarkers = []
  flightPaths.forEach((path) => path.setMap(null))
  flightPaths = []
}

class Map {
  constructor() {
    let position = { lat: currentAirport.lat, lng: currentAirport.lng }

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: position,
      zoom: 8,
      disableDefaultUI: true,
    })

    this.map.addListener('zoom_changed', this.onZoom.bind(this))

    const playerIcon = {
      url: planeIconDataUrl(360),
      scaledSize: new google.maps.Size(50, 50),
    }

    this.playerMarker = new google.maps.Marker({ map: this.map, position: position, icon: playerIcon })
  }

  updatePlayer(positionAndHeading) {
    let marker = this.playerMarker
    marker.setIcon({ ...marker.getIcon(), url: planeIconDataUrl(positionAndHeading.heading) })
    marker.setPosition(positionAndHeading)
    this.map.setCenter(positionAndHeading)
  }

  zoomIncludingDistance(distance) {
    let zoom;
    if (distance <= 50) zoom = 8
    else if (distance <= 100) zoom = 7.4
    else if (distance <= 250) zoom = 6
    else if (distance <= 500) zoom = 5

    this.map.setZoom(zoom)
  }

  previewRoute(airport) {
    clearMarkersAndPaths()

    this.addAirport(airport)

    const flightPath = new google.maps.Polyline({
      path: [currentAirport, airport],
      geodesic: true,
    })
    flightPath.setMap(this.map)

    flightPaths.push(flightPath)
  }

  updateAirports(airports) {
    clearMarkersAndPaths()

    airports.forEach((airport) => {
      this.addAirport(airport)
    })
  }

  addAirport(airport) {
    let size = this.baseSize

    let marker = new google.maps.Marker({
      position: airport,
      icon: { url: '/buildless/images/airport.svg', scaledSize: new google.maps.Size(size, size) },
      map: this.map,
    })

    airportMarkers.push(marker)
  }

  get baseSize() {
    return this.map.getZoom() * 5
  }

  onZoom() {
    // let size = map.getZoom() * 5
    // markers.forEach((marker) => {
    //   marker.setIcon({ ...marker.icon, scaledSize: new google.maps.Size(size, size) })
    // })
  }
}

window.map = new Map()

export default map
