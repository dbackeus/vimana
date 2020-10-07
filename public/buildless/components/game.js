import { h, Component, render } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import map from '../map.js'
import { distance } from '../helpers.js'

const Game = ({ airports }) => {
  const nearbyAirports = airports
    .filter(airport => airport.size > 1)
    .map(airport => ({ ...airport, distance: distance(airport, currentAirport) }))
    .filter(airport => airport.distance < 50)

  map.updateAirports(nearbyAirports)

  const rows = nearbyAirports.map((airport) => {
    return html`
      <tr>
        <td>Passenger</td>
        <td>${Math.round(airport.distance)} NM</td>
        <td>${airport.name}</td>
      </tr>
    `
  })

  return html`
    <div class="container-fluid">
      <h2>${currentAirport.ident} - ${currentAirport.name}</h2>
      <h3>Missions</h3>
      <table class="table">
        <thead>
          <th>Description</th>
          <th>Distance</th>
          <th>Destination</th>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `
}

export default Game
