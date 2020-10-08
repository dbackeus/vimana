import { h, Component } from 'preact'
import htm from 'htm'
const html = htm.bind(h)

import { distance } from '../../helpers.js'

class FilterDestination extends Component {
  state = {
    distance: '0..50',
  }

  render({ airports, onAirportClick }, state) {
    const [distanceStart, distanceEnd] = state.distance.split('..').map((string) => parseInt(string))

    const filteredAirports = airports
      .filter((airport) => airport.size > 1)
      .map((airport) => ({ ...airport, distance: distance(airport, currentAirport) }))
      .filter((airport) => airport.distance > distanceStart && airport.distance < distanceEnd)
      .sort((a, b) => (a.distance > b.distance ? 1 : -1))

    map.updateAirports(filteredAirports)

    const rows = filteredAirports.map((airport) => {
      return html`
        <tr
          class="game-row"
          onClick=${onAirportClick.bind(this, airport)}
          onMouseOver=${this.onAirportHover.bind(this, airport)}
        >
          <td>${airport.name}</td>
          <td>${Math.round(airport.distance)} NM</td>
        </tr>
      `
    })

    return html`
      <${Fragment}>
        <h3>Select destination airport</h3>
        <label for="distance-filter" class="form-label">Distance</label>
        <select onchange=${this.onSelectDistance.bind(this)} class="form-select" id="distance-filter">
          <option value="0..50">Nearby (0-50 NM)</option>
          <option value="50..100">Medium (50-100 NM)</option>
          <option value="100..1000">Far (100-1000 NM)</option>
        </select>
        <table class="table">
          <thead>
            <th>Name</th>
            <th>Distance</th>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </${Fragment}>
    `
  }

  onSelectDistance(e) {
    this.setState({ distance: e.target.value })
  }

  onAirportHover(airport) {
    map.previewRoute(airport)
  }
}

export default FilterDestination
